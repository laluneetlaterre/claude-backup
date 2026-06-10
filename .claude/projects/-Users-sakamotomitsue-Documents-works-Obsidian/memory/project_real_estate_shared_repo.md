---
name: project-real-estate-shared-repo
description: "03_stock/01_real-estate は Ben と共有する独立 git リポジトリ（github: laluneetlaterre/real-estate）。backup-all で同期。"
metadata: 
  node_type: memory
  type: project
  originSessionId: 172b76bd-3d1c-479a-80b7-239d70824c54
---

`03_stock/01_real-estate/` は独立した git リポジトリ（GitHub: `laluneetlaterre/real-estate`, private）。大元 obsidian Vault からは `.gitignore` 済み（二重管理防止）で、**ここが不動産フォルダの唯一の管理元**。共同経営者 **Ben** と共有するため 2026-06-06 に構築。

- **中の構成**: `perfavore-bldg/`（旧 `Perfavoreビル`）。将来 自宅管理 等のサブフォルダを追加予定。`.obsidian/` はリポジトリ側 .gitignore で除外（PCごとの設定衝突防止）。
- **同期**: [[feedback-handoff-rotation-by-codex]] とは別系統。`backup-all` スキルに組み込み済み（real-estate だけは `pull --rebase` → push）。「全部バックアップして」で Miey の編集が GitHub に上がり、Ben は **GitHub Desktop の Pull origin** で受け取る。
- **Ben 側**: GitHub Desktop（Intel Mac 2019）でクローン → Obsidian で**別 Vault として**開く（Documents/GitHub/real-estate）。閲覧から開始、徐々に編集参加。Ben は collaborator 追加済み。
- **タイムライン.base**: Vault ルート違いに両対応（`file.inFolder` を OR 化：`03_stock/01_real-estate/perfavore-bldg/log` と `perfavore-bldg/log`）。Miey の大元 Vault でも Ben のクローンでも表示される。
- **git push 許可**: `~/.claude/settings.json` の deny にあった `Bash(git push *)` を削除 + allow に push/pull/fetch 追加 + `sandbox.network.allowedDomains` に `github.com` を追加。これで司令塔から push が弾かれない（以前は毎回 denied になっていた）。
