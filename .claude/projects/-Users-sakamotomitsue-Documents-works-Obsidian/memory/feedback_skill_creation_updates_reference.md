---
name: feedback_skill_creation_updates_reference
description: 新しいスキルを作ったら ai-skills-reference.md（自作スキル一覧の唯一の正）に必ず追記する
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 7c8229e5-95fb-4bf3-b39d-a95cba15fd0d
---

新しいスキル（`~/.claude/skills/<name>/SKILL.md`）を作ったら、`wiki/outputs/ai-skills-reference.md` に必ず追記する。これが自作スキル一覧の**唯一の正**。

**Why:** 以前は早見表（ai-skills-reference）と詳細版（`wiki/reference/claude-code-tools.md`）の両方に自作スキルを二重記載していて、Miey が「二重管理が大変、マージできない？」と指摘。2026-06-20 に「重複だけ一本化」を採用＝自作スキル一覧は早見表に集約、claude-code-tools.md 側はそこを参照するだけにした（MCPツール・システム/プラグインスキルの静的インベントリは claude-code-tools に残す）。

**How to apply:**
- スキル作成後、`ai-skills-reference.md` のセクション1（スラッシュ系・直接呼ぶスキル）等に1行追記し、frontmatter `updated:` を当日に更新する。
- `claude-code-tools.md` は触らなくてよい（自作スキル欄は早見表へのリンクのみ）。MCPサーバー追加/削除や、システム・プラグインスキルが変わったときだけ claude-code-tools を更新する。
- メンテメモにある通り、教材 [[拡張編_Obsidian_Skillsパック_v0]] への反映は「お客様向けの汎用スキル」を追加したときだけ検討。Miey 個人用ツール（物販発送ナビ等）は教材反映不要。
- 関連：物販発送スキル [[project_auction_shipping_skills]]
