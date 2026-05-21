---
name: backup-all
description: |
  ユーザーが「全部バックアップして」「バックアップして」「backup all」「全バックアップ」と入力したら実行する。
  obsidian / lune / claude_backup の3つの git リポジトリを一括で commit & push する。
  claude_backup には事前に ~/.claude/ ~/.cursor/rules/ ~/.gemini/GEMINI.md を rsync でミラーする。
  push 前に機微情報チェックを行い、引っかかれば Miey に確認してから進める。
---

# 全バックアップスキル（/backup-all）

## 何をするか

Miey の作業環境を構成する3つの git リポジトリを一括で GitHub に保存する。

| リポジトリ | パス | GitHub | 中身 |
|---|---|---|---|
| obsidian | `~/Documents/works/obsidian/` | `laluneetlaterre/obsidian` | Obsidian Vault 全部 |
| lune | `~/Documents/works/lune/` | `laluneetlaterre/lune` | lune 仮想経営チーム |
| claude_backup | `~/claude_backup/` | `laluneetlaterre/claude-backup` | `~/.claude/` `~/.cursor/rules/` `~/.gemini/GEMINI.md` のミラー |

## トリガー

以下のいずれかを Miey が入力したら、このスキルを即実行する：
- `全部バックアップして`
- `バックアップして`
- `backup all`
- `全バックアップ`

## 実行フロー

### ステップ 1: claude_backup を最新化（rsync でミラー）

```bash
cd ~/claude_backup
rsync -av --exclude='.git' \
  --exclude='sessions/' --exclude='projects/*/sessions/' --exclude='cache/' --exclude='paste-cache/' \
  --exclude='file-history/' --exclude='shell-snapshots/' --exclude='statsig/' --exclude='ide/' \
  --exclude='todos/' --exclude='scheduled-tasks/' --exclude='session-env/' --exclude='debug/' \
  --exclude='downloads/' --exclude='history.jsonl' --exclude='backups/' --exclude='.claude.json' \
  --exclude='plugins/cache/' --exclude='plugins/marketplaces/' --exclude='plugins/install-counts-cache.json' \
  --exclude='projects/*/subagents/' --exclude='projects/*/tool-results/' --exclude='projects/*/*.jsonl' \
  --exclude='projects/*/*/subagents/' --exclude='projects/*/*/tool-results/' \
  ~/.claude/ ./.claude/
rsync -av --delete ~/.cursor/rules/ ./.cursor/rules/
rsync -av ~/.gemini/GEMINI.md ./.gemini/GEMINI.md
```

### ステップ 2: 3 リポジトリそれぞれで status 確認＋機微情報チェック

各リポで：

```bash
cd <リポジトリパス>
git add -A
git status --short
git diff --cached --name-only | grep -iE "token|secret|password|credential|\.env$|api[_-]?key" || echo "なし"
```

**機微情報が見つかったら、push せず Miey に確認**：
「○○というファイルが機微情報候補として検出されました。中身を確認しますか? それともこのまま進めますか?」

### ステップ 3: commit & push

各リポで（機微情報チェックでクリアなら）：

```bash
cd <リポジトリパス>
git commit -m "Backup: $(date '+%Y-%m-%d %H:%M')"
git push
```

ブランチに上流が無いと言われたら（lune などで初回）：

```bash
git push --set-upstream origin <ブランチ名>
```

### ステップ 4: Miey に結果報告

3 リポジトリの commit ハッシュ・変更ファイル数・push の成否を1画面で簡潔にまとめる。エラーがあれば最初に書く。

## 重要な注意事項

### 機微情報パターン（検出して止まる）

ファイル名に以下が含まれていたら、push 前に Miey 確認：
- `token` / `secret` / `password` / `credential` / `.env` / `api_key` / `api-key`

ファイルの中身に以下のパターンがあれば、push 前に Miey 確認：
- `AIza[A-Za-z0-9_-]{35}`（Google API キー）
- `sk-[A-Za-z0-9]{20,}`（OpenAI / Anthropic API キー）
- `ghp_[A-Za-z0-9]{36}`（GitHub Personal Access Token）

### やってはいけないこと

- **機微情報チェックを飛ばさない**。鬱陶しくても毎回やる。
- **push 前に確認を取らずに機微情報を push しない**。一度上げると履歴に残る。
- **claude_backup の rsync で `--delete` を `.claude/` に使わない**。`.gitignore` で除外してる範囲が rsync で復活する事故が起きうるため、`.claude/` は `--delete` なし、`.cursor/rules/` だけ `--delete` あり。
- **無関係なファイルをまとめない**：もし working tree が大きく荒れていたら、Miey に「これも一緒にコミットしますか?」と聞いてから進める。

### 撤退条件

途中で何か失敗したら：
- commit はしたが push してない → そのまま放置（次回再実行で大丈夫）
- push もしたが内容に問題 → `git revert <commit>` で打ち消し commit → push（履歴は残るが現状は戻る）
- 機微情報を push しちゃった → **即 Miey に報告**。該当キー/トークンの無効化を最優先で。

## 過去事例

- 2026-05-13: 初回フル実行。obsidian は dirty が 200 ファイル分溜まっていたので、`.gitignore` 新設＋ untrack ＋ commit ＋ push を一気にやった。lune は上流ブランチ未設定だったので `--set-upstream` 必要。Nano Banana API キーが過去 commit に含まれていることが発覚（Google 側で既に無効化済みなので追加対応なし）。
