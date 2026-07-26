export const meta = {
  name: 'stock-vs-flow-pivot',
  description: 'Fable5限定鑑定書販売 vs YouTube週1本化への舵切り vs Cafetalk縮小の戦略判断を3視点＋レッドチームで検討',
  phases: [
    { title: 'Perspectives', detail: '事業戦略・Miey運用現実・集客現実の3視点が独立に判断' },
    { title: 'RedTeam', detail: '3案を突き合わせ、1つの推奨と撤退条件に絞る' },
  ],
}

const CONTEXT = `
# 状況（2026-07-23）
Miey（日本の個人事業主・Cafetalk講師）が事業の方向で迷い、率直な意見を求めている。忖度なしで答えること。Mieyの本人の言葉：

「実は迷っています。そのような、ストック型でもないビジネスをしていいのかと。また切り売りのようなことを短期間とはいえやるのかと。どうせあまり引き合いもないかもだけど（引き合いはないならないで自信無くすけど）。もう一気にYouTube 毎週金曜日UP 週一回アップ（これが全ての広告になる）に舵を切ったほうがいいのではないかと。司令塔はcafetalkも残せ（スロットを解放する日を少なくすればいい）というけど、あればあるでcafetalkの方にも引っ張られるし、、（無視すればいいんだろうけど）」

# 迷いの対象1：Fable 5 限定・鑑定書販売（設計済み・未着手）
- 四柱推命＋数秘術の鑑定書PDF（レッスンなし・非同期納品）。希望者は申込時に相談内容を書き、回答を鑑定書に組み込む
- 4,900円・受付〜8/10・MOSH販売（手取り約4,482円/件・実効8.5%）
- 訴求：「Anthropic最上位AI Claude Fable 5 が使えるのは8/18まで。Fable 5鑑定は今だけ」（実在の締切）
- 動機の出所：Fable 5が期間限定で使えるのが「勿体無い」「みんなに知ってほしい」（＝戦略起点ではなく機会起点。Miey自身がそれに気づいて迷い始めた）
- 制作コストは低い：鑑定書生成スキル（kanteisho）・世界観PDFパイプライン・サンプル鑑定書は既に存在。1件あたりMiey実働60〜90分
- 販売見込み：現状の集客力（X 2,652フォロワー・note 約54フォロワー・Cafetalk既存生徒）依存。告知が弱ければ0〜数件もあり得る

# 迷いの対象2：YouTube週1本（毎週金曜UP）への全面的な舵切り
- 「これが全ての広告になる」という発想。ストック型・複利型の集客資産
- Mieyの既存戦略メモには「SNS脇役化・note主軸・1記事＋副産物のストック型発信戦略（数字は仮説扱い）」が存在。今回はその主軸をnote→YouTubeへ動かす話でもある
- Mieyの強み：話すこと・画面共有で教えること（Cafetalk 注目講師1位、IT部門で口コミ1位×リピート1位の2冠）。X記事形式が通常投稿の約3.2倍インプという実測もある（n=1）
- YouTube実績はゼロからのスタート。動画制作体制も未構築

# 迷いの対象3：Cafetalkの扱い
- 過去の司令塔の意見＝「残せ（スロット解放日を減らせばいい）」。Mieyの感覚＝「あればあるでそっちに引っ張られる」（注意資源が割かれる）
- Cafetalkの現実：価格上限10,000pt・実効手数料約31%・Miey自身が「安い価格帯の客しかいない、もう見込みがない」と評価。ただし2冠の信頼・既存生徒・レビューはここにある

# 事業の前提（Mieyの確定済み文脈）
- 目標：月5万→100万円。弱点は自認でマーケと商品開発
- 事業の地図＝バリューラダー：無料発信 → 情報商材 → サポート、の1本の段。占いは別事業ではなく同じ自己整理システムへの別入口。「Mieyが新方向に飛ぼうとしたらこの地図に戻す」が司令塔への恒久指示
- 商品ラダー（既存）：体験セッション「育つ魂の設計図」90分1万円（Cafetalk）／構築レッスン全4話・各1万円（Cafetalk）／Obsidian構築 直販モニター8万円・正規12〜15万円設計
- ベンチマーク＝「農家の嫁かすみ」（Obsidian×AIナレッジ領域の先行者。型：無料キット→Brain→Udemy→Kindle→コンサル。型は真似て中身で差別化、の方針）
- 商品判定フィルター：HARM＋Spiritual（Money/Ambition/Spiritual◎）
- 過去の一貫した判断：低単価の薄利多売は却下してきた（時間単価を守る）
- Mieyの特性（自認・未診断）：ADHD×HSP気味。注意が分散しやすい一方、マルチ運用と親和的。「あちこち引っ張られる」感覚は本人にとって実在の運用コスト。自信を失うイベント（引き合いゼロ等）の心理的ダメージも設計上考慮すべき変数
- 新運用チェック（Mieyのマスタールール§4.1）：新パターン提案時は「経済的・心理的圧力でルールを曲げていないか」「撤退条件はあるか」を機械的に確認する決まり

# 答えるべき問い
1. Fable 5限定鑑定書販売は、やるべきか・やめるべきか・形を変えてやるべきか（「切り売りでストック型でない」というMieyの観察の妥当性も評価）
2. YouTube毎週金曜UPへの舵切りは正しいか。「一気に」で正しいか。note主軸戦略との関係は
3. Cafetalkは残すか・凍結するか・閉じるか（経済合理性と注意資源の両面で）
4. 3つの時間軸をどう並べるか（今日〜8月中旬〜9月）
`

const VIEW = {
  type: 'object',
  additionalProperties: false,
  properties: {
    promo_stance: { type: 'string', description: 'Fable5限定鑑定書販売：やる/やめる/形を変える＋理由（3〜5文）' },
    youtube_stance: { type: 'string', description: 'YouTube週1舵切りへの賛否と設計意見（3〜5文）' },
    cafetalk_stance: { type: 'string', description: 'Cafetalkの扱い（2〜4文）' },
    sequencing: { type: 'string', description: '今日〜9月の時間軸の並べ方（具体的に）' },
    key_risks: { type: 'array', items: { type: 'string' }, maxItems: 4 },
    one_thing_to_drop: { type: 'string', description: 'この視点から見て「やらなくていいこと」を1つ断言' },
  },
  required: ['promo_stance', 'youtube_stance', 'cafetalk_stance', 'sequencing', 'key_risks', 'one_thing_to_drop'],
}

const PERSPECTIVES = [
  {
    key: 'strategy',
    role: '事業戦略の専門家（バリューラダー・ストック/フロー整合の番人）',
    brief: `バリューラダーとストック型戦略への整合だけで判断せよ。
- 「切り売りでストック型でない」というMieyの観察は正しいか。フロー商品が正当化される条件（需要テスト・事例収集・コンテンツ素材化）を満たすか
- 鑑定書販売とYouTubeは二者択一か、結合できるか（例：Fable 5鑑定の過程自体を初回コンテンツ化する）
- 「勿体無いから」という機会起点の意思決定を、戦略の言葉でどう扱うべきか（§4.1チェック4に相当）
- YouTube主軸化は既存のnote主軸メモと矛盾するか、進化か`,
  },
  {
    key: 'operations',
    role: 'Mieyの運用現実の専門家（ADHD×HSP・継続設計・心理コスト）',
    brief: `Mieyが実際に回し続けられるかだけで判断せよ。
- 週1 YouTube「一気に舵切り」の現実的な失敗モード（数本で息切れ等）と、それを防ぐ立ち上げ設計（撤退条件・成功指標を収益以外に置く等）
- 鑑定書販売とYouTube立ち上げの並走はMieyの注意資源で可能か。片方を落とすならどちらか
- 「引き合いがなければ自信を無くす」への設計的な守り（結果の解釈をあらかじめ固定する・ゼロでも資産が残る形にする等）
- Cafetalkに「引っ張られる」感覚への現実的な処方（凍結と閉鎖の違い、可逆性）`,
  },
  {
    key: 'marketing',
    role: '集客とチャネルの現実の専門家',
    brief: `数字と集客の現実だけで判断せよ。
- 現有の告知力（X 2,652・note 54・Cafetalk既存生徒）でMOSH新規ページに何件届くか、冷静な期待値
- YouTube週1が「全ての広告」に育つまでの現実の時間軸と、その間の収益の穴をどう埋めるか
- 話せる講師（2冠）という強みはYouTubeに移植可能か。テーマは占い入口かObsidian/AI入口か、どちらがラダーに効くか
- 8/18というFable 5期限の「本物の締切」をマーケ資産として使う最も費用対効果の高い形は何か（販売か、コンテンツか、両方か）`,
  },
]

phase('Perspectives')
const views = await parallel(
  PERSPECTIVES.map((p) => () =>
    agent(
      `${CONTEXT}\n\nあなたは${p.role}。\n${p.brief}\n\n日本語で構造化出力。Mieyには率直さが最大の礼儀。曖昧な両論併記は禁止、立場を明確に。`,
      { label: p.key, phase: 'Perspectives', schema: VIEW }
    )
  )
)

const FINAL = {
  type: 'object',
  additionalProperties: false,
  properties: {
    recommendation: { type: 'string', description: '最終推奨（3〜6文で核心のみ）' },
    promo_verdict: { type: 'string', description: '鑑定書販売の最終判断と、やる場合の位置づけの言い換え' },
    youtube_design: { type: 'string', description: 'YouTube立ち上げの具体設計：頻度・初期の成功指標（収益以外）・撤退/縮小条件' },
    cafetalk_verdict: { type: 'string', description: 'Cafetalkの結論（凍結/維持/閉鎖と、その可逆性）' },
    sequencing_plan: { type: 'string', description: '今日〜9月の一本の時間軸（週単位）' },
    confidence_protection: { type: 'string', description: '「引き合いゼロで自信を失う」リスクへの具体的な守りの設計' },
    what_not_to_do: { type: 'array', items: { type: 'string' }, maxItems: 3, description: 'やらないと決めるべきこと' },
    dissent: { type: 'string', description: '3視点で解消できなかった対立。なければ「なし」' },
  },
  required: ['recommendation', 'promo_verdict', 'youtube_design', 'cafetalk_verdict', 'sequencing_plan', 'confidence_protection', 'what_not_to_do', 'dissent'],
}

phase('RedTeam')
const valid = views.filter(Boolean)
const final = await agent(
  `${CONTEXT}\n\n3人の専門家の独立見解：\n${JSON.stringify(valid, null, 2)}\n\nあなたはレッドチーム兼最終意思決定者。各見解の甘い前提を攻撃し（特に「並走できる」楽観、「YouTubeがすぐ広告になる」楽観、「鑑定書販売の期待件数」楽観）、生き残った要素だけで1つの推奨に絞れ。Mieyのマスタールール§4.1に従い、撤退条件と成功指標（収益以外）を必ず含めよ。二兎を追う推奨をするなら、注意資源の裏付けを明示せよ。日本語で構造化出力。`,
  { label: 'red-team', phase: 'RedTeam', schema: FINAL, effort: 'high' }
)

return { views: valid, final }