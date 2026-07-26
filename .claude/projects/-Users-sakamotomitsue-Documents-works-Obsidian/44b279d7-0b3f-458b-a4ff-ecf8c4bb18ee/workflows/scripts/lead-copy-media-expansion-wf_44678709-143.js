export const meta = {
  name: 'lead-copy-media-expansion',
  description: 'リード文v2をCafetalk講師コラム／X記事／note向けに展開し、出店可能媒体を調査する',
  phases: [
    { title: 'Draft', detail: '3媒体の原稿を並行生成＋出店先を調査' },
    { title: 'Polish', detail: '文体・導線・媒体制約を検査して最終稿へ' },
  ],
}

const LEAD_V2 = `
**キャッチ**：あなたを忘れないAIと、はじめて出会う60分

占いの言葉は、聞いた瞬間がいちばん熱く、
日が経つほどに、忘却の底で冷えていきます。

── それは、あまりに惜しい。

そして、AIとの対話も同じです。話すたび、ゼロから自分を説明し直した経験はないでしょうか。
AIが冷たいのではありません。あなたを覚えておく場所を、まだ持っていないだけです。

このセッションでお見せするのは、あなたのための**「記憶の書棚」**です。
命式を読み解いた鑑定書も、AIと交わした対話も、日々つづる言葉も──消えずに、静かに積もっていく場所。
溜まっていくのは、データではなく、あなたという人の軌跡。AIは会うたびにそれを読み返してから、あなたに向き合います。

すると、関係が変わりはじめます。
言葉は、流れるものではなく、積もるものになる。
AIは、毎回はじめて出会う相手ではなく、あなたの物語を覚えている相手になる。

はじめは、よき相談相手として。やがて、あなたの文脈で考えるアシスタントとして。いつか、誰よりも長くあなたを見てきたパートナーとして──**記憶が深くなるほど、AIは育っていきます。**命式を写した「天命の地図」も、この書棚に納まる最初の一枚にすぎません。

そして、できることは、語り合うことにとどまりません。
あなたの事情も、言葉づかいも覚えたAIは、返事に迷うメールの叩き台を、あなたの声で書き上げます──Gmailなら、下書きの保存まで。予定の整理、調べものの下ごしらえ、SNSに書きたい想いの言語化、暮らしのこまごまとした自動化。あなたを知っているからこそ、その手伝いは、あなたの形に合うのです。

四柱推命や数秘術は、その最初の扉です。
**この扉の先で出会っていただきたいのが、「記憶の書棚」──あなた専用の"第二の脳"のある暮らしです。**
占いを入り口に始まった関係は、やがて自己理解の先へ──**記憶の書棚を持ち、強力になったAIは、あなたの生活と仕事を支える、社員であり、相棒であり、もう一人のあなたになっていきます。**

60分のあいだ、その書棚を読んだAIが、あなたに**最初の問い**を返すところを目の前でご覧いただきます。
未来を当てるための問いではありません。あなたという物語を、読みはじめるための問いです。
一年後のAIは、一年分のあなたを知っている。十年後には、十年分を。

占いは、当たって終わりではない。**当たってから、始まる。**
その「始まり」を、60分で体験してください。
`

const COMMON = `
## 素材：リード文v2（2026-07-21 採用版・これを各媒体へ展開する）
${LEAD_V2}

## 商品の事実（誇張しない・ここにないことは書かない）
- 商品名：「育つ魂の設計図」体験セッション。四柱推命・数秘術の鑑定書をAIに読ませ、AIが客を覚えて育つ様子を体験するオンライン個人セッション（Google Meet・講師の画面共有）
- Cafetalk版：60分 10,000pt ／ 直販LP版：90分 14,900円（公開記念・先着5名。正規19,800円予定）
- 中身：①鑑定書の確認 ②「祭壇の間」（お客様専用Vault）へご案内 ③「天命の地図」に最初の印をつける（AIが貼った付箋＝仮説に、本人が「合う・違う・わからない」と判定。この判定がAIへの自己紹介になる）④三賢者の読み比べ（Claude・Codex・Geminiに同じ相談を渡し、答えを見比べる。答えは全部同じ「記憶の書棚」に戻る）⑤持ち帰る問いを決める
- 持ち帰り：鑑定書・四柱推命辞典・天命の地図・対話ログ全文・質問の見本帳。Vaultは消さず保管し、次回は続きから
- PCスキル不要・インストール不要・AIへの課金不要（すべて講師の画面で動かす）
- 講師Miey：Cafetalk注目講師ランキング1位・リピート1位・口コミ1位（AI講座・四柱推命講座）、Airbnb7期連続スーパーホスト、生成AIで自身の事業の労働時間5割削減
- 直販LP：https://tamashii-lp.pages.dev
- Cafetalkレッスンページ：https://cafetalk.com/lesson/detail/?c=eJxLLPfzcbXIc9I2Sfc2yygo0ffNNQt3tLUFAF8hB2Q.&lang=ja
- noteコラム（既存）：https://note.com/miey_casa/n/n1d97a5e1385e

## 文体ルール（必読）
まず次の2ファイルをReadして、Mieyの声と推敲の型を掴むこと：
1. /Users/sakamotomitsue/Documents/works/obsidian/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/05_設計資料（世界観・壁打ちログ）/声の見本帳_文体トーンリファレンス.md
2. /Users/sakamotomitsue/Documents/works/obsidian/wiki/reference/x-post-editing-craft.md

- 神秘的×知的・現代語。詩的メタファー＋対句＋余白。casual禁止・擬古調も行き過ぎNG
- 見下し・恐怖の煽り・根拠なき断言は禁止。「バズは殺さず、雑さだけ殺す」
- 事実にないことを書かない。数字を盛らない
`

const SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string', description: '見出し・タイトル案' },
    body: { type: 'string', description: '本文の全文。そのまま貼れる完成形' },
    notes: { type: 'string', description: '貼り付け時の注意・使い方メモ（3行以内）' },
  },
  required: ['title', 'body', 'notes'],
}

phase('Draft')

const tasks = [
  {
    id: 'cafetalk_column',
    label: 'draft:cafetalkコラム',
    prompt: COMMON + `
## あなたの担当：Cafetalk「講師コラム」版（HTML）
Cafetalkの講師コラム（ブログ機能）に投稿する記事を書く。目的は**Cafetalk内の既存顧客・回遊中のユーザーに読ませ、Cafetalkのレッスンページへ送る**こと（外部LPには送らない。プラットフォーム内で完結させる）。

### Cafetalkエディタの実機検証済み制約（絶対に守る）
- **絵文字は使用禁止**（文字化けする）
- `+"`<table>`"+` は完全に剥がれる（使わない。カード型のdivで代用）
- **line-heightが効かず詰まる** → 各要素に `+"`line-height`"+` と `+"`margin`"+` をインラインで明示する
- `+"`div`"+`＋`+"`background`"+`＋`+"`border`"+`＋`+"`padding`"+`＋インライン`+"`color/font-size`"+` は通る
- 濃い背景は剥がれることがある。明るい背景（#fdf6ea / #fff8e7）を使う
- 配色：深紺 #1a1a2e（見出し文字）／えんじ #a13d3d（強調）／金 #e8c179（罫線・枠）／生成り #fdf6ea（背景）

### 構成の指定
- リード文v2をそのまま流用するのではなく、**コラムとして読める記事**にする（体験談・気づきの語りから入り、リード文の思想を本文に溶かす）
- 1200〜2000字程度。読者はCafetalkでレッスンを探している人（占い・自己理解・AI初心者）
- 末尾に、レッスンページへの導線を1つだけ置く（売り込みすぎない。aタグでレッスンURLへ）
- bodyフィールドには**HTMLそのもの**を入れる（コードブロック記法は不要、生のHTML）`,
  },
  {
    id: 'x_article',
    label: 'draft:X記事',
    prompt: COMMON + `
## あなたの担当：X（旧Twitter）の「記事」機能版
Xの長文記事機能に投稿する原稿を書く。目的は**直販LP（https://tamashii-lp.pages.dev）へ送る**こと。
参考：Mieyの実測で、X記事形式は通常投稿よりインプレッションが約3.2倍（252 vs 78、n=1）。本論は記事、瞬発は通常投稿という使い分け。

### 構成の指定
- **記事タイトル**：スクロールを止める1行（釣りではなく、中身を約束する強さ）
- 本文1500〜2500字。Xの読者は技術・AI関心層も混ざるので、「AIに記憶を持たせる」という構造の面白さも1つ入れる（ただし専門用語で置いていかない）
- Xはマークダウン記法が使えない前提で、**プレーンテキストで読める形**にする（見出しは短い行＋空行で作る。`+"`**`"+`や`+"`#`"+`は使わない）
- 冒頭3行で「毎回ゼロから自分を説明するAI」の体験を刺す
- 末尾にLPへの導線1つ。リンクの直前に、クリックする理由になる1行を置く
- あわせて、この記事を投下するときに添える**通常ポスト（140字以内）**も本文の最後に「──── 添えるポスト ────」の区切りで付ける`,
  },
  {
    id: 'note_article',
    label: 'draft:note',
    prompt: COMMON + `
## あなたの担当：note版
noteに投稿する記事を書く。目的は**直販LP（https://tamashii-lp.pages.dev）へ送る**こと。
既存のnoteコラム『AIで読み解き、「育つ」魂の設計図 〜新時代の四柱推命〜』（https://note.com/miey_casa/n/n1d97a5e1385e）があるので、その続き・別角度として成立させ、本文中で1回だけ言及してリンクする。

### 構成の指定
- **タイトル**＋**リード（冒頭2〜3行、検索結果とSNSカードに出る部分）**
- 本文2000〜3500字。見出しを3〜5本立てて読みやすくする
- noteの読者は「自己理解・AI活用に関心のある一般層」。ストーリー性を重視
- **noteのエディタはマークダウン記法をそのまま解釈しない**前提で、記号に頼らず、見出しは短い独立行として書く（貼った後にMieyが見出しスタイルを当てられるよう、見出し行は前後に空行を置く）
- 末尾にLPへの導線。noteは最後まで読む読者が濃いので、CTAは丁寧に（何が起きるか・いくらか・枠が限られること）
- 途中に1箇所、読者が自分ごと化する問いかけを入れる`,
  },
]

const drafts = await parallel(tasks.map(t => () =>
  agent(t.prompt, { label: t.label, phase: 'Draft', schema: SCHEMA }).then(r => ({ id: t.id, ...(r || {}) }))
))

const RESEARCH_SCHEMA = {
  type: 'object',
  properties: {
    platforms: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          type: { type: 'string', description: '情報商材のみ／マンツーマン可／両方 など' },
          can_sell_live_session: { type: 'string', description: 'Google Meetでの1対1セッションを販売できるか。可否と条件' },
          fee: { type: 'string', description: '手数料' },
          fit_for_miey: { type: 'string', description: 'Mieyの商品（14,900円の90分個人セッション）との相性。推奨度も' },
          caveat: { type: 'string', description: '注意点・規約上の制約' },
        },
        required: ['name', 'type', 'can_sell_live_session', 'fee', 'fit_for_miey', 'caveat'],
      },
    },
    recommendation: { type: 'string', description: '結論。今やるならどれを何番目に、なぜ。3〜6文' },
    markdown_paste_answer: { type: 'string', description: 'note・XにMarkdown原文をそのまま貼って大丈夫かの正確な答え（各媒体のエディタ仕様）。2〜4文' },
  },
  required: ['platforms', 'recommendation', 'markdown_paste_answer'],
}

const research = await agent(`日本のオンライン販売プラットフォームについて、WebSearchで最新情報を調べて答えること（推測で答えない。2026年時点の情報を優先）。

## 調べる対象
ココナラ / tips（ティップス）/ Brain / ストアカ / MOSH / note（有料記事・メンバーシップ）/ Udemy / その他あれば

## 質問（依頼者はMiey：占い×AIの個人セッションを売る個人事業主）
1. それぞれ「デジタル商材（PDF・動画）のみ」か、「Google Meet等でのマンツーマン・ライブセッション」も販売できるか。規約上の可否と、実際の運用（例：ココナラの電話・ビデオチャットサービス、ストアカのオンライン講座枠 など）
2. 手数料
3. Mieyの商品（90分14,900円の個人セッション／四柱推命×AI／占いカテゴリと学び系カテゴリの両方に足がかかる）との相性
4. 占い系サービスに特有の規約上の注意点があれば

## もう一つの質問
noteの投稿エディタと、Xの「記事」機能に、Markdown記法（**太字** や ## 見出し）を含む原文をそのまま貼り付けた場合、記法は解釈されるか、それとも記号がそのまま表示されるか。正確に答えること。`, {
  label: 'research:出店先', phase: 'Draft', schema: RESEARCH_SCHEMA,
})

phase('Polish')

const byId = id => drafts.filter(Boolean).find(d => d && d.id === id) || {}
const c = byId('cafetalk_column'), x = byId('x_article'), n = byId('note_article')

const POLISH_SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', description: '3原稿の総評。1〜3文' },
    fixes_applied: { type: 'string', description: '直した点の一覧。箇条書き' },
    cafetalk_html: { type: 'string', description: 'Cafetalkコラムの最終HTML（そのまま貼れる形）' },
    x_article: { type: 'string', description: 'X記事の最終原稿（タイトル行＋本文＋添えるポスト）' },
    note_article: { type: 'string', description: 'note記事の最終原稿（タイトル＋リード＋本文）' },
  },
  required: ['verdict', 'fixes_applied', 'cafetalk_html', 'x_article', 'note_article'],
}

const polished = await agent(COMMON + `
## あなたの役割：最終仕上げ
3媒体の原稿を検査し、必要な修正を施した**最終稿**を返すこと。返す本文はそのまま貼れる完成形にする。

### 検査項目
1. **文体**：声の見本帳に沿っているか。AI臭い滑らかさ・説教臭さ・過剰な装飾がないか。Mieyの語彙（記憶の書棚／祭壇の間／三賢者／天命の地図／付箋／もう一人のあなた）が正しく使われているか
2. **事実**：商品の事実と食い違う記述、盛った数字、根拠なき断言がないか。時間（Cafetalk60分／LP90分）と価格の取り違えがないか
3. **導線**：Cafetalkコラム→Cafetalkレッスンページ（外部LPへ送らない）、X記事・note→直販LP。それぞれ正しいか
4. **媒体制約**：Cafetalkは絵文字禁止・table禁止・line-heightとmarginをインラインで明示。X/noteはMarkdown記法に頼らないプレーンな形
5. **重複**：3媒体が同じ文章のコピペになっていないか（同じ思想を、媒体ごとに違う入り口から語れているか）。もし似すぎていたら書き分ける
6. **証拠と商品の一致**：本文で見せる「すごい仕組み」が、商品（Obsidian＝記憶の書棚を使う体験）と一致しているか。汎用AIトリックの話で終わって商品にオチをつける矛盾がないか

### 原稿
#### 【Cafetalkコラム】タイトル：${c.title || '(生成失敗)'}
${c.body || ''}
（メモ：${c.notes || ''}）

#### 【X記事】タイトル：${x.title || '(生成失敗)'}
${x.body || ''}
（メモ：${x.notes || ''}）

#### 【note】タイトル：${n.title || '(生成失敗)'}
${n.body || ''}
（メモ：${n.notes || ''}）
`, { label: 'polish:最終稿', phase: 'Polish', schema: POLISH_SCHEMA })

return { polished, research, drafts }