export const meta = {
  name: 'miey-priority-map-2026-07-26',
  description: '7/8以降の進捗を各領域から並行収集し、7/26版の優先順位マップの材料を作る',
  phases: [
    { title: 'Recon', detail: '領域別に現状を並行調査' },
    { title: 'Synth', detail: '横断で矛盾・抜けを潰す' },
  ],
}

const VAULT = '/Users/sakamotomitsue/Documents/works/obsidian'

const AREAS = [
  {
    key: 'handoff-timeline',
    prompt: `Obsidian vault (${VAULT}) を調べ、2026-07-08 から 2026-07-26 の間に何が進んだかの時系列を作れ。
調査対象:
- ${VAULT}/ai-handoff/AI参謀会議.md と ${VAULT}/ai-handoff/archive/2026-07.md
- git log --since=2026-07-08 --name-only（obsidian リポジトリ）で変更されたファイル群
- ${VAULT}/diary/2026-07-05.md 以降の diary（diary_archive も含む）
出力: 日付順に「何が完了したか／何が着手中で止まっているか／何が新たに始まったか」。特に「7/8 の優先順位マップの各項目（ヤフオク・メルカリ／四柱推命商品／恋愛系情報商材／note／YouTube／X／AI第二の脳・Obsidian構築商品／公式サイト／仮想経営チーム教材）が今どうなっているか」を項目ごとに1〜3行で。憶測は「未確認」と明記。`,
  },
  {
    key: 'uranai-product',
    prompt: `Obsidian vault (${VAULT}) の四柱推命商品「育つ魂の設計図」の現状を調べろ。
調査対象: ${VAULT}/products/ 配下の「育つ魂の設計図」フォルダ全体、obsidian_customer/ 配下の顧客Vault、Cafetalk 関連ファイル、~/.claude/skills/kanteisho・nouhin-pdf。
知りたいこと:
1. 実際のお客様セッションは何件実施済みか（顧客Vault・鑑定書・納品PDFの実在数から数える）。最新の実施日は。
2. 商品として「完成しているもの」と「未完成・穴が空いているもの」の一覧（鑑定書生成／地図／セッション台本／納品フロー／販売ページ／価格／導線）。
3. 次の1手として最も収益に近い未完了タスクは何か（根拠つき）。
出力は箇条書き。ファイルパス付き。憶測は「未確認」と明記。`,
  },
  {
    key: 'obsidian-product',
    prompt: `Obsidian vault (${VAULT}) の「AI第二の脳／Obsidian構築商品」および ブランド「AI記憶の書斎」の現状を調べろ。
調査対象: ${VAULT}/03_stock/03_AI記憶の書斎/ 全体（特に 03_AI記憶の書斎_ブランド正本.md）、${VAULT}/products/ 配下の「AI第二の脳」のシステム/（10_・20_ 等）、本文_AI第二の脳システム_v0 系ファイル。
知りたいこと:
1. 教材本文はどこまで書けているか（章立てと完成率）。
2. 販売導線（LP・note・価格・販売先プラットフォーム）はどこまで決まっているか。
3. 「あと何をすれば売れる状態になるか」を残タスクとして列挙し、それぞれの重さ（軽い/中/重い）を付けろ。
出力は箇条書き。ファイルパス付き。憶測は「未確認」と明記。`,
  },
  {
    key: 'auction-ebay',
    prompt: `Obsidian vault (${VAULT}) の ${VAULT}/03_stock/auction/ 全体を調べ、ヤフオク・メルカリ運用の現状を報告しろ。
知りたいこと:
1. 現在の出品中在庫・出品メモの数、archived の数、直近の売上記録の日付（sales-miey / sales-shared の base・データを見る）。
2. 出品〜発送〜売上記録のワークフローで、すでにスキル化・自動化されている部分と、まだ手作業の部分。
3. 「auction移植パッケージ（お客様版）」の進捗（03_stock/auction/ 配下および関連メモ）。商品化まであと何が要るか。
4. eBay に関する記述が vault 内にあるか（grep 'ebay' 'eBay' 'イーベイ'）。あればその内容、なければ「未着手」と明記。
出力は箇条書き。ファイルパス付き。`,
  },
  {
    key: 'ebay-research',
    prompt: `日本在住の個人が eBay で中古品（家電・スマホ・日本の中古雑貨等）を輸出販売して始める場合の、2026年時点の実務要件を web 検索で調べろ。
知りたいこと:
1. アカウント開設に必要なもの（本人確認、Payoneer 等の入金手段、日本の銀行口座紐付け）と所要日数。
2. 新規セラーの出品リミット（初月に何品／いくらまで）と、リミット解除までの現実的な期間。
3. 手数料構造（落札手数料・ストア料金・為替/入金手数料）のざっくりした合計率。
4. 送料（eBay International Shipping / eLogi / 日本郵便）の選択肢と、初心者が最初に選ぶべき現実解。
5. 「日本から売れやすい中古カテゴリ」の定番。
6. リチウムイオン電池内蔵品（スマホ・モバイルバッテリー等）の国際発送規制の注意点。
出力: 上記1〜6に対する簡潔な事実。数字には出典URLを付けろ。不確実なものは「要確認」と明記。最後に「Mieyが最初の30日でやるべき最小ステップ」を5行以内で。`,
  },
  {
    key: 'content-channels',
    prompt: `Obsidian vault (${VAULT}) の発信チャネル（X / note / YouTube / Cafetalk）の現状を調べろ。
調査対象: ${VAULT}/02_sns-posts/ 全体（articles/_index.md 含む）、note・YouTube 関連の戦略メモ、Cafetalk 関連ファイル。
知りたいこと:
1. 記事のストック数と、直近で公開された記事の日付・タイトル。7/8 以降に何本増えたか。
2. note / YouTube はそれぞれ実際に何本公開済みか（vault 内の記録から分かる範囲で）。着手できていないのはどれか。
3. 各チャネルが今どの商品の導線になっているか（四柱推命／Obsidian構築／auction）。
4. 「1本作れば複数媒体に展開できる」素材のバックログが何本あるか。
出力は箇条書き。ファイルパス付き。憶測は「未確認」と明記。`,
  },
]

phase('Recon')
const recon = await parallel(AREAS.map(a => () =>
  agent(a.prompt, { label: `recon:${a.key}`, phase: 'Recon' }).then(r => ({ key: a.key, text: r }))
))

const good = recon.filter(Boolean)
log(`recon 完了: ${good.map(g => g.key).join(', ')}`)

phase('Synth')
const dossier = good.map(g => `### ${g.key}\n${g.text}`).join('\n\n---\n\n')

const critique = await agent(
`以下は Miey（個人事業主・ADHD×HSP気質・現在は体調不良で稼働量が落ちている）の事業まわりの現状調査レポート群だ。

${dossier}

あなたの仕事は「事実の穴を潰す」こと。以下を出力せよ:
1. レポート間で矛盾している記述（あれば具体的に）。
2. 「未確認」のまま残っていて、優先順位判断に効く重要な空白（上位5つ）。
3. 各領域の「収益までの距離」を、キャッシュ化までの期間で分類せよ: 即金（〜2週間）／短期（1〜2ヶ月）／中期（3〜6ヶ月）／長期（6ヶ月〜）。根拠1行つき。
4. 体調不良で1日の可処分エネルギーが平常の3〜5割しかない前提で、「エネルギー消費が大きいタスク」と「疲れていてもできるタスク」に仕分けせよ。特に対人セッション（HSPで消耗大）と機械的作業を区別すること。
簡潔に、箇条書きで。`,
  { label: 'synth:critique', phase: 'Synth', effort: 'high' }
)

return { dossier, critique }
