export const meta = {
  name: 'kanteisho-pricing-panel',
  description: '鑑定書のみ商品（8/15限定・悩み相談付き）の価格を3視点で独立検討し、レッドチームで確定',
  phases: [
    { title: 'Perspectives', detail: '事業数値・顧客心理・商品ライン整合の3視点が独立に価格提案' },
    { title: 'RedTeam', detail: '3案を突き合わせて攻撃し、最終価格とガードレールを確定' },
  ],
}

const FACTS = `
# 検討対象（Miey の新商品案）
Cafetalk で「四柱推命の鑑定書のみ」を売る。Google Meet レッスンなし（納品物型）。
- 期間限定：受付は 2026-08-15 まで（本日は 2026-07-23。約3.5週間）
- 訴求：「Anthropic の最上位AI Claude Fable 5 が 8/18 まで使える。その Fable 5 で鑑定するのは今だけ」
- 特典：希望者には「Miey の悩み相談」付き（形式は未定：Cafetalkメッセージでの質問往復 or 30分Meet などから設計する）
- Miey の指示：「Cafetalkは全レッスン10,000pt固定・低単価はやらない」という過去決定は今回は忘れてよい（撤回ではなく今回の検討では外す）
- 問い：料金はいくらがいいか

# 前提ファクト（vault 内ファイルから確認済み）
- Cafetalk のプラットフォーム上限：1レッスン 10,000pt（1pt=1円）。累計150レッスンで上限解放、Miey は現在66完了で当面届かない
- 手数料：実効で講師手取り約69%（マージン約31%）
- 現行ラインナップ：
  - 体験セッション「育つ魂の設計図」90分・10,000pt。四柱推命＋数秘術＋性格タイプの鑑定書一式＋天命の地図（事前版）を事前作成し、当日は Miey の画面で「記憶の書棚（AI第二の脳）」のライブデモを見せる。これが旗艦商品
  - 構築レッスン「祭壇の間」各話90分・10,000pt・全4話
  - 上位に直販の Obsidian 構築商品（モニター8万円・正規12〜15万円設計）。ただし Cafetalk ページに外部商品への言及は書けない（規約）
- 市場：Cafetalk の中心価格帯は 2,000〜4,000pt。5,000pt 超は全体の約6%のみ。ただし Miey は IT・プログラミング部門で口コミランキング1位・リピートランキング1位の2冠、10,000pt レッスンの販売実績あり
- Miey の過去の価格実績（60分）：4,800 / 4,830 / 6,900 / 7,900 / 10,000pt
- 参考相場：ココナラ等の四柱推命鑑定書は 3,000〜5,000円がボリュームゾーン、プレミアムで1万円超
- 鑑定書の制作コスト：Fable 5（kanteisho スキル）で生成 → Miey がレビュー → 世界観PDF（深紺×金・明朝）で納品。Miey の実働は1件あたり概ね60〜90分想定。Meet なしなので予定調整・拘束時間はゼロ
- 目的：①Fable 5 が使える期間の収益化 ②新規顧客の入口 ③体験セッション（10,000pt）・構築レッスンへの導線。旗艦の体験セッションを共食いしないことが重要
- 参照可能ファイル（必要なら読む）：
  - /Users/sakamotomitsue/Documents/WORKS/Obsidian/03_stock/cafetalk/カフェトーク仕様シート.md
  - /Users/sakamotomitsue/Documents/WORKS/Obsidian/03_stock/cafetalk/Cafetalk戦略_前提ファクトシート.md
  - /Users/sakamotomitsue/Documents/WORKS/Obsidian/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/01_商品ページ（公開中）/媒体別/Cafetalk/2026-07-05_Cafetalk体験セッション_レッスンページ草案_v0.md

# 回答の姿勢
- 忖度なし。Miey は率直な異論を歓迎する
- 「期間限定＝値引き」と決めつけない。Fable 5 訴求は品質の希少性（今だけ最上位AIで鑑定できる）であり、値引きの理由にも割増の理由にもなり得る。どちらが正しいかも含めて判断せよ
- 価格は 10,000pt 以下で1点に絞る（プラットフォーム上限のため）
`

const REC = {
  type: 'object',
  additionalProperties: false,
  properties: {
    price_pt: { type: 'number', description: '推奨価格（pt）1点' },
    range: { type: 'string', description: '許容レンジ（例: 6900〜8000pt）' },
    consultation: { type: 'string', description: '悩み相談特典の推奨設計（形式・回数・時間・期限の線引き）' },
    rationale: { type: 'array', items: { type: 'string' }, maxItems: 5, description: '価格の根拠（数値・論理つき）' },
    risks: { type: 'array', items: { type: 'string' }, maxItems: 5, description: 'この価格の弱点・リスク' },
    copy_note: { type: 'string', description: '価格の見せ方・訴求上の注意（1〜2文）' },
  },
  required: ['price_pt', 'consultation', 'rationale', 'risks'],
}

const PERSPECTIVES = [
  {
    key: 'unit-economics',
    role: '事業数値の専門家',
    brief: `手取り（実効69%）・Miey の時間単価・受注キャパの観点だけで最適価格を出せ。
- 相談オプトイン率を複数シナリオ（30%/50%/80%）で置き、相談形式ごとの Miey 実働時間込みの実効時給を価格候補（5000/6900/7900/8800/10000pt あたり）ごとに試算せよ
- 8/15 までの約3.5週間で捌けるキャパ（1件60〜90分＋相談）と、価格ごとの想定受注数から期待売上も比較せよ
- 数字は概算でよいが、計算過程を rationale に残せ`,
  },
  {
    key: 'customer-psychology',
    role: '顧客心理と占い市場の専門家',
    brief: `買い手の心理・市場相場・価格の知覚だけで最適価格を出せ。
- Cafetalk の価格帯分布（中心2,000〜4,000pt）と占い鑑定書の相場（ココナラ3,000〜5,000中心）に対し、Miey の2冠・実績・鑑定書の厚みがどこまでプレミアムを正当化するか
- 「Fable 5 今だけ」訴求は品質希少性。これを値引きと組み合わせると訴求が濁らないか（最上位AIなのに安い？）、それとも「期間限定だからこの価格」が買い手に自然に通るか
- チャーム価格（Miey の過去実績 6,900/7,900）の効果、10,000pt 旗艦とのアンカリング関係
- 悩み相談付きが買い手の知覚価値をどれだけ押し上げるか`,
  },
  {
    key: 'product-line',
    role: '商品ライン設計の専門家',
    brief: `既存ラインナップとの整合・導線だけで最適価格を出せ。
- 最重要：体験セッション（90分・10,000pt・鑑定書つき）との共食い回避。鑑定書のみ＋悩み相談が安すぎると「体験セッションの下位互換で十分」と流れるリスクをどう防ぐか。悩み相談（特に Meet 形式にした場合）は体験セッションと何が違うのかの線引きを設計せよ
- 鑑定書のみ購入者を体験セッション・構築レッスンへ上げる導線として、どの価格差が最も機能するか
- 受付8/15締切と Fable 5 の 8/18 期限の関係（納品バッファ3日で足りるか、受注数上限を設けるべきか）
- 期間限定商品が終わった後（8/16以降）のラインナップの見え方も考慮せよ`,
  },
]

phase('Perspectives')
const recs = await parallel(
  PERSPECTIVES.map((p) => () =>
    agent(
      `${FACTS}\n\nあなたは${p.role}として、この商品の価格を1点に絞って提案する。\n${p.brief}\n\n必要なら参照可能ファイルを読んで前提を確認してよい。日本語で、構造化出力で返せ。`,
      { label: p.key, phase: 'Perspectives', schema: REC }
    )
  )
)

const FINAL = {
  type: 'object',
  additionalProperties: false,
  properties: {
    final_price_pt: { type: 'number' },
    consultation_design: { type: 'string', description: '悩み相談特典の最終設計（形式・回数・時間・期限）' },
    deadline_design: { type: 'string', description: '8/15締切まわりの設計（受注上限・納期・8/18バッファの扱い）' },
    guardrails: { type: 'array', items: { type: 'string' }, maxItems: 6, description: '共食い回避・スコープ管理などの運用ガードレール' },
    rejected_alternatives: { type: 'array', items: { type: 'string' }, maxItems: 4, description: '却下した価格案とその理由（1行ずつ）' },
    top_risks: { type: 'array', items: { type: 'string' }, maxItems: 4, description: '最終案に残る主要リスク' },
    dissent: { type: 'string', description: '3視点の間で解消しきれなかった対立点があれば明記。なければ「なし」' },
  },
  required: ['final_price_pt', 'consultation_design', 'deadline_design', 'guardrails', 'rejected_alternatives', 'top_risks', 'dissent'],
}

phase('RedTeam')
const valid = recs.filter(Boolean)
const final = await agent(
  `${FACTS}\n\n3人の専門家が独立に出した価格提案が以下。\n${JSON.stringify(valid, null, 2)}\n\nあなたはレッドチーム兼最終意思決定者。次を行え：\n1. 各案の rationale を疑い、計算・論理の穴を探す（特に相談オプトイン時の時間コスト、共食いシナリオ、「最上位AIなのに安売り」の訴求矛盾）\n2. 攻撃に耐えた要素だけで最終価格を1点に確定（10,000pt 以下）\n3. 悩み相談の線引き・8/15締切設計・ガードレールを確定\n4. 3案の対立が残るなら dissent に明記（無理に丸めない）\n日本語で構造化出力で返せ。`,
  { label: 'red-team', phase: 'RedTeam', schema: FINAL, effort: 'high' }
)

return { perspectives: valid, final }