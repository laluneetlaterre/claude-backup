---
name: read-provided-paths-first
description: Mieyがメッセージにパス・ファイルを添えたら、回答前に必ずそれを読む
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ff4645d7-df8b-4dd5-9d9c-b2cc7f222a94
  modified: 2026-07-21T14:53:41.429Z
---

Mieyが依頼文にファイルパスやフォルダパスを添えているときは、それは「これを前提に考えて」という指示。回答・提案を組み立てる**前に**必ず読む。

**Why:** 2026-07-21、かよさま対応で商品フォルダのパス（Obsidian構築商品）を渡されていたのに読まず、モニター8万円・正規12〜15万円で設計済みの商品を3万円で切り売りする提案をした。「きちんとパスも渡しているのに読み取りもせずに答えている」とMieyから指摘。

**How to apply:** パスが含まれる依頼では、最初のツール呼び出しでそのパスを Read/ls してから方針を出す。複数パスがあれば全部。関連: [[show-context-before-asking]]
