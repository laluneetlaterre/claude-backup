export const meta = {
  name: 'auction-listing-fill-missing-media',
  description: '出品メモ各ファイルの未生成媒体（ヤフオク/メルカリ）の出品文を追加生成',
  phases: [
    { title: 'Generate missing media listings', detail: '13ファイル×不足媒体1件ずつ、並列生成してファイルへ追記保存' },
  ],
}

const BASE = '/Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/出品メモ/'
const RULES_DIR = '/Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/prompts/'
const SHIPPING_RULE = '/Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/rules/shipping.md'

const UNIVERSAL = RULES_DIR + 'prompt-universal.md'
const MERCARI_RULES = RULES_DIR + 'mercari-rules.md'
const YAHOO_RULES = RULES_DIR + 'yahoo-auction-rules.md'
const CONDITION_RULES = RULES_DIR + 'condition-phrases.md'

const TASKS = [
  { file: '007 ジェームズ・ボンド 記念メダル.md', existing: 'ヤフオク', missing: 'メルカリ' },
  { file: 'Pioneer AVIC-ZH0077 カーナビ.md', existing: 'ヤフオク', missing: 'メルカリ' },
  { file: 'ユピテル　ふなっしー.md', existing: 'ヤフオク', missing: 'メルカリ' },
  { file: 'ユピテル　アストンカーナビ.md', existing: 'ヤフオク', missing: 'メルカリ' },
  { file: '蛇バッグ.md', existing: 'ヤフオク', missing: 'メルカリ' },
  { file: 'DRINK CUP BASE.md', existing: 'ヤフオク', missing: 'メルカリ' },
  { file: 'BLUE CROSS キューティクルリムーバー.md', existing: 'メルカリ', missing: 'ヤフオク' },
  { file: 'Lightning端子 有線イヤホン.md', existing: 'メルカリ', missing: 'ヤフオク' },
  { file: 'Micro USB Type-B ケーブル 2m ホワイト.md', existing: 'メルカリ', missing: 'ヤフオク' },
  { file: 'USB-A to Lightningケーブル 黒 53cm.md', existing: 'メルカリ', missing: 'ヤフオク' },
  { file: 'iPhone Lightning充電延長ケーブル 1m.md', existing: 'メルカリ', missing: 'ヤフオク' },
  { file: 'ツタンカーメン缶マグネット.md', existing: 'メルカリ', missing: 'ヤフオク' },
  { file: 'ベネチアンマスク ピンバッジ.md', existing: 'メルカリ', missing: 'ヤフオク' },
]

phase('Generate missing media listings')

function buildPrompt(t) {
  const rulePath = t.missing === 'メルカリ' ? MERCARI_RULES : YAHOO_RULES
  const lines = []
  lines.push('あなたは Obsidian Vault のオークション出品文作成担当です。')
  lines.push('対象ファイル（絶対パス）: ' + BASE + t.file)
  lines.push('')
  lines.push('このファイルには既に「' + t.existing + '」用の出品タイトル・本文・配送/カテゴリーメモが生成済みです。')
  lines.push('今回のタスクは、まだ生成されていない「' + t.missing + '」用の出品文（タイトル・本文・カテゴリー候補・配送候補）を新しく作成し、同じファイルに追記保存することです。')
  lines.push('')
  lines.push('厳守事項:')
  lines.push('1. まず対象ファイル全文を読み、商品名・サイズ・色・素材・状態・付属品・アピール・写真フォルダ・既存の生成済み出品文をすべて把握する。')
  lines.push('2. 次のルールファイルを必ず読んでから執筆する。ルールの実体はここに書かれているものが正であり、内容を勝手に要約・簡略化しない。')
  lines.push('   - ' + UNIVERSAL)
  lines.push('   - ' + rulePath + '（' + t.missing + '専用の細則）')
  lines.push('   - ' + CONDITION_RULES + '（状態表現の言い回し）')
  lines.push('   - ' + SHIPPING_RULE + '（配送方法・送料・梱包材サイズ・匿名発送可否の唯一の正。ここに無い金額を作らない）')
  lines.push('3. サイズは全て「約」を付ける。事実と違うことは書かない。ブランド・素材・真贋・年代・型番はメモに明記がない限り断定しない。傷・汚れは隠さず、condition-phrases.mdの表現を使う。')
  lines.push('4. メルカリ用本文はHTML不可、スマホで読みやすい短文・短段落のプレーンテキスト。ヤフオク用本文はHTML（yahoo-auction-rules.mdの構成・装飾・配色に従う。写真を埋め込むHTMLは書かない）。')
  lines.push('5. 配送候補は shipping.md の早見表から、対象ファイルに書かれている梱包後サイズ・厚み・重さの条件に合うものを選ぶ。厚み等の条件が不明で最安判定が確定できない場合は「厚さ3cm以内なら◯◯円」のように条件付きで書き、要確認として残す。Mieyに質問はしない（分からなければ要確認のまま進める）。匿名・追跡・補償の要否も質問せず、条件に合う候補をすべて明記する。')
  lines.push('6. 出力先: ファイル内の既存の「## 出品文（生成結果）」相当の見出し（例:「## 出品文（生成結果）」「## 出品文（' + t.existing + '版・生成結果）」等）を探す。')
  lines.push('   a. その見出しがまだ「（' + t.existing + '版・生成結果）」のように媒体名を含んでいない場合は、見出しのテキストだけを「## 出品文（' + t.existing + '版・生成結果）」に書き換える（見出し直下の中身＝タイトル・本文・配送メモの内容は一切変更しない）。')
  lines.push('   b. その直後（既存セクションの内容の後、ファイル末尾の出力ルール注記や区切り線 --- より前）に、新しい見出し「## 出品文（' + t.missing + '版・生成結果）」を追加し、その下に「### タイトル（約40字以内）」「### 本文」「### 配送・カテゴリーメモ」の3つの小見出しで生成内容を書く。')
  lines.push('7. ファイル冒頭「## 基本」内の「媒体:」欄が単一媒体表記のままなら、「メルカリ / ヤフオク（両方展開）」のように更新する。他の項目は変更しない。')
  lines.push('8. 断定を避けた「要確認」事項が新たに出た場合は、既存の「## アピール・備考」セクションに箇条書きで追記する（既存の記載は消さず追記のみ。セクション自体を新設しない）。')
  lines.push('9. 上記1〜8を踏まえてEditツールで実際にファイルへ保存する。保存せず提案するだけで終わらせない。')
  lines.push('')
  lines.push('完了したら、追記した見出し名と、要確認として残した項目だけを150字以内で簡潔に報告する。')
  return lines.join('\n')
}

const results = await parallel(TASKS.map(t => () => agent(
  buildPrompt(t),
  { label: t.file + ' (' + t.missing + ')', phase: 'Generate missing media listings' }
).then(r => ({ file: t.file, missing: t.missing, report: r }))))

const succeeded = results.filter(Boolean)
const failed = TASKS.filter((t, i) => !results[i])

log('完了: ' + succeeded.length + '/' + TASKS.length + '件')
if (failed.length) {
  log('失敗: ' + failed.map(f => f.file + '(' + f.missing + ')').join(', '))
}

return { succeeded, failed: failed.map(f => f.file + '(' + f.missing + ')') }
