---
name: feedback-clippings-ingested-after-done
description: clippings ファイルの ingest が完了し話が一段落したら、自動で clippings/ingested/ に移動する運用
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9f530f67-6d56-43e1-ad5a-b4f6bd52e082
---

clippings 配下のファイルを wiki/sources/ 等に ingest した後、その話題に関する会話が一段落したら、Miey の追加指示を待たずに **clippings/ingested/ への移動 + 両側 frontmatter 更新 + log 追記**をセットで自動実行する。

**Why:** Miey 指示（2026-06-01）。ingest 済みと未処理の clippings を物理的に分けて Vault の見通しを保つため。Miey が毎回「移動して」と言わなくても済む運用に格上げする方針。

**How to apply:**
- トリガー：clippings ファイルを参照して wiki/sources/ や wiki/concepts/ 等を新規作成または更新した後、Miey とその素材についての会話が一段落したタイミング（次の話題に移った瞬間や Phase 完了時など）
- 操作セット（master §1 Rule 1.1 範囲内・司令塔は適用 AI に含まれる）：
  1. `mv "clippings/<file>.md" "clippings/ingested/<file>.md"`
  2. ingested 側 frontmatter に `wiki-source: "[[wiki/sources/<ingest先>]]"` と `ingested: <YYYY-MM-DD>` を追記
  3. wiki/sources 側 frontmatter の `source` パスを `[[clippings/ingested/<file>]]` に更新
  4. wiki/log.md の該当 ingest エントリに「clipping: ...→ ingested に移動」の 1 行追記（既存エントリへの追記でも、新規 entry でも OK）
- 5 ファイル以上をまたぐ場合は Rule 3 で Miey GO を別途取得
- 関連メモリ：[[feedback_obsidian_construction_naming]] 級の「言われなくても自動でやる」運用習慣の 1 つ
