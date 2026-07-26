export const meta = {
  name: 'verify-lesson-page-sync',
  description: '構築レッスンページの平文↔HTML同期とCafetalk制約を検証',
  phases: [{ title: 'Verify', detail: '2レンズ並列検証' }],
}
phase('Verify')
const FILE = args.file
const SCHEMA = {
  type: 'object',
  properties: {
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          where: { type: 'string' },
          problem: { type: 'string' },
          severity: { type: 'string', enum: ['must-fix', 'minor', 'info'] },
        },
        required: ['where', 'problem', 'severity'],
      },
    },
  },
  required: ['issues'],
}
const results = await parallel([
  () => agent(`ファイル ${FILE} を読んでください。このファイルには「## 本文（プレーンテキスト版・原稿）」セクション（平文）と「## ▼▼▼ Cafetalkページ用・全文HTML版」セクション（HTMLコードブロック）があります。両者は内容が完全に一致しているべきです（HTMLは装飾があるだけで、文言・文の順序・含まれる情報は平文と同一のはず）。平文とHTMLを段落単位で厳密に突き合わせ、文言の食い違い・片方にしかない文・順序の違いをすべて挙げてください。例外として許容されるもの：(a)平文の「（ページ内リンク）」「（リンク）」等の注記がHTMLでは実リンクになっている (b)HTMLの「──ふたつの道に、共通していることを。」という導入行（平文では見出し） (c)見出しの表現差。販売設定メモ・制作メモのセクションは対象外。差異ゼロなら issues は空配列で返す。`, { label: 'verify:平文↔HTML一致', phase: 'Verify', schema: SCHEMA }),
  () => agent(`ファイル ${FILE} の「## ▼▼▼ Cafetalkページ用・全文HTML版」セクションのHTMLコードブロックだけを検査してください。Cafetalkエディタの制約：(1)<table>タグ禁止 (2)絵文字禁止 (3)各<p>等の要素にline-heightをインライン指定（見出し系<p>やmargin:0の1行<p>は例外可） (4)URL内の&は&amp;にエスケープ (5)濃い背景色は使わない（明背景のみ） (6)タグの開閉対応が正しいこと（<div>と</div>、<p>と</p>の対応）。違反箇所を挙げてください。問題なければ issues は空配列。`, { label: 'verify:Cafetalk制約', phase: 'Verify', schema: SCHEMA }),
])
return { lenses: results.filter(Boolean) }