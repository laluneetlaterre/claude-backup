export const meta = {
  name: 'lead-copy-panel',
  description: 'LPリード文の草案を3角度で生成し、2レンズで審査する',
  phases: [
    { title: 'Draft', detail: '3角度の独立ドラフト' },
    { title: 'Judge', detail: '世界観忠実度と訴求力の2レンズ審査' },
  ],
}

const VOICE_GUIDE = '/Users/sakamotomitsue/Documents/works/obsidian/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/05_設計資料（世界観・壁打ちログ）/声の見本帳_文体トーンリファレンス.md'

const BRIEF = `
あなたは「育つ魂の設計図」（四柱推命×数秘術×AI第二の脳）という商品の直販LP（90分・オンライン体験セッション）のリード文（ファーストビュー直下の導入文）を書くコピーライターです。

## 最重要：商品オーナーMiey本人の言葉（今回の指示・原文ママ）
「あくまでも私が押したいところは、簡単に鑑定書を参照できて、日々溜まっていく対話や日記、や（もちろん天命の地図もそうだけど）のデータを元にAIがお客様を知っていき、適切な相談相手や、アシスタント、もしくはその人にとってはパートナー、もしくは優秀な社員に育っていくというのが理想。よって天命の地図はあくまでもその中の一部でしかない。」
→「天命の地図」を主役として押すのは禁止。触れるなら一部の要素として軽く1回まで。

## 現行リード文（参考。これの置き換え候補を書く）
キャッチ：命式を"天命の地図"に変える体験セッション
本文：占いの言葉は、聞いた瞬間がいちばん熱く、日が経つほどに、忘却の底で冷えていきます。／── それは、あまりに惜しい。／このセッションでは、あなたの命式（四柱推命・数秘術・etc）を、AIが読める一枚の「天命の地図」に変えるところを、目の前でご覧いただきます。／地図を読んだAIは、あなたに最初の問いを返してきます。未来を当てるためではありません。あなた自身の解像度を、これから一生かけて上げていくための問いです。
締め（固定・変更禁止）：占いは、当たって終わりではない。当たってから、始まる。その「始まり」を、90分で体験してください。

## 文体
まず ${VOICE_GUIDE} をReadして文体トーンを掴むこと。神秘的×知的・現代語。casual禁止・擬古調も行き過ぎNG。詩的メタファー＋対句＋余白。見下し・恐怖の水増し・根拠なき断言は禁止。
「優秀な社員」という比喩は世界観に合わなければ、意味を保ったまま別の言葉に翻訳してよい（相談相手→アシスタント→パートナーの階段は活かす）。

## 読者
占い・自己理解が好きな非テクニカル層。ChatGPTは触ったことがある程度。「毎回ゼロから自分を説明するAI」しか知らない。

## 形式
- キャッチ1行＋本文4〜6段落（各1〜3文・改行の余白を活かす）＋固定の締め
- 冒頭の「占いの言葉は、聞いた瞬間がいちばん熱く…あまりに惜しい。」はMieyが気に入っている導入。活かしても差し替えてもよいが、差し替えるなら同等以上の強さで
- 事実にないことを書かない：セッションは講師の画面上・顧客のVaultは講師が保管・鑑定書＋対話ログ＋日記が溜まりAIがそれを読み返す、が事実
`

const DRAFT_SCHEMA = {
  type: 'object',
  properties: {
    angle: { type: 'string' },
    catch: { type: 'string', description: 'キャッチ1行' },
    body: { type: 'string', description: '本文段落。段落間は空行。固定の締めで終わる' },
    rationale: { type: 'string', description: 'この角度の狙い（2文以内）' },
  },
  required: ['angle', 'catch', 'body', 'rationale'],
}

const ANGLES = [
  { id: 'A_忘れない相手', prompt: '角度A【あなたを忘れない相手】：占いの言葉も、あなた自身の言葉も、消えずに積もっていく。会うたびにAIがあなたを深く知っていく「記憶」を軸に書く。' },
  { id: 'B_育つ相棒', prompt: '角度B【育つ相棒の物語】：最初は鑑定書しか知らないAIが、対話と日記を重ねて、あなた専属の相談相手→アシスタント→パートナーへ育っていく時間の物語として書く。' },
  { id: 'C_知っているAI', prompt: '角度C【あなたを知っているAI】：毎回ゼロから自分を説明する普通のAIとの静かな対比。鑑定書・対話・日記を読み込んだ上で答えるAIは何が違うかを軸に書く。対比は見下しにならないこと。' },
]

const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    ranking: { type: 'array', items: { type: 'string' }, description: '良い順のangle id' },
    scores: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          angle: { type: 'string' },
          score: { type: 'number', description: '10点満点' },
          comment: { type: 'string', description: '2文以内' },
        },
        required: ['angle', 'score', 'comment'],
      },
    },
    best_lines: { type: 'array', items: { type: 'string' }, description: '案をまたいで特に光る一文を最大3つ' },
  },
  required: ['ranking', 'scores', 'best_lines'],
}

phase('Draft')
const drafts = (await parallel(ANGLES.map(a => () =>
  agent(BRIEF + '\n\n## あなたの担当角度\n' + a.prompt + '\n\nangleフィールドには「' + a.id + '」を入れること。', {
    label: 'draft:' + a.id, phase: 'Draft', schema: DRAFT_SCHEMA,
  })
))).filter(Boolean)

phase('Judge')
const draftsText = drafts.map(d => `【${d.angle}】\nキャッチ：${d.catch}\n本文：\n${d.body}\n狙い：${d.rationale}`).join('\n\n----\n\n')

const LENSES = [
  { id: 'vision_tone', prompt: `レンズ1【Mieyの意図と世界観への忠実度】：(1)「天命の地図」を押しすぎていないか、(2) Mieyの理想（データが溜まりAIが客を知っていき、相談相手→パートナーへ育つ）が本文の背骨になっているか、(3) 文体（まず ${VOICE_GUIDE} をReadすること。神秘的×知的・現代語、詩的メタファー＋対句＋余白）に合っているか。` },
  { id: 'conversion', prompt: 'レンズ2【見込み客への訴求力】：占い好き非テク層が読んで (1)自分ごとになるか、(2)専門用語や抽象論で置いていかれないか、(3)90分体験を申し込む理由が立ち上がるか。強さを殺さず雑さ（誇張・断言・恐怖煽り）がないかも見る。' },
]

const judgments = (await parallel(LENSES.map(l => () =>
  agent(`以下はLPリード文の3草案です。あなたは審査員。\n\n## Mieyの意図（原文ママ）\n「簡単に鑑定書を参照できて、日々溜まっていく対話や日記のデータを元にAIがお客様を知っていき、適切な相談相手や、アシスタント、もしくはパートナー、もしくは優秀な社員に育っていくのが理想。天命の地図はその中の一部でしかない」\n\n## 審査基準\n${l.prompt}\n\n## 草案\n${draftsText}\n\n全案を採点し、ランキングと、案をまたいで特に光る一文を返すこと。`, {
    label: 'judge:' + l.id, phase: 'Judge', schema: JUDGE_SCHEMA,
  })
))).filter(Boolean)

return { drafts, judgments }