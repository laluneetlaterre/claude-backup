---
name: reference-cloud-routine-setup
description: 定期エージェント（/schedule クラウドルーチン）の作り方・届け方・外部サイトを読ませるときのドメイン許可設定
metadata: 
  node_type: memory
  type: reference
  originSessionId: f8df0e31-e2d7-404f-9131-cc362baac3e5
  modified: 2026-08-02T06:47:39.392Z
---

Miey の定期エージェントは **claude.ai のクラウドルーチン**（`/schedule` → RemoteTrigger API）で動く。PC の電源・VSCode の起動と無関係に実行される。

**届け方の既定＝Gmail 下書き**（送信ではなく draft）。稼働中の実例：
- `Daily Tech News Email`（毎朝6:00 JST）
- `今日のスポセン（渋谷区スポーツセンター）`（毎朝6:07 JST・trig_013h95yaeJvFdXcWwqyywPSJ）

**外部サイトを読ませるルーチンには事前にドメイン許可が要る。**
クラウドは既定で「Trusted」＝GitHub・npm・PyPI 等の許可リストのみ。一般サイトは全部ブロックされ、エージェントは「ネットワーク制限によりブロックされました」と書いて止まる。

許可手順（**UI のみ。API からは触れない**）：
claude.ai/code → 入力欄の上の雲アイコン（`Default`）をクリック → メニュー内の環境行にホバー → 歯車 → **ネットワークアクセス＝カスタム** → **許可されたドメイン**に1行ずつ記入 → **「一般的なパッケージマネージャーのデフォルトリストも含める」に必ずチェック**（外すと GitHub 等が全部落ちて他のルーチンが壊れる）→ 保存。反映は次に始まるセッションから。

**設計上の注意**
- クラウドはローカルファイル（`~/.claude/` 等）を見られない。ルーチンが使うデータはプロンプトに直接埋め込むか、git リポジトリに push しておく。
- 画像ベースの PDF はテキスト抽出できない。curl でDL → Read ツールで画像として読解させる。
- ルーチンの**削除は API 不可**。停止は enabled:false、削除は https://claude.ai/code/routines から。
- 時刻指定は cron の UTC。JST 6:00 = `0 21 * * *`（前日）。

関連：[[project_ai_session_log_diary]]
