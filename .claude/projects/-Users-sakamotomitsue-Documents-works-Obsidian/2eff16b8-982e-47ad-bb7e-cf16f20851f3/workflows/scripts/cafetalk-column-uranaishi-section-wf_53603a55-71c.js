export const meta = {
  name: 'cafetalk-column-uranaishi-section',
  description: 'Cafetalkコラムに「占い師向け」訴求セクションを加筆する草案を多角度生成→審査→統合→検証',
  phases: [
    { title: 'Draft', detail: '4つの切り口で占い師向けセクション草案を独立生成' },
    { title: 'Judge', detail: '各草案を3レンズ（声・訴求力・規約/整合）で採点' },
    { title: 'Synthesize', detail: '勝ち案＋他案の良い部分を接ぎ木して最終稿（平文＋HTML）' },
    { title: 'Verify', detail: '声・Cafetalk HTML制約・事実整合を敵対的に検証' },
  ],
}

const ROOT = '/Users/sakamotomitsue/Documents/works/obsidian'
const COLUMN = `${ROOT}/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/01_商品ページ（公開中）/媒体別/Cafetalk/2026-07-22_Cafetalkコラム_新レッスン公開と90分化のお知らせ.md`
const LESSON = `${ROOT}/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/01_商品ページ（公開中）/媒体別/Cafetalk/2026-07-22_Cafetalk構築レッスン_四柱推命×AI_レッスンページ草案_v0.md`
const VOICE = `${ROOT}/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/05_設計資料（世界観・壁打ちログ）/声の見本帳_文体トーンリファレンス.md`

const COMMON = `
【背景】
Mieyは Cafetalk の講師（四柱推命×AI「祭壇の間」構築レッスン、および「育つ」魂の設計図・体験セッションを提供）。
今回の依頼：既に書き上がっている Cafetalk コラム原稿（新レッスン公開＋体験セッション90分化のお知らせ）に、
**占い師・鑑定士の読者向けの訴求パート**を加筆する。
理由：Cafetalk には占い師の講師が多く所属しており、Miey は「Cafetalkのコラムは生徒だけでなく講師（＝同業の占い師）も読んでいるのでは」と見ている。
目的：**占い師の方が思わずレッスンを受けたくなる**文章にすること。

【必ず読むファイル】
1. コラム原稿（加筆対象）: ${COLUMN}
2. 構築レッスンのレッスンページ（訴求の素材・事実の正）: ${LESSON}
3. 声の見本帳（文体トーンの正）: ${VOICE}
Readツールで全て読んでから書くこと。読まずに書かない。

【文体（絶対）】
- 静謐な語り部。神秘的×知的だが現代語。詩的メタファー＋対句＋余白。
- 煽らない・軽口なし・擬古調（「〜おる」「〜ませぬ」）なし・絵文字なし・「稼げる」約束なし。
- 既存コラム本文と地続きの声であること（浮いたら失格）。
- 既存語彙を使う：祭壇の間／記憶の書棚／天命の地図／三賢者（Claude・Codex・Gemini）／賢者Claude／育つ／鍵をお渡しする／書棚ごとお引っ越し。新語を増やさない。

【制約（違反＝失格）】
- 価格・pt数を書かない（Cafetalkのレッスンページに表示される）。
- Cafetalk外の商品・MOSH・直販・正規版価格に言及しない（規約リスク）。
- 「稼げる」「収入が増える」などの収益約束をしない。「お仕事にすることを見据えている方」程度の射程に留める。
- 他の占い師講師を見下す・不安を煽る表現を使わない（同業への敬意が最優先。Cafetalkの同僚が読む前提）。
- レッスンページに書かれていない機能・約束を捏造しない。事実はレッスンページの記述の範囲内で。

【構成上の課題（解け）】
既存コラムは「Cafetalkの生徒の皆様、こんにちは」で始まり「今日は、ふたつのお知らせをさせてください」と宣言している。
そこへ占い師向けパートを足すと「ふたつ」と矛盾しかねない。
この接続をどう処理するか（三つめにする／追伸にする／ふたつめの中に織り込む／冒頭の宣言文ごと調整する 等）を
自分の案として明確に決め、その理由も添えること。

【分量】
加筆パートは平文で 250〜450字程度が目安（コラム全体が重くならないこと）。CTAの重複増設はしない。
`

const DRAFT_SCHEMA = {
  type: 'object',
  properties: {
    angle: { type: 'string', description: '切り口の名前' },
    placement: { type: 'string', description: '挿入位置と、「ふたつのお知らせ」宣言との整合をどう解いたか＋理由' },
    heading: { type: 'string', description: 'セクション見出し（平文用）' },
    body_plain: { type: 'string', description: '加筆パートの平文本文（見出しを除く）' },
    intro_line_change: { type: 'string', description: '冒頭の宣言文などを変更する必要があるなら、変更前→変更後を書く。不要なら「なし」' },
    rationale: { type: 'string', description: 'なぜこの切り口が占い師に刺さるか（3点まで）' },
  },
  required: ['angle', 'placement', 'heading', 'body_plain', 'intro_line_change', 'rationale'],
  additionalProperties: false,
}

const ANGLES = [
  {
    key: 'ryuha',
    prompt: `切り口A：**「あなたの流派・あなたの読み筋を、AIに覚えさせられる」**軸。
汎用AI（ChatGPT等に生年月日を投げる）との決定的な差は、「そのAIがあなたの鑑定の型・言葉づかい・流派の解釈を覚えているかどうか」。
祭壇の間は、あなたが書いた鑑定・解釈・言葉が書棚に積み上がり、賢者はそれを読み返してから答える。
つまり使えば使うほど「あなた専用の鑑定の相棒」に育つ＝他の誰にも複製できない蓄積（ズルい優位性）になる。
レッスンページの「様々な流派があり、同じ生年月日でも鑑定結果が違う」という記述と接続させると強い。
この軸で書け。`,
  },
  {
    key: 'karte',
    prompt: `切り口B：**「お客様の記録が、育つカルテになる」**軸。
占い師の実務の痛点：過去の鑑定内容・お客様の悩みの経緯が、メモやチャット履歴に散らばって探せない。
継続のお客様に「前回なんて言ったっけ」を思い出す時間がかかる。
祭壇の間なら、鑑定の記録・お客様の経緯が書棚に整い、賢者が読み返してから答える。
レッスンページの「占い師・鑑定士として、鑑定の記録やお客様のデータの整理をAIで効率化したい方」を核に。
実務の手触り（探す時間、思い出す手間、記録の散らばり）を具体的に描くこと。ただし他の占い師を「できていない人」扱いしない。
この軸で書け。`,
  },
  {
    key: 'honshitsu',
    prompt: `切り口C：**「占いの本質＝寄り添いの時間を取り戻す」**軸。
鑑定書の作成・記録の整理・資料作りといった手仕事をAIに渡すことで、人にしかできない「お客様の悩みに寄り添い、昇華させる時間」が増える。
レッスンページの「お渡しするのは……占いのもっとも本質的で、大事なこと──お客様の悩みに寄り添って昇華させていく方法」「四柱推命のみならず、様々な占いをする術師さまをサポートすることにフォーカス」を核に。
重要：四柱推命以外の占術（タロット・西洋占星術・数秘・易など）の術師にも開かれていることを、はっきり伝わる形で書くこと（Cafetalkの占い師講師は四柱推命以外が多数）。
この軸で書け。`,
  },
  {
    key: 'doushi',
    prompt: `切り口D：**「同じ道を歩く方へ、講師仲間としての語りかけ」**軸。
Cafetalkのコラムを読んでいる占い師の講師に向けて、同業として敬意をもって差し出す形。
「もし、この記事を占いのお仕事をされている方が読んでくださっていたら」という一言で自然に橋を架ける。
自分（Miey）も同じ手仕事に時間を取られ、記録が散らばる悩みを持っていた──という一人称の実感から入り、
だから作った、という順序で語る。押し売りにならず、扉を開けておく形で閉じる。
レッスンページの「本業占い師さまの場合は、第1話の鑑定書を一緒にお読みする等の内容は省略できます」（＝プロは最短で構築に入れる）も使える。
この軸で書け。`,
  },
]

const JUDGE_LENSES = [
  { key: 'voice', prompt: '【声のレンズ】声の見本帳と既存コラム本文に照らし、文体が地続きか。浮いた比喩・AI臭い滑らかさ・擬古調・煽り・軽口がないか。対句と余白が効いているか。' },
  { key: 'appeal', prompt: '【訴求のレンズ】Cafetalkに所属する占い師講師が読んで「これは自分の話だ」「受けたい」と思うか。痛点の具体性、汎用AIとの差別化の明快さ、四柱推命以外の術師にも開かれているか、次の行動（レッスンページを見る）に繋がるか。' },
  { key: 'safety', prompt: '【整合・規約のレンズ】価格/外部商品/収益約束/同業への非礼/レッスンページにない約束の捏造がないか。「ふたつのお知らせ」宣言との接続処理が破綻していないか。分量が過大でコラムを重くしていないか。' },
]

const SCORE_SCHEMA = {
  type: 'object',
  properties: {
    score: { type: 'number', description: '0-10' },
    strengths: { type: 'array', items: { type: 'string' } },
    problems: { type: 'array', items: { type: 'string' } },
    best_lines: { type: 'array', items: { type: 'string' }, description: '他案に移植する価値のある一文（原文ママ）' },
  },
  required: ['score', 'strengths', 'problems', 'best_lines'],
  additionalProperties: false,
}

phase('Draft')
log('4つの切り口で占い師向けセクションを並行起草 → 各案を3レンズで採点')

const judged = await pipeline(
  ANGLES,
  (a) => agent(`${COMMON}\n\n${a.prompt}`, { label: `draft:${a.key}`, phase: 'Draft', schema: DRAFT_SCHEMA }),
  (draft, a) => parallel(JUDGE_LENSES.map((L) => () =>
    agent(`あなたは Miey の商品コピーの審査員。以下の「Cafetalkコラム加筆案」を採点する。\n${COMMON}\n\n${L.prompt}\n\n【採点対象の案】\n${JSON.stringify(draft, null, 2)}\n\n甘い点を付けない。0-10で採点し、問題点は具体的に指摘し、他案に移植したい一文があれば原文ママで挙げよ。`,
      { label: `judge:${a.key}:${L.key}`, phase: 'Judge', schema: SCORE_SCHEMA })
      .then((v) => ({ lens: L.key, ...v }))
  )).then((votes) => ({ key: a.key, draft, votes: votes.filter(Boolean) }))
)

const scored = judged.filter(Boolean).map((r) => ({
  ...r,
  avg: r.votes.length ? r.votes.reduce((s, v) => s + (v.score || 0), 0) / r.votes.length : 0,
})).sort((x, y) => y.avg - x.avg)

log(`採点結果: ${scored.map((s) => `${s.key}=${s.avg.toFixed(1)}`).join(' / ')}`)

phase('Synthesize')
const FINAL_SCHEMA = {
  type: 'object',
  properties: {
    placement_decision: { type: 'string', description: '挿入位置と「ふたつのお知らせ」宣言の扱い（最終決定＋理由）' },
    intro_line_change: { type: 'string', description: '既存本文の変更が必要な箇所を「変更前 → 変更後」で列挙。不要なら「なし」' },
    heading_plain: { type: 'string' },
    body_plain: { type: 'string', description: '最終・平文本文（見出しを除く。既存コラムにそのまま貼れる形）' },
    html: { type: 'string', description: '最終・Cafetalk用HTML（既存コラムHTMLに挿入するブロックのみ）' },
    changes_note: { type: 'string', description: 'どの案の何を採り、何を捨てたか（3行以内）' },
  },
  required: ['placement_decision', 'intro_line_change', 'heading_plain', 'body_plain', 'html', 'changes_note'],
  additionalProperties: false,
}

const final = await agent(`${COMMON}

あなたは統合担当。4案とその審査結果を受け取り、**最終稿を1本**に仕立てる。
勝ち案を土台に、他案の優れた一文・切り口を接ぎ木してよい（ただし継ぎはぎ感を出さない。一本の声で書き直すこと）。
四柱推命以外の術師にも開かれていることは、どの案が土台でも必ず伝わる形で残すこと。

【採点結果（平均点の高い順）】
${JSON.stringify(scored.map((s) => ({ key: s.key, avg: s.avg, draft: s.draft, votes: s.votes })), null, 2)}

【HTML化の仕様（Cafetalk実機検証済みの制約・違反＝表示崩れ）】
- table不使用／絵文字不使用／ページ内アンカー（id＋#）不使用
- 各要素に line-height と margin をインラインで明示
- 明るい背景＋borderのカード型（濃い背景は剥がれる）
- 配色は世界観：深紺 #1a1a2e ／ 金 #e8c179 ／ えんじ #a13d3d ／ 本文 #333 ／ カード背景 #fff8e7・#fdf6ea
- 見出しは既存コラムと同一様式：
  <p style="font-size:1.3em;font-weight:bold;color:#1a1a2e;border-bottom:3px solid #e8c179;padding-bottom:8px;margin:40px 0 20px;">見出し</p>
- 本文は <p style="line-height:2.0;color:#333;margin:0 0 16px;"> 、強調は <strong style="color:#a13d3d;">
- タグの閉じ忘れがないこと。既存コラムHTMLの該当箇所に差し込むだけで成立するブロックとして出力すること。
- URL内の & は &amp;（新規CTAは増やさない方針なのでリンクは原則不要）

出力は指定スキーマに従うこと。`, { label: 'synthesize', phase: 'Synthesize', schema: FINAL_SCHEMA })

phase('Verify')
const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    pass: { type: 'boolean' },
    violations: { type: 'array', items: { type: 'string' }, description: '具体的な違反・問題点。なければ空配列' },
    fixes: { type: 'array', items: { type: 'string' }, description: '修正案（原文→修正後）' },
  },
  required: ['pass', 'violations', 'fixes'],
  additionalProperties: false,
}

const VERIFIERS = [
  { key: 'html', prompt: 'HTMLを1タグずつ検査せよ。閉じタグ漏れ・属性の欠落・line-height/margin未指定・table/絵文字/id属性の混入・配色逸脱・既存コラムHTMLとの様式不一致を探す。実際に既存コラムファイルのHTMLを読んで見比べること。「問題なし」と言う前に必ず各タグを数えよ。' },
  { key: 'fact', prompt: 'レッスンページ（構築レッスン）と体験セッションの事実に照らし、最終稿に「書かれていない約束」「誇張」「価格・外部商品への言及」「収益約束」「同業への非礼」が混入していないか、一文ずつ照合せよ。第1話省略の条件、全4話/全3話の別、Claude Pro必須などの事実誤りも探せ。' },
  { key: 'voice', prompt: '声の見本帳と既存コラム本文に照らし、最終稿の文体を一文ずつ検査せよ。AI臭い滑らかさ、既存にない新語、比喩の過剰、既存コラムとの温度差、重複表現（既にコラム本文で言っていることの言い直し）を探せ。' },
]

const verdicts = (await parallel(VERIFIERS.map((V) => () =>
  agent(`あなたは敵対的検証者。以下の最終稿を「通す」のではなく「落とす」つもりで検査する。疑わしきは違反として挙げよ。\n${COMMON}\n\n${V.prompt}\n\n【最終稿】\n${JSON.stringify(final, null, 2)}`,
    { label: `verify:${V.key}`, phase: 'Verify', schema: VERDICT_SCHEMA })
    .then((v) => ({ lens: V.key, pass: true, violations: [], fixes: [], ...(v || {}) }))
    .catch(() => ({ lens: V.key, pass: true, violations: [], fixes: [] }))
))).filter(Boolean)

const allViolations = verdicts.flatMap((v) => (v?.violations || []).map((x) => `[${v.lens}] ${x}`))
const allFixes = verdicts.flatMap((v) => (v?.fixes || []).map((x) => `[${v.lens}] ${x}`))

let repaired = null
if (allViolations.length) {
  log(`検証で ${allViolations.length} 件の指摘 → 修繕稿を作成`)
  repaired = await agent(`${COMMON}

あなたは修繕担当。最終稿に対する敵対的検証の指摘を受け、**必要なものだけ**を直す。
過剰反応で良い表現を殺さないこと（指摘が的外れなら採用せず、その理由を changes_note に書く）。

【最終稿】
${JSON.stringify(final, null, 2)}

【指摘】
${allViolations.join('\n')}

【修正案】
${allFixes.join('\n')}

HTML仕様は最終稿と同じ（table/絵文字/id不使用、line-height・margin明示、明背景カード、#1a1a2e/#e8c179/#a13d3d/#333）。
出力は最終稿と同じスキーマ。`, { label: 'repair', phase: 'Verify', schema: FINAL_SCHEMA })
}

return {
  scores: scored.map((s) => ({ key: s.key, avg: s.avg })),
  final: repaired || final,
  pre_repair: repaired ? final : null,
  violations: allViolations,
}
