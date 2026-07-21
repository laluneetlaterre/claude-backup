export const meta = {
  name: 'kaodashi-decision',
  description: '直販LPから「顔出しなしOK」表記を外すべきか3レンズで検証し統合する',
  phases: [
    { title: 'Lenses', detail: '3つの独立視点で検証' },
    { title: 'Synthesis', detail: '統合して実装案を出す' },
  ],
}

const CONTEXT = `
## 商品
「育つ魂の設計図」体験セッション。四柱推命・数秘術の鑑定書をAIに読ませ、AIが客を覚えて育っていく様子を体験する90分のオンライン個人セッション（Google Meet・講師の画面共有）。
- 直販LP：90分 14,900円（先着5名の公開記念価格。正規19,800円予定）。決済はStripeカード決済。レビューゼロの新しい自社サイト
- 別チャネルのCafetalk版：60分 10,000pt。プラットフォーム側の匿名文化が強く、ハンドルネーム利用が一般的

## 客層
占い・自己理解が好きな非テクニカル層。内省的、繊細な人が多い。「AIに月額課金するのは怖い」「Codeって難しそう」という段階の人。迷いや不安をひとりで抱えがちな人を想定読者にしている。

## セッションの中身（サービス品質に関わる事実）
90分のうち約60分が「AIとの対話の時間」。客が「いま、いちばん迷っていること」を自分の言葉で話し、三賢者（Claude・Codex・Gemini）の回答を見て「どの言葉が心に残ったか」を答え、最後に持ち帰る問いを講師と一緒に決める。つまり**客が自分の言葉を出すことがセッションの中核**。操作はすべて講師が行い、客は画面を見て話す（または打つ）だけ。

## 現在のLPの記述（顔出し関連は3箇所）
1. ヒーロー直下の一行：「オンライン（Google Meet）／ 90分 14,900円 ／ 顔出しなしOK」
2. 独立セクション「受講スタイルも、あなたのままで」（本文中盤）：
   ・顔出しなしでOKです。カメラはオフのまま、どうぞ。
   ・声を出すのも遠慮したい方は、チャットのみでもOK。文字だけで進められます。
   ・Google Meetの表示名は自由です。ニックネームのまま、ご自身の内側と向き合える時間です。
   ※注記：チャットのみの場合、Google Meet等に不具合が起きた際、コミュニケーションが難しくなることがあります。その場合は、ご予約時のメールアドレスへご連絡します。
3. FAQ：「顔出しは必要ですか？」→「不要です。カメラオフ・チャットのみでも受講できます。Google Meetの表示名もニックネームで構いません。」

## 商品オーナーMieyの提起（原文）
「Cafetalkはともかく、LPの方は、顔出しなしOKは辞めたほうがいいかなと思った」

## 検討すべき論点
「顔出しなしOK」は実は3つの別々の許可が束ねられている：(a) カメラオフ (b) 声を出さずチャットのみ (c) 本名を出さずニックネーム表示。全部同じ扱いでよいか、分けるべきか。
`

const SCHEMA = {
  type: 'object',
  properties: {
    verdict: { type: 'string', description: '全削除／部分削除（どれを残しどれを消すか明示）／現状維持 のいずれか＋一言' },
    reasoning: { type: 'string', description: '根拠。3〜6文' },
    per_element: {
      type: 'array',
      description: '(a)カメラオフ (b)チャットのみ (c)ニックネーム の3要素それぞれの扱い',
      items: {
        type: 'object',
        properties: {
          element: { type: 'string' },
          action: { type: 'string', description: '残す／消す／場所を移す（どこへ）' },
          why: { type: 'string' },
        },
        required: ['element', 'action', 'why'],
      },
    },
    risk_if_wrong: { type: 'string', description: 'この判断が外れた場合に起きる具体的な損失' },
  },
  required: ['verdict', 'reasoning', 'per_element', 'risk_if_wrong'],
}

const LENSES = [
  {
    id: 'conversion',
    prompt: `レンズ1【申し込み率・不安の除去】：あなたはダイレクトレスポンス・コピーライター。内省的で繊細な非テク層が、レビューゼロの個人サイトで14,900円をカード決済する場面を想像し、「顔出しなしOK」の記述が申し込みの障壁を下げているのか、それとも別の効果を持つのかを判定する。消した場合に離脱する読者が実在するか、その規模感も推定すること。`,
  },
  {
    id: 'positioning',
    prompt: `レンズ2【価格・ポジショニングの一貫性】：あなたはブランド戦略家。14,900円（将来19,800円）の一対一プレミアムセッションとして、「顔出しなし・チャットのみ・ニックネーム可」を3箇所で繰り返すことが、商品の格・親密さ・講師への信頼にどう作用するかを判定する。安売り感やディフェンシブな印象が出ていないか。Cafetalk（プラットフォームの匿名文化あり）と自社LP（カード決済で実名が分かる）の差も踏まえること。`,
  },
  {
    id: 'service_quality',
    prompt: `レンズ3【提供品質と体験の成否】：あなたは対人セッションの設計者。このセッションは客が自分の言葉を出すことが中核で、90分のうち60分が対話。カメラオフ・声なしチャットのみの客に対して、この体験が約束どおり成立するかを冷静に判定する。成立しにくいなら、それを事前に「OK」と広告することが客の満足度・返金要求・レビューにどう跳ね返るかも述べること。`,
  },
]

phase('Lenses')
const lenses = (await parallel(LENSES.map(l => () =>
  agent(CONTEXT + '\n\n## あなたの視点\n' + l.prompt + '\n\nMieyの直感に同調も忖度もせず、あなたの視点から見た結論を述べること。反対意見なら反対と言うこと。', {
    label: 'lens:' + l.id, phase: 'Lenses', schema: SCHEMA,
  })
))).filter(Boolean)

phase('Synthesis')
const lensText = lenses.map((v, i) => `【${LENSES[i].id}】\n判定：${v.verdict}\n根拠：${v.reasoning}\n要素別：${v.per_element.map(p => `${p.element}→${p.action}（${p.why}）`).join(' / ')}\n外した場合のリスク：${v.risk_if_wrong}`).join('\n\n----\n\n')

const SYNTH_SCHEMA = {
  type: 'object',
  properties: {
    final_recommendation: { type: 'string', description: '最終推奨。1〜2文で結論を先に' },
    disagreements: { type: 'string', description: '3レンズ間で割れた点と、どう裁いたか' },
    edits: {
      type: 'array',
      description: 'LPへの具体的な編集指示',
      items: {
        type: 'object',
        properties: {
          location: { type: 'string', description: 'ヒーロー一行／受講スタイルのセクション／FAQ など' },
          action: { type: 'string', description: '削除／書き換え／そのまま' },
          new_text: { type: 'string', description: '書き換えの場合の推奨文（日本語・Mieyの文体：神秘的×知的・現代語）。削除なら空文字' },
          why: { type: 'string' },
        },
        required: ['location', 'action', 'new_text', 'why'],
      },
    },
  },
  required: ['final_recommendation', 'disagreements', 'edits'],
}

const synthesis = await agent(CONTEXT + '\n\n## 3つのレンズの判定\n' + lensText + '\n\nあなたは統合役。3レンズの判定を突き合わせ、割れた点は理由をつけて裁き、LPへの具体的な編集指示に落とすこと。Mieyの提起（顔出しなしOKを辞める）に対して、そのまま全部消すのが正しいのか、要素を分けるべきなのかを明確にすること。編集指示の文面はMieyの文体（神秘的×知的・現代語、見下しや不安煽りなし）に合わせること。', {
  label: 'synthesis', phase: 'Synthesis', schema: SYNTH_SCHEMA,
})

return { lenses, synthesis }