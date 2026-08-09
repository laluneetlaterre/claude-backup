---
name: reference-notion-mcp-parent-page-hides-db-titles
description: Notion MCP で親ページを fetch するとフルページDBのタイトルが空で返る。無題と誤診断しない
metadata: 
  node_type: memory
  type: reference
  originSessionId: dccee6f7-d106-4623-b234-838e9c4ca001
  modified: 2026-08-05T22:26:32.198Z
---

`notion-fetch` で親ページ（例：🏠 HOME）を取得すると、子のフルページ・データベースが
`<database url="..." inline="false"></database>` とタイトル空で返る。**実際にはタイトルが付いている。**
Notion の画面上では正しく表示される。空に見えるのは MCP のレンダリング上の見え方。

2026-08-06 に HOME 直下の5つのDBを「無題」と誤診断し、リネーム作業を提案してしまった。
個別に `notion-fetch` で DB URL を叩いたら全部タイトルがあった
（植物の土の配合表と育て方／連絡先DB／ロープ・紐結び方／💰 クレジットカード／レストラン）。

**How to apply:** 親ページの一覧でタイトルが空に見えても、そのDBのURLを個別に fetch して
`The title of this Database is: ...` を確認するまで「無題」と言わない。Miey に整理を提案する前に必ず裏を取る。

同じく Notion MCP の挙動の落とし穴として [[reference-notion-mcp-status-filter-unsupported]] も参照。
