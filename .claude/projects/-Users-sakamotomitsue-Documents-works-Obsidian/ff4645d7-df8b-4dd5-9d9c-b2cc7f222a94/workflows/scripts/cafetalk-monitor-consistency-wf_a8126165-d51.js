export const meta = {
  name: 'cafetalk-monitor-consistency',
  description: '構築レッスンのモニター表記化に伴う波及先の整合性スイープ＋MOSH特商法の裏取り',
  phases: [
    { title: 'Sweep', detail: 'Cafetalk関連ファイルの価格・位置づけ表現を並列読取' },
    { title: 'Verify', detail: 'MOSH特商法の住所代替を公式ヘルプで確認' },
  ],
}

const BASE = '/Users/sakamotomitsue/Documents/works/obsidian'

const SWEEP_SCHEMA = {
  type: 'object',
  properties: {
    files_read: { type: 'array', items: { type: 'string' } },
    claims: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          quote: { type: 'string', description: '価格・提供条件・商品の位置づけに関する原文の引用（短く）' },
          location: { type: 'string', description: 'ファイル名と見出し・行の目安' },
          why_it_matters: { type: 'string', description: '構築レッスンをモニター表記にした場合にどう関係するか' },
        },
        required: ['quote', 'location', 'why_it_matters'],
      },
    },
    monitor_touchpoints: {
      type: 'array',
      items: { type: 'string' },
      description: '構築レッスンを「モニター」と名打つ場合、このファイル/ページ側で直す・追記すべき箇所の具体リスト（不要なら空）',
    },
  },
  required: ['files_read', 'claims', 'monitor_touchpoints'],
}

const MOSH_SCHEMA = {
  type: 'object',
  properties: {
    confirmed: { type: 'string', enum: ['yes', 'no', 'unclear'] },
    detail: { type: 'string', description: '確認できた内容の要約（条件・注意点含む）' },
    source_urls: { type: 'array', items: { type: 'string' } },
  },
  required: ['confirmed', 'detail', 'source_urls'],
}

const COMMON = `あなたは整合性監査の読み手です（読み取り専用・ファイル編集は絶対にしない）。
背景：Cafetalk公開中の「構築レッスン」（あなた専用の「AI第二の脳」を一緒に作る｜Obsidian × Claude Code 構築レッスン・90分・10,000pt）を、今後「モニター（先行モニター価格）」とページ上に明示する方針になった。理由：正規のObsidian構築商品はモニター8万円・正規12〜15万円で設計済みで、Cafetalkの1万円は実質モニター価格だから。モニター条件＝率直な感想（レビュー）＋匿名での事例化協力。
タスク：指定ファイルを読み、①価格・提供条件・商品の位置づけ（モニター/正式版/体験/割引/単発/回数）に関する記述を短い引用＋場所つきで抽出、②構築レッスンをモニター表記に変えた場合に、このファイル/ページ側で直す・追記すべき箇所を具体的に列挙。矛盾がなければ touchpoints は空でよい（無理に作らない）。`

phase('Sweep')
const results = await parallel([
  () => agent(`${COMMON}
対象ファイル（1つ）：
${BASE}/products/「育つ魂の設計図」四柱推命×数秘術×AI第二の脳/01_商品ページ（公開中）/媒体別/Cafetalk/2026-07-05_Cafetalk体験セッション_レッスンページ草案_v0.md
特に注目：このページから構築レッスンへ張られている出口リンク・紹介文の文言。体験セッション側の価格表現。`, { label: 'sweep:体験セッションページ', phase: 'Sweep', schema: SWEEP_SCHEMA }),

  () => agent(`${COMMON}
対象ディレクトリ：${BASE}/03_stock/cafetalk/あなた専用の「AI第二の脳」を一緒に作る｜Obsidian × Claude Code 構築レッスン/
まず ls でファイル名を確認し、「実践編」を含むファイルと「事業設計」を含むファイルの2つを読む（メインの構築レッスン本文ファイルは読まなくてよい・別担当）。
特に注目：実践編ページが本編（構築レッスン）をどう参照しているか（90分・10,000ptの記載、受講者専用の位置づけ）。本編がモニター表記になった場合に実践編ページで直す箇所。事業設計メモの価格・段階設計との整合。`, { label: 'sweep:実践編・事業設計', phase: 'Sweep', schema: SWEEP_SCHEMA }),

  () => agent(`${COMMON}
対象ディレクトリ：${BASE}/03_stock/cafetalk/育つ魂の設計図・体験セッション ── あなたの命式が、AIと対話を始める60分/
まず ls でファイル名を確認し、割引チケット設計と配布メッセージ（10%OFF）の2ファイルを読む。
特に注目：既に配布済みの10%OFFチケットが構築レッスンにも使えるのか、モニター価格の物語（1万円＝すでに割安）と割引配布が矛盾しないか。`, { label: 'sweep:割引チケット', phase: 'Sweep', schema: SWEEP_SCHEMA }),

  () => agent(`${COMMON}
対象ファイル（2つ）：
${BASE}/03_stock/cafetalk/カフェトーク仕様シート.md
${BASE}/03_stock/cafetalk/Cafetalk戦略_前提ファクトシート.md
特に注目：価格上限1万円・150レッスン解放・「投資フェーズのトレードオフ」等の戦略記述と、モニター表記方針の整合。レッスンページの表記変更に関わる仕様・規約メモがあれば拾う。モニター方針を戦略シート側に追記すべきかも判断。`, { label: 'sweep:仕様・戦略シート', phase: 'Sweep', schema: SWEEP_SCHEMA }),
])

phase('Verify')
const mosh = await agent(`MOSH（mosh.jp・日本のサービス販売プラットフォーム）の特定商取引法に基づく表記について、個人事業主（クリエイター）の住所・電話番号を「MOSH運営会社の住所・連絡先で代用できる」仕組みが公式に存在するかを確認してください。
方法：WebSearch で「MOSH 特定商取引法 住所 代替」「MOSH 特商法 住所 非公開」等を検索し、help.mosh.jp の公式ヘルプページ（https://help.mosh.jp/ 配下。末尾 .md のプレーンテキスト版が取得しやすい）を WebFetch で読む。公式ソースを最優先。
返すもの：結論（yes/no/unclear）、代用の条件・注意点（例：請求があれば開示する義務の有無、設定方法）、根拠URL。`, { label: 'verify:MOSH特商法', phase: 'Verify', schema: MOSH_SCHEMA })

return { sweep: results, mosh }