---
name: feedback-generated-images-save-path
description: AI が生成した画像の保存先は Obsidian の 01_attachments/ 固定。Downloads や wiki/ には置かない
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 48b0e6f0-c7f3-4fd8-9648-ecd48d7e2f61
---

AI（nano-banana / Vertex AI Imagen など）で生成した画像は、特に指定がない限り `/Users/sakamotomitsue/Documents/works/obsidian/01_attachments/` に保存する。

**Why:** Miey は生成画像を X 投稿・note・教材で使うため、Obsidian Vault 内で一元管理したい。Downloads に散らばると後で探せない・Obsidian 内のノートから参照できない。

**How to apply:**
- `saveToPath` には `/Users/sakamotomitsue/Documents/works/obsidian/01_attachments/<kebab-case-filename>.png` を指定
- フォルダ名は `01_attachments`（アンダースコア・スペース無し）。古い `01 attachments` フォルダは削除済みなので使わない
- ファイル名はケバブケース＋内容がわかる名前（例：`claude-code-bookmark-before-after.png`）
- Rule 1 で `01_attachments/` は本来「要許可」だが、画像保存目的に限り Miey から包括許可済み（2026-05-27）
- 別の保存先を指定された場合はその指示を優先

関連: [[user_role]]
