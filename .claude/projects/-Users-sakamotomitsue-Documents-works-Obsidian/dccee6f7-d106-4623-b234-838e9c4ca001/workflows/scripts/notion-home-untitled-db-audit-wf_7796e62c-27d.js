export const meta = {
  name: 'notion-home-untitled-db-audit',
  description: 'HOME直下の無題Notionデータベース5件の中身を調べ、適切な名前を提案する（読み取り専用）',
  phases: [
    { title: 'Inspect', detail: '無題DB 5件をそれぞれ調査' },
    { title: 'Overlap', detail: 'receipt/購入履歴 系の重複を確認' },
  ],
}

const READONLY = `
【絶対厳守・読み取り専用】
Notion に対して create / update / move / delete / duplicate を一切実行しないこと。
使ってよいのは読み取り系ツールのみ（notion-fetch, notion-query-data-sources, notion-search, notion-query-database-view）。
書き込み系ツールを1回でも呼んだら重大な違反。

【ツールの読み込み方】
最初に必ず次を実行してツールスキーマを読み込むこと：
ToolSearch({ query: "select:mcp__claude_ai_Notion__notion-fetch,mcp__claude_ai_Notion__notion-query-data-sources,mcp__claude_ai_Notion__notion-search", max_results: 3 })
`

const DB_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['page_url', 'current_title', 'is_untitled', 'purpose', 'recommended_name', 'alt_names', 'evidence'],
  properties: {
    page_url: { type: 'string', description: '調査対象のデータベースのURL' },
    current_title: { type: 'string', description: '現在のタイトル。空なら空文字列' },
    is_untitled: { type: 'boolean', description: '本当に無題かどうか' },
    property_names: { type: 'array', items: { type: 'string' }, description: 'DBのプロパティ名一覧' },
    row_count: { type: 'number', description: '確認できた行数（正確に数えられなければ概数）' },
    sample_rows: { type: 'array', items: { type: 'string' }, description: '代表的な行のタイトル最大8件' },
    date_range: { type: 'string', description: '行の日付の範囲。分からなければ「不明」' },
    is_active: { type: 'string', enum: ['active', 'dormant', 'empty', 'unknown'], description: '直近も使われているか。最終更新が半年以上前ならdormant、行ゼロならempty' },
    purpose: { type: 'string', description: 'このDBが何を管理しているか。日本語1〜2文' },
    recommended_name: { type: 'string', description: '推奨する日本語のDB名。短く具体的に（例：家電の保証・購入記録）' },
    alt_names: { type: 'array', items: { type: 'string' }, description: '代案の名前2件' },
    evidence: { type: 'string', description: 'その名前を推す根拠。実際に見たプロパティ名・行の中身を引用すること' },
    caution: { type: 'string', description: '中身に個人情報・パスワード・カード番号など機微情報が含まれる場合はここに記す。なければ空文字列' },
  },
}

const DBS = [
  { page: 'https://app.notion.com/p/1cd50c495eb0801a8623deb948d97a83', ds: 'collection://1cd50c49-5eb0-8012-a3e1-000bb6166aff', label: 'db1' },
  { page: 'https://app.notion.com/p/18c50c495eb080d6a036d106c1509676', ds: 'collection://18c50c49-5eb0-803f-bcb4-000be5a65d75', label: 'db2' },
  { page: 'https://app.notion.com/p/1f850c495eb080a080bbec7b153707da', ds: 'collection://1f850c49-5eb0-80a8-80c2-000be090c482', label: 'db3' },
  { page: 'https://app.notion.com/p/21450c495eb0804aacc2e595ee3a0ad3', ds: 'collection://21450c49-5eb0-8080-bf43-000bd092854b', label: 'db4' },
  { page: 'https://app.notion.com/p/26250c495eb080029cb4cfd0d1710313', ds: 'collection://26250c49-5eb0-80af-88c3-000baf6335aa', label: 'db5' },
]

phase('Inspect')

const inspections = await parallel(DBS.map(db => () => agent(`
あなたは Miey の Notion ワークスペースを整理する調査担当です。
${READONLY}

【調査対象】
Notion の 🏠 HOME ページ直下にぶら下がっている、名前が付いていないデータベース。
- データベースページURL: ${db.page}
- データソース(collection)URL: ${db.ds}

【やること】
1. notion-fetch に ${db.page} を渡して、データベースのタイトル・スキーマ・プロパティ一覧・ビュー・データソースを取得する。
2. notion-fetch に ${db.ds} を渡して、データソースのスキーマ（プロパティの型）を確認する。
3. notion-query-data-sources で実際の行を取得する（最大20行程度でよい）。行のタイトルとプロパティの値を見て、何を管理しているDBか特定する。
4. 行が0件なら empty と判定し、それでもプロパティ名から用途を推定する。
5. 最終更新日・行の日付から、いま使われているか（active）か放置されているか（dormant）を判定する。

【名前の付け方の方針】
- Miey は日本人で、この HOME 配下は「自宅・生活まわり」の個人ページ群。名前は**日本語**で付ける。
- 同じ HOME 直下には既に「取扱説明書」「旅行」「料理」「契約関連」「購入履歴」「Receipt」「ワードローブ（wardrobe）」「掃除」といったページ・DBが並んでいる。**これらと紛らわしくない**名前にすること。
- 短く具体的に。「データベース」「一覧」だけの語は避ける。中身が一目で分かる名前にする。
- 推測で断定しない。根拠は evidence に、実際に見たプロパティ名や行の中身を引用して書く。

結果を StructuredOutput で返すこと。
`, { label: db.label, phase: 'Inspect', schema: DB_SCHEMA })))

phase('Overlap')

const overlap = await agent(`
あなたは Miey の Notion ワークスペースを整理する調査担当です。
${READONLY}

【調査対象】Miey の Notion 🏠 HOME ページ配下に、レシート・購入記録っぽいものが複数ある疑いがある。
- データベース "Receipt": https://app.notion.com/p/17e50c495eb08028971bd13337602348
- ページ "購入履歴": https://app.notion.com/p/19350c495eb08078a28ac57eac9b170e
- ページ "receipt": https://app.notion.com/p/33450c495eb080399b0fe35903348fe4

【やること】
1. この3つをそれぞれ notion-fetch で読む。データベースなら行も少し確認する（notion-query-data-sources、最大15行）。
2. それぞれが「何を・いつからいつまで・何件」持っているかを整理する。
3. 3つの間に重複があるか、役割が違うのかを判定する。
4. 統合すべきか、別々のままにすべきか、意見を述べる。ただし**削除は絶対に提案の域を出ないこと**（実行はしない）。

結果は日本語のプレーンテキストで、次の見出しで返す：
## Receipt（DB）
## 購入履歴（ページ）
## receipt（ページ）
## 重複判定
## 推奨アクション
`, { label: 'receipt-overlap', phase: 'Overlap' })

return { inspections: inspections.filter(Boolean), overlap }
