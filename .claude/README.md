# ~/.claude/ ディレクトリ構成

このフォルダは **Claude Code のユーザースコープ設定・データストア**（Anthropic 公式仕様）。
**全プロジェクトに横断適用される、ユーザー個人単位の設定・指示・データ**を置く場所。

> User scope is best for:
> - Personal preferences you want everywhere (themes, editor settings)
> - **Tools and plugins you use across all projects**
> - API keys and authentication
>
> — [Claude Code: Settings](https://code.claude.com/docs/en/settings)

最終更新：2026-06-01

---

## Anthropic 公式が想定する中身

| パス | 役割 |
|---|---|
| `CLAUDE.md` | **user-level memory/instructions**（全プロジェクト共通のルール・指示） |
| `settings.json` / `settings.local.json` | user-level settings（権限・hooks・モデル等） |
| `mcp.json` | MCP サーバー設定 |
| `skills/` | **user-level skills**（全プロジェクトで使える個人スキル一式） |
| `scheduled-tasks/` | リモート cron が読む skill キャッシュ |
| `projects/<project>/memory/` | プロジェクト別 auto memory（`MEMORY.md` 等） |
| `.claude.json` / `backups/` | OAuth / MCP 設定 / 状態キャッシュ（Claude Code が自動管理） |

## このマシンの現状

### user-level スキル（`skills/`）
- `backup-all` ← obsidian / lune / claude_backup の3リポジトリを一括 commit & push
- `vault-stash` ← Obsidian Vault への保存先判定スキル
- ※ `daily-tech-news-email` は退避中（`_archive/` 参照）

### リモート cron 用キャッシュ（`scheduled-tasks/`）
- `daily-tech-news-email` ← **毎朝6時に自動メール送信**（Gmail 下書き作成）

### Miey が置いた個別ファイル
- `obsidian.code-workspace` ← VS Code ワークスペース定義
- `_archive/` ← 退避物
  - `skills_daily-tech-news-email_2026-05-31/` ← 手動 `/news` 用本体（2026-05-31 退避）

### Claude Code が自動生成・原則触らない
`projects/` `cache/` `sessions/` `shell-snapshots/` `paste-cache/` `file-history/` `plans/` `debug/` `downloads/` `ide/` `session-env/` `plugins/` `backups/` `history.jsonl`

---

## 主要な真実の源

- **master ルール**：`~/.claude/CLAUDE.md`（このフォルダの中で最も重要）
- **同期コピー先**：`~/.gemini/GEMINI.md` ／ `~/Documents/works/obsidian/AGENTS.md`
- **memory**：`~/.claude/projects/-Users-sakamotomitsue-Documents-works-obsidian/memory/MEMORY.md`

## 廃止履歴

- 2026-06-01：`backup.sh` + `backup.log`（毎日17時 cron）を削除。`skills/backup-all/` が代替。
- 2026-05-31：`daily-tech-news-email` skill を `_archive/` に退避（毎朝6時メールは `scheduled-tasks/` 側が発火源と確定したため）。

## 参考

- [Claude Code: Settings (User scope vs Project scope)](https://code.claude.com/docs/en/settings)
- [Claude Code: How Claude remembers your project](https://code.claude.com/docs/en/memory)
