export const meta = {
  name: 'x-title-and-restaurant-usecase',
  description: 'X記事の上級者向けタイトル案と、飲食店経営でのClaude Code×Obsidian事例を3媒体分作る',
  phases: [
    { title: 'Design', detail: 'タイトル案生成とユースケース設計' },
    { title: 'Write', detail: '3媒体それぞれの挿入パッセージを執筆' },
  ],
}

const CONTEXT = `
## 背景
Miey（占い×AIの個人事業主）が、「育つ魂の設計図」体験セッション（四柱推命の鑑定書をAIに読ませ、AIが客を覚えて育つ様子を見せる）の集客記事を、X記事・note・Cafetalk講師コラムの3媒体に出そうとしている。

## 商品の核となる思想（記事の背骨・すでに書かれている）
- AIが冷たいのではない。あなたを覚えておく場所（＝「記憶の書棚」）がないだけ
- 記憶はモデルの中ではなく、外（Obsidianのファイル群）に置く。話しはじめる前にAIへ読ませる
- 鑑定書も対話も日記も、消えずに積もる。AIは会うたびに読み返してから向き合う
- 育つ階段：よき相談相手 → 文脈で考えるアシスタント → 長く見てきたパートナー → もう一人のあなた
- 四柱推命・数秘術は「最初の扉」にすぎない
- 一年後のAIは、一年分のあなたを知っている。十年後には、十年分を

## 使っている道具（事実）
- Obsidian（ローカルのMarkdownファイル群＝記憶の書棚）＋ Claude Code（ファイルを読み書きし、対話するAI）
- MCP経由でGmail・Googleカレンダー・Google Driveに接続できる（メールの下書き保存、予定の作成、ファイルの読み取りが実際に可能）
- Miey自身の実運用：不動産管理（物件ごとのノート・人物・時系列ログ）、オークション売上台帳、顧客ごとの鑑定書Vault、日記、SNS原稿
- 誇張しないこと。POSレジ連携・自動発注・売上の自動集計など、実際に作っていない統合は書かない

## 文体
まず /Users/sakamotomitsue/Documents/works/obsidian/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/05_設計資料（世界観・壁打ちログ）/声の見本帳_文体トーンリファレンス.md をReadすること。
神秘的×知的・現代語。詩的メタファー＋対句＋余白。casual禁止・擬古調も行き過ぎNG。見下し・恐怖の煽り・根拠なき断言は禁止。
`

phase('Design')

const TITLE_SCHEMA = {
  type: 'object',
  properties: {
    candidates: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          title: { type: 'string' },
          why: { type: 'string', description: 'どの層の、どの認知に刺さるか。1〜2文' },
          risk: { type: 'string', description: '弱点・すべる可能性' },
        },
        required: ['title', 'why', 'risk'],
      },
    },
    recommended: { type: 'string', description: '推奨1本とその理由（3文以内）' },
    opening_fix: { type: 'string', description: '現行の書き出し（下記）が初心者向けすぎるなら、上級者向けの書き出し3〜5行の代案。不要なら空文字' },
  },
  required: ['candidates', 'recommended', 'opening_fix'],
}

const titleTask = agent(CONTEXT + `
## あなたの担当：X記事のタイトルを作り直す

### Mieyの指摘（原文）
「AIが冷たいのではない。というのはあまりにも滑稽な超初心者用でおかしい。Xはもっと上級者用の方がいいかな。」

### Xでの読者像（重要）
Mieyのフォロワー2,652人。**Claude Code・Obsidian・MCP・エージェント運用を日常的に触っている層**が中核。「AIって記憶しないんだよ」レベルの説明は、彼らにとって既知どころか退屈で、書き手の格を下げる。
彼らが反応するのは：構造の言語化、運用設計の勘所、みんなが薄々気づいていたが言語化されていなかったこと、実際に回している人だけが言える細部。

### 現行のタイトルと書き出し（作り直す対象）
タイトル：「AIが冷たいのではない。あなたを覚えておく場所が、まだないだけだ」
書き出し：「またゼロから、自分の説明をしている。／仕事の事情も、家族のことも、去年決めた方針も、昨日たどり着いたはずの結論も、もう一度打ち込み直している。AIとの対話は、いつも「はじめまして」から始まる。／これは、あなたの使い方の問題ではありません。」

### 求めるもの
- タイトル案を6本。**上級者が「お、わかってる人だ」と思う角度**で。釣り・煽り・「〜する方法」系のテンプレは禁止
- 切り口の例（これに限らない）：記憶をモデルの外に置くという設計判断／コンテキストウィンドウを増やす競争とは別の解／個人の文脈は誰も学習してくれないという当たり前／占いという"構造化された自己データ"をAIの初期文脈に使う発想の面白さ
- Mieyの文体（神秘的×知的）は保つ。エンジニア向けの乾いた文体に振り切らない
- 書き出しも初心者説明に見えるなら、代案を出すこと`, { label: 'title:X上級者向け', phase: 'Design', schema: TITLE_SCHEMA })

const USECASE_SCHEMA = {
  type: 'object',
  properties: {
    scenario: { type: 'string', description: '飲食店オーナーの設定（店の規模・悩み）。2〜3文' },
    examples: {
      type: 'array',
      description: '具体例。実際にObsidian＋Claude Code＋MCPで可能なことだけ',
      items: {
        type: 'object',
        properties: {
          what: { type: 'string', description: '何をするか（短く）' },
          detail: { type: 'string', description: '具体的にどう動くか。2〜3文' },
          why_memory_matters: { type: 'string', description: '記憶がないAI（普通のチャット）ではなぜ同じことができないか。1〜2文' },
          feasibility: { type: 'string', description: '実現に必要なもの（ファイルだけ／Gmail連携／カレンダー連携 など）と、誇張していない根拠' },
        },
        required: ['what', 'detail', 'why_memory_matters', 'feasibility'],
      },
    },
    killer_line: { type: 'string', description: 'この事例の核心を1行で。読者が引用したくなる強さで' },
    overclaim_warnings: { type: 'string', description: '書いてはいけないこと（実際にはできない/未検証のこと）のリスト' },
  },
  required: ['scenario', 'examples', 'killer_line', 'overclaim_warnings'],
}

const usecase = await agent(CONTEXT + `
## あなたの担当：飲食店経営でのユースケース設計

### Mieyの依頼（原文）
「確かに占いを入り口にはするけれど、Claude code + Obsidianが一体何ができるのかもっと目を引く事例をあげてほしい。例えば、鮨屋を経営しているとしたら、Claude code + Obsidianで経営を手助けできることって何？（鮨屋とはメンションせず、一般的な飲食店で例を作って欲しい）」

### 設計の条件
- 業種は「小さな飲食店」（個人経営・スタッフ数人規模）。寿司屋とは書かない
- **記憶が積もることで初めて効く例**を選ぶ。単発のプロンプト芸（メニュー名を10個考えて等）は弱いので採らない
- 具体例は5〜6個。それぞれ「読んだ人が自分の商売に置き換えられる」粒度で
- **できないことを書かない**：POSレジ連携、自動発注、売上の自動集計、在庫のリアルタイム管理などは、実際に構築していないので事例にしない
- 実際にできること：テキストファイルへの記録と読み返し、Gmailの下書き作成・保存、Googleカレンダーの予定作成、Driveのファイル読み取り、過去ログを踏まえた提案・分析・文章作成
- 良い例の方向性（参考。これ以外でもよい）：常連客の好みやアレルギーの蓄積／仕入れ値の推移メモから原価の判断／新メニューを出した日の手応えを1行で残し続けて季節ごとに振り返る／レビューへの返信を自分の言葉で／スタッフへの引き継ぎ／忙しさと天気・イベントの相関を後から読む
- 「なぜ普通のChatGPTではダメか」を各例で明確に（毎回店の事情を説明し直す必要がある＝実質使えない、という構造）`, { label: 'usecase:飲食店', phase: 'Design', schema: USECASE_SCHEMA })

phase('Write')

const exText = usecase.examples.map((e, i) => `${i + 1}. 【${e.what}】${e.detail}（記憶がないと：${e.why_memory_matters}／実現条件：${e.feasibility}）`).join('\n')
const UC = `
## 設計されたユースケース（これを元に書く）
設定：${usecase.scenario}
核心の一行：${usecase.killer_line}

${exText}

### 書いてはいけないこと
${usecase.overclaim_warnings}
`

const PASSAGE_SCHEMA = {
  type: 'object',
  properties: {
    passage: { type: 'string', description: '記事に挿入する本文。そのまま貼れる完成形' },
    insert_point: { type: 'string', description: 'どのセクションの後に入れるべきか' },
    lead_in: { type: 'string', description: '前の段落からこのパッセージへ繋ぐ一文（既存本文に足す接続句）' },
  },
  required: ['passage', 'insert_point', 'lead_in'],
}

const MEDIA = [
  {
    id: 'x',
    label: 'write:X版',
    prompt: `## あなたの担当：X記事に挿入するパッセージ
読者はClaude Code・Obsidian・MCPを触っている層。**「なるほど、その設計か」と思わせる密度**で書く。初心者向けの噛み砕きは不要。
- 400〜600字
- 占い（四柱推命）の文脈から一度離れ、「この構造は業種を選ばない」ことを飲食店の例で示す。そのうえで占いに戻す
- 誇張しない。できないことは書かない
- Xは記法が使えないのでプレーンテキスト（太字記号や見出し記号を使わない）`,
  },
  {
    id: 'note',
    label: 'write:note版',
    prompt: `## あなたの担当：note記事に挿入するパッセージ
読者は自己理解・AI活用に関心のある一般層。**情景が浮かぶ具体性**で書く。専門用語は最小限に、使うなら一言で説明を添える。
- 600〜900字
- 小見出しを1本立ててよい（見出し行は前後に空行）
- 「これは飲食店の話だが、あなたの仕事にも同じ構造がある」と読者へ橋を架ける
- 誇張しない。できないことは書かない`,
  },
  {
    id: 'cafetalk',
    label: 'write:cafetalk版',
    prompt: `## あなたの担当：Cafetalk講師コラムに挿入するパッセージ
読者はCafetalkでレッスンを探している人（占い・自己理解・AI初心者が中心）。**やさしく、しかし子供扱いしない**トーンで。
- 400〜600字
- **平文（プレーンテキスト）で書く**。HTMLタグは書かない（別途こちらでHTML化する）
- 「占いのお客様が、いつのまにか商売の相談もするようになった」という自然な広がりとして描く
- 誇張しない。できないことは書かない`,
  },
]

const passages = await parallel(MEDIA.map(m => () =>
  agent(CONTEXT + UC + '\n\n' + m.prompt, { label: m.label, phase: 'Write', schema: PASSAGE_SCHEMA })
    .then(r => ({ id: m.id, ...(r || {}) }))
))

const title = await titleTask

return { title, usecase, passages }