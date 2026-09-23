---
name: feedback-no-callout-for-glance-tables
description: 毎回見る短い要約表を折りたたみcalloutに入れない（編集モードで生ソースになりモバイルで読めない）
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e2e999f3-a98d-474b-9d61-1772e0c18822
  modified: 2026-09-03T06:44:51.358Z
---

Obsidian で **Miey が毎回見る短い要約表（日別合計・旅行集計など）は、折りたたみ callout（`> [!example]-` 等）に入れない**。素の見出し＋表で置く。長い明細リストの折りたたみは従来どおり callout でよい。

**Why:** callout は編集モードでカーソルが入ると**ブロック全体が `> [!example]- …` の生ソース表示に戻る**。Miey はスマホの Obsidian で編集モードのまま見ることが多く、要約が `>` と `|` の羅列になって読めない（2026-09-03 指摘・cashbook の旅行ブロックで発生）。素の表なら崩れるのはカーソルのある1行だけ。

**How to apply:** 生成スクリプト等で表を出すときは、要約＝素の見出し＋表／明細＝callout で折りたたみ、と切り分ける。既存の callout を一括で剥がす必要はない（明細は折りたためた方が便利）。関連：[[feedback-obsidian-code-block-one-click-copy]]
