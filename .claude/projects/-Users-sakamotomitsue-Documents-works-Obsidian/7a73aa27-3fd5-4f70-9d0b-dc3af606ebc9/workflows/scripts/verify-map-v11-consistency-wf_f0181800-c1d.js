export const meta = {
  name: 'verify-map-v11-consistency',
  description: '天命の地図v1.1統合（★方式）後の全対象ファイル整合性を敵対的に検証',
  phases: [
    { title: 'Verify', detail: '各ファイルを独立に精読し、旧3表＋観察記録前提の残存記述を探す' },
  ],
}

phase('Verify')

const BASE = '/Users/sakamotomitsue/Documents/works/obsidian'
const P = BASE + '/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳'

const CONTEXT = `
背景：「天命の地図」の構造が2026-07-21に v1.1 へ改訂された。
旧形式：「AIから届いた問いの候補」「AI賢者読み比べで残った言葉」「今月の問い」「観察記録」の4セクション（3つの類似表＋観察記録表）。
新形式：「AIから届いた問いの候補」1セクションのみ。表の列は「★／問い・言葉／出どころ／本人の反応／本人の言葉」。
表の下に凡例1行「★＝今月の問い（選んだ日／この問いは 助けになる・プレッシャーになる・まだわからない）」。
「今月の問い」という概念名は生きている（★印の行の名前）。「AI賢者読み比べ」の対話ログ（原文/対話ログ/のファイル）も従来どおり存在する——消えたのは地図内の専用セクションだけ。
観察記録セクションは廃止（日常メモはスマホ・手帳→次回セッションで一緒に表へ刻む運用）。
★印を付けるのは本人だけ。AIは付けない。

タスク：指定ファイルを全文読み、新形式と矛盾する記述・旧形式（独立した「賢者読み比べで残った言葉」セクション、独立した「今月の問い」表、観察記録表への記入指示）を前提とした手順・台詞・説明が残っていないかを敵対的に探せ。
明示的に問題なしとしてよいもの：過去の設計協議・変更履歴・改善ログ・制作メモ内の歴史的記述、「AI賢者読み比べ」ログ（対話ログファイル）への言及、概念名としての「今月の問い」。
`

const TARGETS = [
  { key: 'kyozai', files: [P + '/02_教材（自己学習用・凍結中）/教材_モジュール1_天命の地図_v0.md'] },
  { key: 'manual', files: [P + '/03_講師運用/講師マニュアル_体験セッション進行台本_v1.md'] },
  { key: 'templates', files: [P + '/03_講師運用/天命の地図_テンプレート_v1_設計案.md', P + '/03_講師運用/天命の地図_事前版テンプレート_v1.md'] },
  { key: 'instances', files: [BASE + '/03_stock/05_思考_自己分析/鑑定書/天命の地図_Miey_新形式v1_ロールプレイ版.md', P + '/03_講師運用/お客様別（非公開）/akiko_sama/天命の地図_akiko_sama_事前版.md', P + '/03_講師運用/お客様別（非公開）/kayo_sama/天命の地図_kayo_sama_事前版.md', BASE + '/03_stock/family/friends/kou_san/天命の地図_kou_san_事前版.md'] },
]

const SCHEMA = {
  type: 'object',
  properties: {
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          file: { type: 'string' },
          line: { type: 'number' },
          quote: { type: 'string' },
          problem: { type: 'string' },
          severity: { type: 'string', enum: ['must-fix', 'minor', 'info'] },
        },
        required: ['file', 'quote', 'problem', 'severity'],
      },
    },
  },
  required: ['issues'],
}

const results = await parallel(TARGETS.map(t => () =>
  agent(
    CONTEXT + '\n対象ファイル（Readで全文読むこと）：\n' + t.files.map(f => '- ' + f).join('\n') +
    '\n\n見つけた問題だけを issues に返せ。問題なしなら空配列。歴史的記述・許容項目を issues に入れないこと。ファイルは読むだけで編集しない。',
    { label: 'verify:' + t.key, phase: 'Verify', schema: SCHEMA, effort: 'high' }
  )
))

const issues = results.filter(Boolean).flatMap(r => r.issues)
return { issues }