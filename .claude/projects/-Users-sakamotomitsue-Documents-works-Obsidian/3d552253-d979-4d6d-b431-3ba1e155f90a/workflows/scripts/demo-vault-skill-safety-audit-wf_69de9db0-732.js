export const meta = {
  name: 'demo-vault-skill-safety-audit',
  description: 'デモvaultでスキルを安全に使うための、パス固定箇所の監査と最小改修案の設計',
  phases: [
    { title: '監査', detail: 'スキル群のハードコードパスを洗い出す' },
    { title: '設計', detail: 'cashbook-capture をデモ対応にする最小改修案' },
  ],
}

const SKILLS_DIR = '/Users/sakamotomitsue/.claude/skills'
const REAL_VAULT = '/Users/sakamotomitsue/Documents/works/obsidian'
const DEMO_VAULT = '/Users/sakamotomitsue/Documents/works/obsidian_demo_vault'

const AUDIT_SCHEMA = {
  type: 'object',
  properties: {
    skills: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          skill: { type: 'string' },
          risk: { type: 'string', enum: ['high', 'medium', 'none'] },
          hardcodedPaths: { type: 'array', items: { type: 'string' } },
          whatBreaksInDemo: { type: 'string' },
          writesToRealVault: { type: 'boolean' },
        },
        required: ['skill', 'risk', 'hardcodedPaths', 'whatBreaksInDemo', 'writesToRealVault'],
      },
    },
    summary: { type: 'string' },
  },
  required: ['skills', 'summary'],
}

phase('監査')

// スキルを3グループに分けて並列監査（1グループ=1エージェント）
const GROUPS = [
  { key: 'cashbook+auction', hint: 'cashbook-capture, auction-listing, auction-sale-record, auction-photo-gallery, sagawa-fare-lookup, mercari-shipping, yahoo-auction-shipping' },
  { key: 'customer+product', hint: 'kanteisho, nouhin-pdf, sns-article, sns-html-graphic, notion-mirror-sync' },
  { key: 'vault+infra', hint: 'vault-stash, diary, ingest, backup-all, web-link-bundle-capture' },
]

const audits = await parallel(GROUPS.map(g => () => agent(
  `あなたは Claude Code のスキル定義を監査するエンジニアです。

対象ディレクトリ: ${SKILLS_DIR}
今回のグループ: ${g.hint}

各スキルの SKILL.md（および同梱スクリプト）を実際に読み、次を洗い出してください。

1. **ハードコードされた個人の絶対パス**をすべて列挙する。特に:
   - 本番 Obsidian vault: ${REAL_VAULT}
   - Google Drive のマウントパス（~/Library/CloudStorage/GoogleDrive-...）
   - 個人のメールアドレス・アカウント名を含むパス
   - Gmail のラベルID等、個人アカウント固有の識別子
2. そのスキルを **デモvault（${DEMO_VAULT}）を作業ディレクトリにして実行した場合**、
   本番の vault や本番の Drive フォルダに **書き込んでしまうか** を判定する（writesToRealVault）。
   「読むだけ」なら false、1箇所でも書き込み・移動・リネームが本番側に向かうなら true。
3. risk 判定:
   - high  = デモ実行で本番データを書き換える／本番の個人情報が画面に出る
   - medium = 読み取りのみだが本番パス依存で動かない、または個人情報が表示される
   - none  = パス非依存で安全

**ファイルは実際に読むこと。推測で書かない。** 存在しないスキルはスキップし、その旨を summary に書く。
グループ内の全スキルについて1件ずつ返すこと。`,
  { label: `audit:${g.key}`, phase: '監査', schema: AUDIT_SCHEMA }
)))

const all = audits.filter(Boolean).flatMap(a => a.skills || [])
const risky = all.filter(s => s.risk === 'high')
log(`監査完了: ${all.length}スキル中、high=${risky.length} / medium=${all.filter(s => s.risk === 'medium').length}`)

phase('設計')

const DESIGN_SCHEMA = {
  type: 'object',
  properties: {
    approach: { type: 'string' },
    editedSections: { type: 'array', items: { type: 'string' } },
    exactDiff: { type: 'string' },
    demoPaths: { type: 'object', additionalProperties: true },
    backwardCompatible: { type: 'boolean' },
    risks: { type: 'array', items: { type: 'string' } },
    lineCountAdded: { type: 'number' },
  },
  required: ['approach', 'exactDiff', 'backwardCompatible', 'risks', 'lineCountAdded'],
}

// 3案を独立に出させて、後で司令塔が選ぶ（判断パネル）
const OPTIONS = [
  { key: 'A-切替表', brief: '本番スキルに「作業ディレクトリがデモvaultならデモ用パスを使う」という小さな対応表とガード文を追記する案。新しい設定ファイルもスクリプトも作らない、最小の追記。' },
  { key: 'B-設定ファイル', brief: 'vault ごとに小さな設定ファイル（例: vault直下の .cashbook-paths.md）を置き、スキルはそれを読んでパスを決める案。設定が無ければ従来の本番パスにフォールバックする。' },
  { key: 'C-別スキル複製', brief: 'cashbook-capture-demo という別スキルを作り、デモ用パスだけ差し替える案。本番スキルには一切触れない。' },
]

const designs = await parallel(OPTIONS.map(o => () => agent(
  `${SKILLS_DIR}/cashbook-capture/SKILL.md を実際に読んでから設計してください。

【背景】
ユーザー(Miey)は 2026-08-10 の生徒向けレッスンで「レシート処理して」というスキルのデモを見せたい。
本番の家計簿には介護費・ペット費など個人情報が入っているため画面に出せない。
デモ用 vault ${DEMO_VAULT} にダミーの家計簿を作り、Google Drive にもデモ用レシートフォルダを作る。

デモvaultの実際の構成は次のとおり（日本語の初心者向け命名。本番の 03_stock/08_cashbook とは違う）:
  日記/ 保管庫/ 原文/ 添付/ テンプレート/ wiki/ リンクでつながるプロジェクト管理デモ/ CLAUDE.md !_ようこそ.md

【この案】${o.key}
${o.brief}

【制約 — 厳守】
- ユーザーのルール「ルールは最低限＋大枠で始める。先回りで細かく決めない」を守る。追記は最小限。
- 本番の運用（${REAL_VAULT} で「レシート処理して」と言ったときの挙動）が**一切変わらない**こと（backwardCompatible）。
- 最重要の安全要件: デモ実行中に本番の家計簿ファイルと本番の receipts フォルダに**絶対に書き込まない**こと。この保証をどう担保するかを必ず書く。
- レッスン本番で事故ると信用を失う。複雑さより確実さを優先する。

【出力】
- approach: この案の要約（3行以内）
- exactDiff: SKILL.md に実際に追記／変更する文面を、そのまま貼れる形で書く（日本語。ユーザーの既存の文体・表記に合わせる）
- editedSections: 変更する見出し名の一覧
- demoPaths: デモ用に使うパスの対応表（家計簿ファイル、レシート受け皿、処理済み退避先）。デモvaultの命名規則に合わせること
- backwardCompatible: 本番挙動が変わらないなら true
- risks: この案の弱点・事故りうる点を正直に3つ以上
- lineCountAdded: SKILL.md に増える概算行数`,
  { label: `design:${o.key}`, phase: '設計', schema: DESIGN_SCHEMA }
)))

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    winner: { type: 'string' },
    why: { type: 'string' },
    graftFromOthers: { type: 'array', items: { type: 'string' } },
    fatalFlaws: { type: 'array', items: { type: 'object', properties: { option: { type: 'string' }, flaw: { type: 'string' } }, required: ['option', 'flaw'] } },
  },
  required: ['winner', 'why', 'fatalFlaws'],
}

const judged = await parallel([
  { lens: '事故らなさ（レッスン本番で本番データを壊さないか）' },
  { lens: '運用の軽さ（Mieyが後で自分で直せるか・二重管理にならないか）' },
  { lens: '商品化への波及（将来この仕組みを生徒に配れるか）' },
].map(j => () => agent(
  `次の3案を「${j.lens}」の観点だけで評価し、勝者を1つ選んでください。

${designs.filter(Boolean).map((d, i) => `
=== 案 ${OPTIONS[i].key} ===
approach: ${d.approach}
backwardCompatible: ${d.backwardCompatible}
追加行数: ${d.lineCountAdded}
自己申告リスク: ${(d.risks || []).join(' / ')}
差分:
${d.exactDiff}
`).join('\n')}

前提: Mieyは非エンジニア寄りの運用者。ルールを増やしすぎると破綻する。
2026-08-10 のレッスンまで時間がない。
各案の**致命的な欠陥**を必ず指摘すること（無いと思っても探す）。`,
  { label: `judge:${j.lens.slice(0, 8)}`, phase: '設計', schema: JUDGE_SCHEMA }
)))

return {
  audit: { all, risky, summaries: audits.filter(Boolean).map(a => a.summary) },
  designs: designs.filter(Boolean).map((d, i) => ({ option: OPTIONS[i].key, ...d })),
  verdicts: judged.filter(Boolean),
}