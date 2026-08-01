---
name: reference-notion-mcp-status-filter-unsupported
description: Notion MCP の update_view は status 型プロパティのフィルターを書けない（無言で消える）。手動手順を渡す
metadata: 
  node_type: memory
  type: reference
  originSessionId: 4888b901-0b5f-41b0-b631-dd7c76f58de8
  modified: 2026-07-29T22:21:45.311Z
---

Notion MCP（`notion-update-view` の view DSL）は **status 型プロパティのフィルターを設定できない**。`FILTER "ステータス" = "継続中"` / `IN (...)` / `!=` はいずれもエラーを返さず、条件が空のまま保存される（＝既存フィルターを消してノーガードのビューになる）。title・number 等の他プロパティのフィルターは正常に書ける。

**Why:** 2026-07-30、Notion「スマートサブスク出納帳」でステータス「３ヶ月休止」を追加した Canva が更新セクションから消えた件を MCP で直そうとして、更新セクションの表ビュー4つのフィルターを空にしてしまった（解約済みも表示される状態に）。復元も MCP からはできず Miey の手作業になった。

**How to apply:** status フィルターの変更は最初から MCP でやらず、Notion UI の手順を Miey に渡す。どうしても MCP で触るときは `CLEAR FILTER` を先に打たず、書き込み後に `notion-fetch` で `advancedFilter.filters` が空でないか必ず検証する。ステータス選択肢を増やす運用では、フィルターを「◯◯である」列挙ではなく「解約済み**ではない**」の否定形にしておくと選択肢追加で行が消えない。関連 [[feedback_verify_after_write]]
