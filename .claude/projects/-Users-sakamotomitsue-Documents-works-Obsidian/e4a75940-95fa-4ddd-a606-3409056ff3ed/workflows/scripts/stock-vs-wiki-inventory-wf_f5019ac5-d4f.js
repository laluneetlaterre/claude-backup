export const meta = {
  name: 'stock-vs-wiki-inventory',
  description: '03_stock/02_IT_AIツール と wiki/ の実態棚卸しと重複検出（読み取り専用）',
  phases: [
    { title: 'Inventory', detail: '両エリアを並行棚卸し＋重複検出' },
  ],
}

const STOCK_SCHEMA = {
  type: 'object',
  properties: {
    topLevel: { type: 'array', items: { type: 'object', properties: {
      folder: { type: 'string' }, mdCount: { type: 'number' }, theme: { type: 'string' }
    }, required: ['folder', 'mdCount', 'theme'] } },
    itFiles: { type: 'array', items: { type: 'object', properties: {
      path: { type: 'string' },
      gist: { type: 'string' },
      sourceUrl: { type: 'string' },
      nature: { type: 'string', enum: ['howto-tips', 'digested-knowledge', 'raw-clip', 'project-material', 'other'] }
    }, required: ['path', 'gist', 'nature'] } }
  },
  required: ['topLevel', 'itFiles']
}

const WIKI_SCHEMA = {
  type: 'object',
  properties: {
    sections: { type: 'array', items: { type: 'object', properties: {
      section: { type: 'string' }, pageCount: { type: 'number' },
      pages: { type: 'array', items: { type: 'string' } }
    }, required: ['section', 'pageCount'] } },
    sourceUrls: { type: 'array', items: { type: 'object', properties: {
      page: { type: 'string' }, url: { type: 'string' }
    }, required: ['page', 'url'] } },
    boundaryCandidates: { type: 'array', items: { type: 'object', properties: {
      page: { type: 'string' }, reason: { type: 'string' }
    }, required: ['page', 'reason'] } }
  },
  required: ['sections', 'sourceUrls', 'boundaryCandidates']
}

const DUPE_SCHEMA = {
  type: 'object',
  properties: {
    overlaps: { type: 'array', items: { type: 'object', properties: {
      topic: { type: 'string' },
      stockPath: { type: 'string' },
      wikiPath: { type: 'string' },
      relation: { type: 'string', enum: ['duplicate-summary', 'different-angle', 'stock-is-raw-wiki-is-digest', 'unclear'] },
      note: { type: 'string' }
    }, required: ['topic', 'stockPath', 'wikiPath', 'relation', 'note'] } }
  },
  required: ['overlaps']
}

phase('Inventory')
const [stock, wiki, dupes] = await parallel([
  () => agent(`読み取り専用の棚卸しタスク。ファイルの編集・作成・移動は一切禁止。

対象Vault: /Users/sakamotomitsue/Documents/works/obsidian/

1. 03_stock/ の直下エントリを列挙し、各サブフォルダの .md ファイル数と、フォルダ名から分かるテーマを1行で。
2. 03_stock/02_IT_AIツール/ 配下の全 .md（再帰）について、各ファイル:
   - path（03_stock/ からの相対パス）
   - gist（冒頭30行程度を読んで1行要約・日本語）
   - sourceUrl（frontmatter や冒頭に元記事URLがあれば。無ければ省略）
   - nature の分類:
     * howto-tips = Mieyが作業中に開いて使う手順・TIPS
     * digested-knowledge = 消化済みの知識・解説（本来wiki向きに見えるもの）
     * raw-clip = ほぼ生の貼り付け・クリップ
     * project-material = 進行中の案件・プロジェクト資料
     * other
ファイル数が多い場合も全件返す。`, {label: 'inv:03_stock', phase: 'Inventory', effort: 'low', schema: STOCK_SCHEMA}),

  () => agent(`読み取り専用の棚卸しタスク。ファイルの編集・作成・移動は一切禁止。

対象: /Users/sakamotomitsue/Documents/works/obsidian/wiki/

1. wiki/index.md を全部読み、セクション（entities/concepts/sources/syntheses/reference/outputs）ごとにページ数とページ名一覧を返す。
2. grep で wiki/sources/*.md の frontmatter から source-url を全件抽出（page名とurlのペア）。
3. boundaryCandidates: wiki/ 配下で「消化済み知識」というより「実務手順・TIPS・コピペ用プロンプト集」に見えるページ（= 03_stock との境界が曖昧なページ）を index の要約から拾い、理由つきで挙げる。該当ファイルは中身も冒頭50行ほど確認して判断。`, {label: 'inv:wiki', phase: 'Inventory', effort: 'low', schema: WIKI_SCHEMA}),

  () => agent(`読み取り専用の重複検出タスク。ファイルの編集・作成・移動は一切禁止。

対象Vault: /Users/sakamotomitsue/Documents/works/obsidian/

目的: 03_stock/（特に 02_IT_AIツール/ と 03_AIプロンプト/）と wiki/ の間で、同じソース・同じトピックが両方に保存されている「二重保存」を見つける。

方法:
1. 両エリアで grep -o 'https\\?://[^ )"\\]]*' 的にURLを抽出し、同じドメイン+パスが両側に出るものを突き合わせる。
2. ファイル名のトピック語（MiriCanvas, Raycast, Claude Code, Obsidian, プロンプト名など）で両側を突き合わせる。
3. 既知の容疑: konmari-handout.pages.dev/miricanvas/02/ が 03_stock/02_IT_AIツール/MiriCanvas_こんまり整理TIPS.md と wiki/sources/konmari-2026-miricanvas-brand-kit-02.md の両方に出る。両ファイルを実際に読んで relation を判定（同じ要約の二重化か、別角度か、stock側が生でwiki側が消化版か）。
4. 見つけた overlap は全件、両パスと1行の note つきで返す。誤検出（単なる同ツール言及）は除外し、実体の重複だけ。`, {label: 'dupes', phase: 'Inventory', schema: DUPE_SCHEMA}),
])

return { stock, wiki, dupes }