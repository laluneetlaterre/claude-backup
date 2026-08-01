---
name: project_vertex_claude_code_fallback
description: Claude Code の週次リミット時フォールバックを Vertex AI（Googleクレジット）経由で動かす設定。2026-06-10 時点でクォータ承認待ち（却下）→ 6/12 以降に再申請して再開。
metadata: 
  node_type: memory
  type: project
  originSessionId: 6ed4b4c7-fd22-4e8e-a8be-6b6856311488
  modified: 2026-08-01T13:40:15.488Z
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

**2026-06-14 設定完了・動作未確認**

~/.zshrc に以下を追記済み（Miey が手動で貼った）：
```
export ANTHROPIC_VERTEX_PROJECT_ID=project-81ab5c8d-a78a-460b-9d5
export CLOUD_ML_REGION=us-east5
export CLAUDE_CODE_USE_VERTEX=1
```
gcloud auth application-default login も完了。

⚠️ `/doctor` では引き続き `First-party provider (api.anthropic.com)` と表示されるが、これは OAuth 状態を反映するだけで Vertex 切替とは無関係。表示は変わらない仕様。

**実際に動いているかの確認方法**：Claude Proのクレジットが切れたタイミングで claude を起動 → 動けば Vertex 経由。Google Cloud Console「お支払い → 費用内訳」にコストが出ればVertex経由の証拠。

**クォータ申請の状況**：`anthropic-claude-opus-4-7` の US multi-region 入力トークン（100,000）申請は却下済み（新規プロジェクト/請求履歴浅いが理由）。クォータゼロでも実際に動く可能性あり（デフォルト枠）→ まず試してから再申請を判断する。

**次のアクション**：Claude Pro クレジット切れ時に `claude` を起動して試す。エラーが出たら内容を確認して対処。

**2026-08-01 現況：Vertex は事実上休眠。提案時は前提にしないこと**
- `~/.zshrc` の global export は撤去され、代わりに `unset CLAUDE_CODE_USE_VERTEX` 等が入っている。**素の `claude` は Vertex を通らない**（＝First-party）。Vertex を通るのは `c` / `w` / `cdcl` エイリアス内だけ。
- Miey 談「c エイリアスは近頃使ってない、削除していい」→ `alias c=` は削除方針。`w` / `cdcl` は未確認。
- **Remote Control（`claude remote-control`）は Vertex / Bedrock / Foundry では動かない**（Pro/Max/Team/Enterprise のサブスク認証のみ・APIキー不可）。Vertex エイリアス経由で起動すると使えないので注意。

**ルール整合**：これは「別ツールで埋める」ではなく**同じ Claude Code・同じ Opus のまま課金経路だけ Vertex に切替＝司令塔は維持**される運用。なお [[tool_operation_policy]] の旧「クレジット切れを別ツールで埋める禁止」条項は 2026-06-10 Miey 指示で削除済み。
