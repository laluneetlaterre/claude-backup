---
name: project_customer_vault_naming_sama
description: obsidian_customer/ 配下のお客様Vaultは「<お客様名>_sama」で命名する（識別子は英字統一、表示のみ日本語「様」）
metadata: 
  node_type: memory
  type: project
  originSessionId: e5f5fe4b-839f-4b0a-ba9c-3a7241457d1c
---

`obsidian_customer/` 配下のお客様Vaultのフォルダ名・ファイル名の識別子は、ローマ字で `<お客様名>_sama`（例：`akiko_sama`）に統一する。`_sama` は敬称「様」のローマ字表記。

**Why:** 2026-07-16、Miey がお客様名に敬称をつけたいと発案。ファイル名は英字前提のため、AI が処理する層（フォルダ名・ファイル名・wikilink・frontmatter・index）は完全一致でブレさせないことを優先し `_sama` に決定。お客様本人が読む見出し・あいさつの地の文だけ日本語で「〇〇様」と表示する使い分け（例：天命の地図の見出しは `── akiko様`、frontmatterの `対象:` は `akiko_sama`）。

**How to apply:**
- 新しいお客様Vaultを作るときは最初から `<名前>_sama/` で作成する。
- 天命の地図・鑑定書ファイル名も `<名前>_sama.md` で統一。
- 地図本文の見出し・あいさつ文など「お客様が読む一行」だけ `<名前>様` の日本語表記にしてよい。frontmatterやリンクパスなど機械が参照する箇所は `_sama` のまま変えない。
- 既存の `原文/` 原本ファイルの中身（本文・frontmatterの `対象:` 等）は編集不要。ファイル名のみ `_sama` に揃える（原本は読むだけの原則を優先。[[feedback_...]] 等の外科的編集ルールと矛盾しない）。
- ルール本体は [README_お客様Vault運用.md](../../../../Documents/works/obsidian_customer/README_お客様Vault運用.md) にも明文化済み（真実の源はそちら、この memory はトリガー用の要約）。
