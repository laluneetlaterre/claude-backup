---
name: reference-china-povo-for-claude-code
description: 中国滞在中に Claude Code が使えるのは povo 回線。もう1枚の日本SIM（VPN付き）では読み込めない
metadata: 
  node_type: memory
  type: reference
  originSessionId: eaf4d06c-4665-4c5d-a10c-0931c88d36a4
  modified: 2026-09-08T10:37:04.376Z
---

中国本土にいる間、Claude Code が動くのは **povo 2.0 のローミング**（日本の網を経由する）。Miey が持つ**もう1枚の日本のSIM は VPN 付きでもダメ**で、ウェブ閲覧はできるのに Claude Code だけ読み込めない（2026-09-08 広州で実測）。原因は未特定だが、長時間つなぎっぱなしのストリーミング接続だけが通らない挙動。

**How to apply:** 中国滞在中に「読み込めない」「落ちた」と言われたら、まず**データ回線が povo か**を確認する。SIM を切り替えた直後なら **VPN を OFF→ON → `claude --continue`**。会話ログは端末（`~/.claude/projects/`）に残るので消えていないと伝えて安心させる。次の渡航先（深圳・香港ほか）でも同じ確認を先に出す → [[feedback-brief-travel-deals-in-advance]]。正本は vault の [travel/china/internet.md](../../../../Documents/works/obsidian/03_stock/travel/china/internet.md)。
