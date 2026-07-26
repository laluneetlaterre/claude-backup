export const meta = {
  name: 'verify-shichusuimei-lesson-page',
  description: '四柱推命×AI構築レッスンページ草案の公開前検証（4レンズ並列）',
  phases: [{ title: 'Verify', detail: 'HTML制約・規約・文体・商品整合の4視点' }],
}

const BASE = '/Users/sakamotomitsue/Documents/works/obsidian'
const NEW_PAGE = `${BASE}/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/01_商品ページ（公開中）/媒体別/Cafetalk/2026-07-22_Cafetalk構築レッスン_四柱推命×AI_レッスンページ草案_v0.md`
const TAIKEN_PAGE = `${BASE}/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/01_商品ページ（公開中）/媒体別/Cafetalk/2026-07-05_Cafetalk体験セッション_レッスンページ草案_v0.md`
const VOICE = `${BASE}/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/05_設計資料（世界観・壁打ちログ）/声の見本帳_文体トーンリファレンス.md`
const SPEC = `${BASE}/03_stock/cafetalk/カフェトーク仕様シート.md`

const SCHEMA = {
  type: 'object',
  properties: {
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          issue: { type: 'string', description: '問題の一文説明' },
          location: { type: 'string', description: '草案内の場所（見出し・引用）' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          suggested_fix: { type: 'string', description: '具体的な修正案（差し替え文まで書く）' },
        },
        required: ['issue', 'location', 'severity', 'suggested_fix'],
      },
    },
    ok_summary: { type: 'string', description: '問題なしと確認できた点の短い要約' },
  },
  required: ['findings', 'ok_summary'],
}

phase('Verify')
const results = await parallel([
  () => agent(`あなたはCafetalk HTML技術制約の検証者です（読み取り専用・編集禁止）。
検証対象：${NEW_PAGE} の「本文HTML版」コードブロック。
参照（実機検証済みの正）：${TAIKEN_PAGE} のHTML版と冒頭の検証注記（2026-07-06実機：tableは剥がれる／line-heightは各要素にインライン明示なら通る／div+background+border+padding+インラインcolor/font-sizeは通る）。
チェック項目：①<table>タグ不使用か ②絵文字・記号（Cafetalkで文字化けする絵文字）が本文HTMLに混入していないか ③各<p>/<div>にline-height・marginがインライン明示されているか ④濃い背景色（剥がれる）を使っていないか ⑤リンクの&が&amp;にエスケープされているか ⑥タグの閉じ忘れ・入れ子の崩れがないか ⑦Cafetalkエディタで剥がれやすいCSS（position・flex・グラデーション等）を使っていないか。
問題は具体的な修正案（差し替えコードまで）つきで報告。反論できないほど確実な問題だけhigh。`, { label: 'verify:HTML制約', phase: 'Verify', schema: SCHEMA }),

  () => agent(`あなたはCafetalk講師規約と誇大表現の検証者です（読み取り専用・編集禁止）。
検証対象：${NEW_PAGE} 全体（本文プレーンテキスト版・HTML版・タイトル案）。
参照：${SPEC}（§1 規約：外部誘導・直接取引禁止／競合する同種のオンライン商品へのリンク・誘導不可。§3-1 先行モニター表記ルール：正規版の価格・外部販売への言及は書かない）。
チェック項目：①正規版の価格（8万・12〜15万等）や外部販売・直販・MOSH等への言及が本文に漏れていないか ②「稼げる」「必ず〜になれる」等の収入約束・誇大表現がないか ③「未来を当てる」系の断定がないか ④外部リンクはclaude.com/pricing（ツール料金参照）とCafetalk内レッスンリンクのみか ⑤先行モニターの条件が「お願いベース」の書き方になっているか（義務・契約のような硬い表現になっていないか） ⑥医療・法律等の専門助言と誤認される表現がないか。
問題は具体的な修正案つきで報告。`, { label: 'verify:規約・誇大', phase: 'Verify', schema: SCHEMA }),

  () => agent(`あなたは「育つ魂の設計図」の文体・世界観の検証者です（読み取り専用・編集禁止）。
検証対象：${NEW_PAGE} の本文プレーンテキスト版・HTML版・タイトル案・キャッチ。
参照（声の正本）：${VOICE}（静謐な語り部／中心メタファー1つ／対句／余白で閉じる／casual軽口禁止／擬古調禁止／不安煽り・「今すぐ」禁止／断定で当てにいかない）。
参照（語彙の正本）：${TAIKEN_PAGE}（祭壇の間・記憶の書棚・創造の祭壇・問いの窓・三賢者・天命の地図・「育つ」の使い方、色使い、トーン）。
チェック項目：①軽口・casual表現の混入 ②擬古調の混入 ③世界観語彙の誤用・表記ゆれ（体験ページと同じ表記か） ④中心メタファー（鍵・お引っ越し）がぶれていないか、メタファーを詰め込みすぎていないか ⑤キャラ・世界観語の連発（同じ語の過剰反復） ⑥体験ページとトーンの落差がないか ⑦不安煽り・急かしの混入。
文章の良し悪しの好みではなく、声の見本帳の基準からの逸脱だけを報告。修正案は差し替え文まで書く。`, { label: 'verify:文体・世界観', phase: 'Verify', schema: SCHEMA }),

  () => agent(`あなたは商品設計の整合性検証者です（読み取り専用・編集禁止）。
検証対象：${NEW_PAGE} 全体。
参照：${TAIKEN_PAGE}（体験セッション＝課金不要・講師の画面・90分・10,000pt・出口導線）、${SPEC}（§3 商品設計：全レッスン90分統一・先行モニター正式化・実践編没）。
チェック項目：①体験セッション→本レッスンの階段が矛盾なく繋がるか（体験は「課金不要」を売りにしている。本レッスンでClaude Pro課金が必要になることが、隠さず・かつ階段として自然に書かれているか） ②90分のゴール（賢者が鑑定書を読んで答えるまで＋お引っ越し）が過約束でないか（超初心者のインストール〜動作まで90分の実績前提と整合するか） ③「続きは同じレッスンを再予約」の案内が体験ページの「二股出口」設計と矛盾しないか ④先行モニター表記が汎用構築レッスンのルール（タイトル冒頭＋末尾ボックス・お願い2つ・正式版完成まで）と同型か ⑤販売設定メモの未決事項に漏れがないか（対象者・延長チケット・サムネ以外に決めるべきことは？） ⑥体験セッションを受けていない人がこのページに来たときの導線が成立しているか。
問題は具体的な修正案つきで報告。`, { label: 'verify:商品整合', phase: 'Verify', schema: SCHEMA }),
])

return { results }