---
name: project_vertex_claude_code_fallback
description: Claude Code の週次リミット時フォールバックを Vertex AI（Googleクレジット）経由で動かす設定。2026-06-10 時点でクォータ承認待ち（却下）→ 6/12 以降に再申請して再開。
metadata: 
  node_type: memory
  type: project
  originSessionId: 6ed4b4c7-fd22-4e8e-a8be-6b6856311488
---

Claude Code（サブスク）の**週次リミットで止まった時だけ**、CLI を Vertex AI バックエンドに切り替えて作業継続するための仕組み。動機は Miey が持つ Google クレジット（~40万分）を遊ばせないため。VSCode は常にサブスクのまま、CLI に専用エイリアスを置いて使い分ける（トグル不要）。

**確定済みの構成**
- GCP プロジェクト：`project-81ab5c8d-a78a-460b-9d5`（課金有効・Vertex API 有効）
- リージョン：`us-east5`（クォータは "US multi-region" 枠を消費）
- 認証：gcloud ログイン済み＋ADC 設定済み。**ADC quota project を設定済み**（`gcloud auth application-default set-quota-project project-81ab5c8d-a78a-460b-9d5`）
- Model Garden で有効化済み：Opus 4.8 / Opus 4.7 / Sonnet（+「fable」＝Claude無関係・無視）。有効化は無料、呼んだ分だけ課金
- 動作モデルID（@バージョン不要）：`claude-opus-4-8`、`claude-opus-4-7` 等。スモークテストで**認証・接続は成功確認済み**
- エイリアス案（`~/.zshrc`）。env は**export せずエイリアス内のみ**＝VSCode に影響なし。モデルは起動コマンドで毎回選ぶ：
  - `alias cc-vx-opus='CLAUDE_CODE_USE_VERTEX=1 ANTHROPIC_VERTEX_PROJECT_ID=project-81ab5c8d-a78a-460b-9d5 CLOUD_ML_REGION=us-east5 ANTHROPIC_MODEL=claude-opus-4-7 claude'`
- ⚠️ **`~/.zshrc` の編集は AI 権限でブロックされる**（$HOME 配下は編集不可）→ **Miey が手で貼る**。既存の `gemini-vertex()` の下に追記する想定

**現在のブロッカー（2026-06-10）**
- per-base-model のトークンクォータが **0**。増加申請（opus-4-7 US multi-region 入力10万、ケースID 801e3a05-1b3e-4066-8c8a-a549f7949e58）は**却下**。理由＝新規プロジェクト/請求履歴が浅い。「48h 待って再申請、または請求履歴が貯まるまで待つ」。
- **再開手順**：6/12 以降に同じ申請を再提出（入力＋出力の2本）→ 承認されたら `claude-opus-4-7`／us-east5 で再テスト → VERTEX_OK ならエイリアスを Miey が `~/.zshrc` に貼って完成。
- 裏方モデル懸念：Claude Code は雑用に Haiku を使う場合あり。Vertex に Haiku が無いので、対話運用でエラーが出たら小型モデル env を有効モデルに向ける対応が要るかも（未検証）。

**ルール整合**：これは「別ツールで埋める」ではなく**同じ Claude Code・同じ Opus のまま課金経路だけ Vertex に切替＝司令塔は維持**される運用。なお [[tool_operation_policy]] の旧「クレジット切れを別ツールで埋める禁止」条項は 2026-06-10 Miey 指示で削除済み。
