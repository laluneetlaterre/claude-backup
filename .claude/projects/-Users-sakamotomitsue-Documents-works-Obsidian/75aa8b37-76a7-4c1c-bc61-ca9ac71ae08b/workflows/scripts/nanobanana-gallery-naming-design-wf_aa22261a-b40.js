export const meta = {
  name: 'nanobanana-gallery-naming-design',
  description: 'Nano Bananaプロンプト事例サイトの名前・ポジショニング・デザイン方向を多角的に生成し、審査して統合する',
  phases: [
    { title: 'Generate', detail: '命名4角度 + デザイン4方向を並列生成' },
    { title: 'Judge', detail: '3つの独立した審査観点で採点' },
    { title: 'Synthesize', detail: '勝者を核に統合し最終提案を作る' },
  ],
}

const CONTEXT = `
# 依頼主（Miey）のプロフィールと事業文脈

- 日本人女性の個人事業主。Obsidian × Claude Code を使った「AI第二の脳／AI記憶の書斎」というブランドで情報発信・教材販売をしている。
- ブランドの約束：「仕事と暮らしの面倒を仕組みに変える」。キーフレーズは「unfair advantage / ズルい優位性 / 蓄積した知性」。単なる便利・時短訴求はNG。
- 主ターゲット：「散らかるから仕組みが要る人」「副業をやっている人」。判定の一問は「いまのやり方、もう回っていますか？」
- 事業の地図＝バリューラダー：無料発信 → 情報商材 → サポート。この新サイトは「無料発信」の入口として機能させたい。
- 稼げる5つの柱＝HARM+Spiritual のうち Money / Ambition / Spiritual が◎。
- 別事業として四柱推命×数秘術×AIの「育つ魂の設計図」もある（神秘的×知的な世界観）。
- X: @diaita1（フォロワー約2,650）、note: miey_casa。
- 公開プロフィール上は日本語がメイン。英語圏への展開は将来の選択肢。

# 作りたいもの

Google の画像生成モデル「Nano Banana」（Gemini 2.5 Flash Image / Nano Banana Pro）の
**プロンプト事例集サイト**。参考にしているのは GitHub の
"Awesome-Nano-Banana-images"（110事例・CC BY 4.0・入力画像/出力画像/プロンプト本文を並べる形式）。

動機は2つ：
1. 「参考サイトが消えたらプロンプトが永遠に失われる」という危機感 → 自分の手元に保全したい（アーカイブ動機）
2. 自分でオリジナルのプロンプトと画像を作って積み上げていきたい（資産形成動機）

**重要な制約**：他人のプロンプトの転載はしない。掲載するのは
**すべて Miey 自身が作り・実際に生成に成功したオリジナルのプロンプトと画像**のみ。
現時点の第1号事例は「浮世絵スタイルの星座フラッシュカード」
（Midjourney製の天秤座の女神画像を入力 → Nano Banana で浮世絵木版画の
コレクションカード化。短冊に「天秤座」の題字、落款、下部に LIBRA の欧文）。
今後、事例を1つずつ増やしていく方針。数は少なく始まる（最初は1〜数件）。

技術構成の前提：Astro で静的サイト化し、GitHubを正本にして Cloudflare Pages で無料公開する。
`

const NAMING_ANGLES = [
  {
    key: 'archive',
    angle: `「保全・アーカイブ」の角度。
「失われるものを残す」「消えない記録」「標本」「図鑑」「書庫」「アーカイブ」といった
永続性のメタファーを核にする。Mieyの既存ブランド「AI記憶の書斎」との血縁を感じさせてよい。`,
  },
  {
    key: 'craft',
    angle: `「工房・レシピ・調合」の角度。
プロンプトを「レシピ」「処方」「調合」「型」「配合」として捉え、
作り手の技術・手仕事の匂いがする名前にする。Nano Banana という食べ物由来の
モデル名との相性（キッチン・厨房・実験室）も使ってよい。`,
  },
  {
    key: 'asset',
    angle: `「資産・優位性」の角度。
Mieyのブランドキーフレーズ「蓄積した知性」「ズルい優位性 (unfair advantage)」に
真正面から接続する。「使った分だけ増える」「積み上がる」「効いてくる」という
複利のニュアンスを名前に込める。事業的に商品導線として一番強い名前を狙う。`,
  },
  {
    key: 'playful',
    angle: `「遊び心・記憶に残る」の角度。
覚えやすさ・口に出したときの気持ちよさ・URL としての短さを最優先にする。
Nano Banana というモデル名自体がふざけているので、それに乗った軽さを許容する。
ただし子供っぽくなりすぎない（Mieyは「キャラ表現の連発」を嫌う）。`,
  },
]

const DESIGN_DIRECTIONS = [
  {
    key: 'museum',
    brief: `「静かな博物館 / アーカイブ室」方向。
余白を大きく取り、作品を標本のように扱う。無彩色に近いベースと1色のアクセント。
セリフ体（明朝）の見出し。カード型ではなくギャラリーの壁のような配置。
Dieter Rams / MoMA / 国立博物館の図録のような品格。`,
  },
  {
    key: 'terminal',
    brief: `「開発者のノート / ターミナル」方向。
モノスペース書体、暗い背景、プロンプトを本物のコードブロックとして最重要視する。
GitHub / Vercel / Linear のようなクリーンなダークUI。
プロンプトをコピーする行為が最速でできることを設計の中心に置く。`,
  },
  {
    key: 'zine',
    brief: `「作品集 / アートブック」方向。
画像を主役に据え、Before→After の対比を演出として最大化する。
大胆なタイポグラフィ、非対称のグリッド、スクロールで見せる。
プロンプトは折りたたんで、まず絵で殴る。`,
  },
  {
    key: 'washi',
    brief: `「和 / 素材感」方向。
Mieyの第1号事例が浮世絵であること、また別事業の「育つ魂の設計図」が
神秘的×知的な世界観であることを踏まえ、和紙・墨・落款・縦組みの要素を
現代的にリファインして使う。ただし「和風テンプレ」の安っぽさは徹底的に避ける。`,
  },
]

phase('Generate')

const naming = await parallel(NAMING_ANGLES.map(a => () =>
  agent(`${CONTEXT}

# あなたの仕事

このサイトの**名前とポジショニング**を、以下の角度に振り切って提案してください。

## 割り当てられた角度：${a.key}
${a.angle}

## 出力してほしいもの
サイト名の候補を**5案**。各案について：
- name_ja: 日本語のサイト名（表示名）
- name_en: 欧文表記／ロゴに使う短い英字（URLのサブドメインにも使える形）
- slug: 推奨するリポジトリ名兼URLスラッグ（英小文字とハイフンのみ）
- tagline: サイトの一行の約束（日本語・20〜35字）。これがトップに載る。
- why: なぜこの名前がMieyの事業にとって強いのか（2〜3文）。ターゲット「散らかるから仕組みが要る人」との接続を必ず述べる
- risk: この名前の弱点・リスクを正直に1文

## 注意
- 実在の商標・既存サービス名と衝突しそうなものは避ける（不明なら risk に書く）
- Nano Banana はGoogleのモデルの通称。サイト名にそのまま入れるかどうかは角度次第で判断してよいが、
  「Google公式だと誤認させる名前」は絶対に避ける
- 日本語の語感を大事にする。カタカナ語の羅列は弱い
- 説明的すぎる名前（「ナノバナナプロンプト集」等）は1案までにとどめ、残りは記憶に残る名前にする`,
    { label: `naming:${a.key}`, phase: 'Generate', schema: {
      type: 'object',
      properties: {
        angle: { type: 'string' },
        candidates: {
          type: 'array', minItems: 5, maxItems: 5,
          items: {
            type: 'object',
            properties: {
              name_ja: { type: 'string' },
              name_en: { type: 'string' },
              slug: { type: 'string' },
              tagline: { type: 'string' },
              why: { type: 'string' },
              risk: { type: 'string' },
            },
            required: ['name_ja', 'name_en', 'slug', 'tagline', 'why', 'risk'],
          },
        },
      },
      required: ['angle', 'candidates'],
    }})
))

const designs = await parallel(DESIGN_DIRECTIONS.map(d => () =>
  agent(`${CONTEXT}

# あなたの仕事

このサイトの**ビジュアルデザイン方向**を、以下の方向に振り切って設計してください。

## 割り当てられた方向：${d.key}
${d.brief}

## 出力してほしいもの
- concept: この方向のコンセプトを2〜3文で（日本語）
- palette: 配色を4〜6色。各色 { role, hex, note }。ライトモード基準。ダークモード対応の考え方も note に含める
- typography: { display, body, mono, note } — 実際に無料で使えるフォント名を挙げる（Google Fonts / システムフォント）。日本語フォントも必ず指定する
- layout: トップページと事例ページのレイアウトを、セクション順で具体的に（日本語・箇条書き相当の文章）
- case_card: 1事例をどう見せるか。入力画像・出力画像・プロンプト本文・コピーボタン・メタ情報（モデル名／作成日／タグ）の扱いを具体的に
- signature_move: この方向にしかない「印象に残る一手」を1つ（アニメーション・仕掛け・レイアウトの妙など）。実装が現実的なものに限る
- growth: 事例が1件しかない状態でも寂しく見えず、110件になっても破綻しない工夫
- risk: この方向の弱点を正直に1文

## 注意
- 静的サイト（Astro）で実装可能な範囲に限る。重いJSライブラリ前提の案は不可
- スマートフォン表示を必ず考慮する
- 日本語の本文が美しく組めることを重視する（欧文前提の設計にしない）`,
    { label: `design:${d.key}`, phase: 'Generate', schema: {
      type: 'object',
      properties: {
        direction: { type: 'string' },
        concept: { type: 'string' },
        palette: { type: 'array', items: { type: 'object', properties: { role: {type:'string'}, hex: {type:'string'}, note: {type:'string'} }, required: ['role','hex','note'] } },
        typography: { type: 'object', properties: { display: {type:'string'}, body: {type:'string'}, mono: {type:'string'}, note: {type:'string'} }, required: ['display','body','mono','note'] },
        layout: { type: 'string' },
        case_card: { type: 'string' },
        signature_move: { type: 'string' },
        growth: { type: 'string' },
        risk: { type: 'string' },
      },
      required: ['direction','concept','palette','typography','layout','case_card','signature_move','growth','risk'],
    }})
))

const namingOk = naming.filter(Boolean)
const designOk = designs.filter(Boolean)
log(`命名 ${namingOk.reduce((n,r)=>n+r.candidates.length,0)}案 / デザイン ${designOk.length}方向 を生成`)

phase('Judge')

const JUDGE_LENSES = [
  {
    key: 'business',
    lens: `**事業判断のレンズ**。この名前・デザインは Miey のバリューラダー
（無料発信→情報商材→サポート）の入口として機能するか。
「蓄積した知性 / ズルい優位性」のブランド約束と整合するか。
訪問者が「この人から学びたい」と思うか。ただの便利ツール集に見えたら減点。`,
  },
  {
    key: 'discovery',
    lens: `**発見されやすさのレンズ**。検索・SNSシェア・口コミで見つかるか。
名前が口に出しやすく、URLが打ちやすく、記憶に残るか。
「Nano Banana プロンプト」で探している人にたどり着けるか
（＝名前が抽象的すぎて何のサイトか分からないのは減点）。
同時に、他人のリポジトリの二番煎じに見えるものも減点。`,
  },
  {
    key: 'longevity',
    lens: `**持続性のレンズ**。Miey が1人で、事例を1つずつ、
長期にわたって更新し続けられるか。事例1件でも成立し、100件でも破綻しないか。
モデル名「Nano Banana」に依存しすぎた名前は、モデルが改名・陳腐化したときに死ぬ。
そのリスクを厳しく見る。デザインは実装・維持の重さも見る。`,
  },
]

const allNames = namingOk.flatMap(r => r.candidates.map(c => ({ ...c, angle: r.angle })))

const judged = await parallel(JUDGE_LENSES.map(j => () =>
  agent(`${CONTEXT}

# あなたの仕事

以下の候補を、割り当てられたレンズで**厳しく**採点してください。忖度は不要です。

## あなたのレンズ：${j.key}
${j.lens}

## サイト名の候補（${allNames.length}案）
${JSON.stringify(allNames, null, 1)}

## デザイン方向の候補（${designOk.length}方向）
${JSON.stringify(designOk.map(d => ({ direction: d.direction, concept: d.concept, signature_move: d.signature_move, growth: d.growth, risk: d.risk })), null, 1)}

## 出力
- name_ranking: 上位5案を順位順に。各 { name_ja, score(0-100), reason(1〜2文), fatal_flaw(致命的欠陥があれば・なければ空文字) }
- design_ranking: 全方向を順位順に。各 { direction, score(0-100), reason(1〜2文) }
- verdict: このレンズから見た総評を2〜3文（日本語）
- best_ideas_from_losers: 落選案の中に「これだけは拾うべき」というアイデアがあれば列挙（文字列配列・最大3件）`,
    { label: `judge:${j.key}`, phase: 'Judge', schema: {
      type: 'object',
      properties: {
        lens: { type: 'string' },
        name_ranking: { type: 'array', items: { type: 'object', properties: { name_ja:{type:'string'}, score:{type:'number'}, reason:{type:'string'}, fatal_flaw:{type:'string'} }, required:['name_ja','score','reason','fatal_flaw'] } },
        design_ranking: { type: 'array', items: { type: 'object', properties: { direction:{type:'string'}, score:{type:'number'}, reason:{type:'string'} }, required:['direction','score','reason'] } },
        verdict: { type: 'string' },
        best_ideas_from_losers: { type: 'array', items: { type: 'string' } },
      },
      required: ['lens','name_ranking','design_ranking','verdict','best_ideas_from_losers'],
    }})
))

const judgedOk = judged.filter(Boolean)

phase('Synthesize')

const final = await agent(`${CONTEXT}

# あなたの仕事

3人の審査員の評価をもとに、**最終提案**を1本にまとめてください。
勝者をそのまま採用するのではなく、落選案の良いアイデアを移植して強くしてよい（グラフト可）。

## 全命名候補
${JSON.stringify(allNames, null, 1)}

## 全デザイン方向（詳細）
${JSON.stringify(designOk, null, 1)}

## 審査結果
${JSON.stringify(judgedOk, null, 1)}

## 出力（すべて日本語で。Mieyがそのまま読んで判断できる粒度で）
- recommended_name: { name_ja, name_en, slug, tagline, rationale } — 本命1案。rationale は3〜4文で、3人の審査員の指摘をどう踏まえたかに触れる
- alternative_names: 対抗2案。各 { name_ja, tagline, when_to_pick(どういう場合にこちらを選ぶべきか1文) }
- recommended_design: {
    direction_name, concept,
    palette: [{ role, hex, note }],
    typography: { display, body, mono, note },
    page_structure: トップページの構成をセクション順に（文章）,
    case_page: 1事例ページの構成（文章）,
    signature_move,
    mobile: スマホでの見え方の要点,
    rationale: なぜこの方向にしたか3〜4文
  }
- grafts: 他の方向から移植した要素を列挙（各1文・最大5件）
- first_impression_copy: トップの一番上に載せる見出しとリード文の実案（見出し1本＋リード2〜3文）。Mieyの文体（率直・具体・見下さない）で書く
- open_questions: Mieyに確認すべきことが残っていれば最大3件（無ければ空配列）`,
  { label: 'synthesize', phase: 'Synthesize', effort: 'high', schema: {
    type: 'object',
    properties: {
      recommended_name: { type: 'object', properties: { name_ja:{type:'string'}, name_en:{type:'string'}, slug:{type:'string'}, tagline:{type:'string'}, rationale:{type:'string'} }, required:['name_ja','name_en','slug','tagline','rationale'] },
      alternative_names: { type: 'array', items: { type: 'object', properties: { name_ja:{type:'string'}, tagline:{type:'string'}, when_to_pick:{type:'string'} }, required:['name_ja','tagline','when_to_pick'] } },
      recommended_design: { type: 'object', properties: {
        direction_name:{type:'string'}, concept:{type:'string'},
        palette:{type:'array', items:{type:'object', properties:{role:{type:'string'},hex:{type:'string'},note:{type:'string'}}, required:['role','hex','note']}},
        typography:{type:'object', properties:{display:{type:'string'},body:{type:'string'},mono:{type:'string'},note:{type:'string'}}, required:['display','body','mono','note']},
        page_structure:{type:'string'}, case_page:{type:'string'}, signature_move:{type:'string'}, mobile:{type:'string'}, rationale:{type:'string'}
      }, required:['direction_name','concept','palette','typography','page_structure','case_page','signature_move','mobile','rationale'] },
      grafts: { type: 'array', items: { type: 'string' } },
      first_impression_copy: { type: 'string' },
      open_questions: { type: 'array', items: { type: 'string' } },
    },
    required: ['recommended_name','alternative_names','recommended_design','grafts','first_impression_copy','open_questions'],
  }})

return { final, judges: judgedOk.map(j => ({ lens: j.lens, verdict: j.verdict, top_name: j.name_ranking[0], top_design: j.design_ranking[0] })) }
