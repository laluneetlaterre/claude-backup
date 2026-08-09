export const meta = {
  name: 'anb-enrich-cases',
  description: 'Awesome-Nano-Banana-images の140事例に、日本語の要約・タグ・ChatGPT互換性の見立てを付ける',
  phases: [{ title: 'Enrich', detail: '14件ずつ10バッチに分けて並列に付与' }],
}

const JSON_PATH = '/private/tmp/claude-501/-Users-sakamotomitsue-Documents-works-obsidian/75aa8b37-76a7-4c1c-bc61-ca9ac71ae08b/scratchpad/anb_cases.json'
const TOTAL = 140
const BATCH = 14

// 事典として機能するタグ体系。ここから選ばせる（自由記述だと表記ゆれで死ぬ）
const TAGS = [
  // A: 何を作るか
  'フィギュア・立体', '人物・ポートレート', 'キャラクター', '風景・背景', 'モノ・商品',
  '図解・インフォグラフィック', '文字・タイポグラフィ', '地図・空間', '漫画・コマ割り',
  // B: 何をするか
  'スタイル変換', '画像修復・高解像度化', '合成・差し替え', '部分編集', '視点変更',
  '色替え・配色', '分解・抽出', '拡張・アウトペイント', '複数画像の統合',
  // C: 用途
  'SNS・アイキャッチ', '広告・バナー', '商品モック', 'グッズ・ギフト', '資料・スライド',
  '衣装・ファッション', '建築・インテリア', '教育・解説',
  // D: 特徴
  'テンプレート', '短いプロンプト', '長文プロンプト', '和風', 'レトロ', 'ミニチュア', '3D・CG',
]

phase('Enrich')

const batches = []
for (let s = 0; s < TOTAL; s += BATCH) batches.push({ start: s, end: Math.min(s + BATCH, TOTAL) })

const results = await parallel(
  batches.map((b, bi) => () =>
    agent(`あなたは画像生成プロンプト事典の編集者です。日本語で作業します。

# 元データ
${JSON_PATH} を Read で読んでください。JSON配列で、1要素＝1事例です。
あなたが担当するのは **配列のインデックス ${b.start} 〜 ${b.end - 1}（0始まり・${b.end - b.start}件）** です。それ以外は触らないでください。

各要素のフィールド：
- key … 事例の識別子（pro-001 / std-001 など）
- title_ja … 原典の日本語題名
- prompt … プロンプト本文（原文。**絶対に改変しない・要約もしない**）
- input_note … 入力画像についての原典の説明（空のこともある）
- needs_input … 入力画像が要るか
- notes … 原典の注記
- authors … 元の投稿者

# やること
担当分の各事例について、以下の3つを判断して返してください。**プロンプト本文には一切触れません。**

1. **summary**（日本語・40〜70字）
   「どんな絵ができるか」＋「どういう場面で効くか」。題名の言い換えで終わらせない。
   プロンプト本文を実際に読んで、何が起きるのかを具体的に書く。

2. **tags**（下のリストから2〜4個だけ選ぶ。**リストに無い語は絶対に使わない**）
${TAGS.map((t) => `   - ${t}`).join('\n')}

3. **portability**（ChatGPT の画像生成で同じ結果が出せるかの見立て）
   - level: high / medium / low
   - note: 1文で理由。以下の判断軸を使うこと：
     * **high** … 入力画像が不要、または入力を大きく描き変えてよいもの。自然文だけで完結するもの
     * **medium** … 入力画像を使うが、多少描き変わっても目的を達するもの
     * **low** … 「元画像の構図・人物・細部を保ったまま一部だけ変える」ことが目的のもの、
       複数の入力画像を厳密に合成するもの、正確な文字を描くもの。
       Nano Banana は編集モデルとして入力保持が強く、ChatGPT の画像生成は描き直す方向に寄るため。

4. **aspect**（プロンプト本文にアスペクト比の指定があればその文字列。無ければ空文字）

# 注意
- prompt が空の事例が1件あります（std-056）。その場合 summary は「原典にプロンプト本文の記載なし」と明記し、tags は題名から推測して付けてください。
- 事実を捏造しないこと。プロンプトに書かれていないことを summary に書かない。

担当した ${b.end - b.start} 件すべてを返してください（1件も落とさない）。`,
      { label: `enrich:${b.start}-${b.end - 1}`, phase: 'Enrich', schema: {
        type: 'object',
        properties: {
          items: {
            type: 'array',
            minItems: b.end - b.start,
            maxItems: b.end - b.start,
            items: {
              type: 'object',
              properties: {
                key: { type: 'string' },
                summary: { type: 'string' },
                tags: { type: 'array', minItems: 2, maxItems: 4, items: { type: 'string', enum: TAGS } },
                portability: {
                  type: 'object',
                  properties: {
                    level: { type: 'string', enum: ['high', 'medium', 'low'] },
                    note: { type: 'string' },
                  },
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

const all = results.filter(Boolean).flatMap((r) => r.items)
const seen = new Set()
const merged = all.filter((x) => (seen.has(x.key) ? false : (seen.add(x.key), true)))
log(`${merged.length}/${TOTAL} 件に要約・タグを付与`)

const tagCount = {}
for (const m of merged) for (const t of m.tags) tagCount[t] = (tagCount[t] ?? 0) + 1

return { count: merged.length, items: merged, tagCount }
