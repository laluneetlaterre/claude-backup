export const meta = {
  name: 'anb-enrich-retry',
  description: '安全分類器の一時エラーで落ちた2バッチ（28件）の要約・タグを付け直す',
  phases: [{ title: 'Retry', detail: '7件ずつ4バッチに割って再実行' }],
}

const JSON_PATH = '/private/tmp/claude-501/-Users-sakamotomitsue-Documents-works-obsidian/75aa8b37-76a7-4c1c-bc61-ca9ac71ae08b/scratchpad/anb_cases.json'

const TAGS = [
  'フィギュア・立体', '人物・ポートレート', 'キャラクター', '風景・背景', 'モノ・商品',
  '図解・インフォグラフィック', '文字・タイポグラフィ', '地図・空間', '漫画・コマ割り',
  'スタイル変換', '画像修復・高解像度化', '合成・差し替え', '部分編集', '視点変更',
  '色替え・配色', '分解・抽出', '拡張・アウトペイント', '複数画像の統合',
  'SNS・アイキャッチ', '広告・バナー', '商品モック', 'グッズ・ギフト', '資料・スライド',
  '衣装・ファッション', '建築・インテリア', '教育・解説',
  'テンプレート', '短いプロンプト', '長文プロンプト', '和風', 'レトロ', 'ミニチュア', '3D・CG',
]

// 前回落ちた範囲を、より小さく割り直す（大きなバッチほど分類器に引っかかりやすいため）
const RANGES = [
  [42, 49], [49, 56], [126, 133], [133, 140],
]

phase('Retry')

const results = await parallel(
  RANGES.map(([s, e]) => () =>
    agent(`画像生成プロンプト事典の編集作業です。日本語で作業します。

# 元データ
${JSON_PATH} を Read で読んでください。JSON配列で、1要素＝1事例（画像生成AIへの指示文のカタログ）です。
担当は **配列のインデックス ${s} 〜 ${e - 1}（${e - s}件）** のみ。

各要素：key / title_ja（題名）/ prompt（指示文の原文）/ input_note / needs_input / notes / authors

# やること
担当分の各事例に、次の4つを付けてください。**prompt 本文には一切触れません**（読むだけ）。

1. **summary**（日本語40〜70字）どんな絵ができて、どういう場面で効くか。題名の言い換えにしない。
2. **tags**（下のリストから2〜4個。リスト外の語は使わない）
${TAGS.join(' / ')}
3. **portability**（ChatGPTの画像生成で同じ結果になるかの見立て）
   - level: high（入力画像が不要、または大きく描き変えてよい）
     / medium（入力を使うが多少変わってよい）
     / low（元画像の構図・人物・細部を保つのが目的／複数画像の厳密合成／正確な文字描画）
   - note: 理由を1文
4. **aspect**（プロンプトにアスペクト比の指定があればその文字列。無ければ空文字）

事実の捏造はしないこと。担当${e - s}件すべてを返してください。`,
      { label: `retry:${s}-${e - 1}`, phase: 'Retry', schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array', minItems: e - s, maxItems: e - s,
            items: {
              type: 'object',
              properties: {
                key: { type: 'string' },
                summary: { type: 'string' },
                tags: { type: 'array', minItems: 2, maxItems: 4, items: { type: 'string', enum: TAGS } },
                portability: {
                  type: 'object',
                  properties: { level: { type: 'string', enum: ['high', 'medium', 'low'] }, note: { type: 'string' } },
                  required: ['level', 'note'],
                },
                aspect: { type: 'string' },
              },
              required: ['key', 'summary', 'tags', 'portability', 'aspect'],
            },
          },
        },
        required: ['items'],
      }}
    )
  )
)

const items = results.filter(Boolean).flatMap((r) => r.items)
log(`再実行で ${items.length}/28 件を回収`)
return { count: items.length, items }
