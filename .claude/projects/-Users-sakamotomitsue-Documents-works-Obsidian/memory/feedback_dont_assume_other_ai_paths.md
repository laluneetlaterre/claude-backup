---
name: feedback_dont_assume_other_ai_paths
description: 他AI（Codex/Gemini）がどこを読む・どう動くかを推測で断定しない。本人にMCPかhandoffで確認する
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7c8229e5-95fb-4bf3-b39d-a95cba15fd0d
---

Codex や Gemini が「スキル/設定/メモリをどこから読むか・どう発動するか」を、司令塔がファイル構成の観察だけで推測して断定しない。**必ず本人に確認する**（Codex は `mcp__codex__codex` MCP で直接質問、Gemini は MCP が無いので handoff 経由で Miey に中継してもらう）。

**Why:** 司令塔は別ツールの内部挙動を直接観測できない。`~/.codex/skills/` にファイルがあっても、Codex が実際にそこをロードしているとは限らない（別パス・別形式・要登録の可能性）。過去（〜2026-06-19 頃）、司令塔が「これで Codex も Gemini もスキルが使える」と思い込んだが、実際には Codex は別の場所を読んでいた、という取り違えが発生。Miey から「本人に聞かないと本当のところは分からない」と指摘された。

**How to apply:**
- 他ツールの skill/config/memory のパス・発動条件・対応形式を結論づける前に、本人に聞く。
- Codex：`mcp__codex__codex` で「どのディレクトリからスキルを発見・ロードするか／自動か登録要か／対応フォーマット／今ロード中のスキル一覧」を質問。
- Gemini：直接呼べる MCP が無い → handoff（`ai-handoff/AI参謀会議.md`）に質問を書き、Miey に中継依頼。
- 観察（ファイルがある等）は「仮説」止まりにし、本人確認で「事実」に格上げしてから Miey に報告する（master §4：未確認を確実と言わない）。
- 関連：[[feedback_skill_creation_updates_reference]]（スキル一覧の単一ソース化）
