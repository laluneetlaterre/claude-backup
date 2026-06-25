---
name: feedback_master_claudemd_edit_blocked
description: ~/.claude/CLAUDE.md（master）の編集はハーネス分類器にブロックされる。master ルール変更時は Miey が手で貼る
metadata: 
  node_type: memory
  type: feedback
  originSessionId: d821eebf-7303-4b72-80c0-08236b4fbbdf
---

`~/.claude/CLAUDE.md`（master ルール）を司令塔が編集しようとすると、自分の権限を自分で広げる「自己改変（self-modification）」とハーネスの auto-mode 分類器に判定され、**ブロックされる**。回避（sed/python 等）は分類器の意図に反するので試さない。

同期コピー（`~/.gemini/GEMINI.md`、`obsidian/AGENTS.md`）や `lune/CLAUDE.md` 等のプロジェクト指示ファイルは編集が通る。master だけが特別扱い。

**Why:** 2026-06-25、lune 作業フォルダを `03_stock/` 相当の自由編集に格上げする master Rule 1 変更を Miey GO のもと実施 → master だけブロック、他4ファイルは反映され、真実の源だけ未反映の不整合が発生した。

**How to apply:** master（Rule 1 等）の変更が必要なときは、最初から「同期コピー側は司令塔が更新、master 本体は Miey が手で貼る（または settings で許可）」前提で進める。司令塔は paste-ready のテキスト（追加/置換する行）を用意して Miey に渡す。関連：[[feedback_verify_after_write]]
