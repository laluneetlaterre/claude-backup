export const meta = {
  name: 'kanteisho-platform-fees',
  description: '鑑定書デジタル販売（4,900円・8/10締切）の販売チャネル手数料と適合性を並列調査し、要の事実を検証',
  phases: [
    { title: 'Research', detail: 'MOSH / Luma / Stripe / 代替サービス一括の4並列調査' },
    { title: 'Verify', detail: '結論を左右する事実（Stripeの占い可否・MOSH/Luma料率）を公式ソースで再検証' },
  ],
}

const CONTEXT = `
# 調査の背景（日本・2026-07-23 時点の情報を調べる）
販売者：Miey（日本の個人事業主。特定商取引法の住所・電話番号は用意済み）。
商品：四柱推命＋数秘術の「鑑定書」PDF（デジタル納品のみ。Zoom/Meetレッスンなし。非同期納品なので予約枠・日程調整は不要）。
価格：4,900円（税込想定）。期間限定販売：受付〜2026-08-10。
申込時に集めたい情報：氏名（呼び名）・生年月日・出生時刻・出生地・（希望者のみ）相談内容テキスト。
納品：PDF（Google Drive リンクまたはメール添付）。
比較基準：Cafetalk の実効手数料 約31%（手取り69%）が現状のベースライン。
必要なもの：決済＋申込情報の収集がスムーズに繋がること。予約カレンダーは不要だが、あっても害はない。

# 調査の注意
- 必ず WebSearch / WebFetch（ToolSearch で読み込んで使う）で現在の公式料金ページ・利用規約を確認する。記憶で答えない
- 料率は「4,900円の商品1件あたりの手数料額と手取り額」まで計算する
- 固定費（月額プラン・振込手数料・入金サイクル）も含める
- 「占い・鑑定サービス」がそのプラットフォームの禁止・制限業種に当たるかを利用規約レベルで確認する（ここが結論を左右する）
- 出典URLを必ず残す
`

const PLATFORM = {
  type: 'object',
  additionalProperties: false,
  properties: {
    platform: { type: 'string' },
    fee_structure: { type: 'string', description: '手数料体系の全体像（率・固定費・振込手数料・入金サイクル）' },
    payout_on_4900_jpy: { type: 'number', description: '4,900円販売1件あたりの手取り額（円・概算）' },
    effective_fee_pct: { type: 'number', description: '4,900円に対する実効手数料率（%）' },
    form_collection: { type: 'string', description: '申込時に生年月日・出生時刻・出生地・相談内容を集められるか、その方法' },
    uranai_policy: { type: 'string', description: '占い・鑑定サービスの可否。規約の該当箇所と根拠。不明なら「未確認」と明記' },
    booking_or_delivery: { type: 'string', description: 'デジタル納品・期間限定販売・在庫/枠数制限のやりやすさ' },
    fit_verdict: { type: 'string', description: 'この用途への適合度の結論（1〜3文・忖度なし）' },
    sources: { type: 'array', items: { type: 'string' }, maxItems: 8 },
  },
  required: ['platform', 'fee_structure', 'payout_on_4900_jpy', 'effective_fee_pct', 'form_collection', 'uranai_policy', 'fit_verdict', 'sources'],
}

const TARGETS = [
  {
    key: 'mosh',
    brief: `MOSH（mosh.jp）を調査。現在のサービス手数料＋決済手数料の正確な料率（変更履歴があるので最新を確認）、予約なしの「コンテンツ販売・物販型」商品が作れるか、事前アンケート機能で出生データ・相談内容を集められるか、占いジャンルのクリエイターが実在するか。`,
  },
  {
    key: 'luma',
    brief: `Luma（lu.ma / luma.com）を調査。有料チケットのプラットフォーム手数料（無料プランと Luma Plus での違い）、Stripe 決済手数料の扱い、日本円対応、イベント型プラットフォームを「非同期のデジタル納品商品」に流用できるか（開催日時のないチケット販売が可能か）、登録フォームで質問項目（生年月日等）を追加できるか、占い系の可否。`,
  },
  {
    key: 'stripe',
    brief: `Stripe（日本）を調査。Payment Links の決済手数料（国内カード・現在の料率。3.6%から変わっていないか）、月額固定費の有無、Payment Links のカスタムフィールドで集められる項目数の上限（生年月日・出生時刻・出生地・相談内容を集め切れるか。足りない場合は決済後リダイレクト＋Googleフォーム連携の実務）、そして最重要：Stripe の禁止・制限業種リスト（Restricted Businesses 日本版）に占い・鑑定・スピリチュアルサービスが含まれるか否かを利用規約の原文で確認。特商法ページの要件も。`,
  },
  {
    key: 'alternatives',
    brief: `代替サービスを横並び調査：BASE・STORES・note有料記事・ココナラ・Peatix。それぞれの手数料（4,900円1件の手取り）、デジタル納品可否、占いの可否（ココナラは占いカテゴリあり）、フォームで出生データを集められるか。1プラットフォーム2〜4文で簡潔に。最後に「4,900円1件あたり手取り」の高い順ランキングを fee_structure 欄にまとめる。`,
  },
]

phase('Research')
const results = await parallel(
  TARGETS.map((t) => () =>
    agent(
      `${CONTEXT}\n\nあなたは決済・ECプラットフォームの調査員。以下を調査し、日本語で構造化出力で返せ。\n${t.brief}`,
      { label: t.key, phase: 'Research', schema: PLATFORM }
    )
  )
)

const VERIFY = {
  type: 'object',
  additionalProperties: false,
  properties: {
    stripe_uranai_verdict: { type: 'string', description: 'Stripeで占い鑑定サービスの販売は可か不可か（規約原文ベースの結論）' },
    stripe_uranai_evidence: { type: 'string', description: '根拠（規約の該当文言とURL）' },
    fee_corrections: { type: 'array', items: { type: 'string' }, maxItems: 6, description: '4調査員の料率・手取り計算で誤りがあれば訂正。なければ「なし」1件' },
    cheapest_ranking: { type: 'array', items: { type: 'string' }, maxItems: 8, description: '4,900円1件あたり手取り額の高い順（プラットフォーム名＋手取り額＋率）' },
    unresolved: { type: 'string', description: '公式ソースで確認しきれなかった点。なければ「なし」' },
  },
  required: ['stripe_uranai_verdict', 'stripe_uranai_evidence', 'fee_corrections', 'cheapest_ranking', 'unresolved'],
}

phase('Verify')
const valid = results.filter(Boolean)
const verified = await agent(
  `${CONTEXT}\n\n4人の調査員の報告が以下。\n${JSON.stringify(valid, null, 2)}\n\nあなたは検証担当。結論を左右する事実だけを公式一次ソース（WebFetch で規約・料金ページの原文）で再確認せよ：\n1. Stripe の禁止・制限業種に占い・鑑定・スピリチュアルが入っているか（最重要。入っていれば Stripe 案は全て崩れる）\n2. MOSH と Luma の現在の料率（調査員の数字が古い可能性を疑え）\n3. 各手取り計算の検算\n日本語で構造化出力で返せ。`,
  { label: 'verify', phase: 'Verify', schema: VERIFY, effort: 'high' }
)

return { research: valid, verified }