---
name: project-x-media-storage-google-drive
description: X等のメディア（動画・大きい画像）は Vault外の Google Drive obsidian-media/ に保存しリンク参照する
metadata: 
  node_type: memory
  type: project
  originSessionId: 650a1d37-1ff2-4d38-8af3-59e6a128fb85
---

X投稿等の保存メディア（動画・容量の大きいファイル）は Obsidian Vault に入れず、**Google Drive デスクトップ同期フォルダ** `~/Library/CloudStorage/GoogleDrive-hydeistpunk10ve@gmail.com/My Drive/obsidian-media/`（＝ `~/Google Drive/My Drive/obsidian-media/`）に保存し、raw の .md からは `file://` 絶対パスのリンクで参照する。

**Why:** Obsidian は backup-all で git push されるため、動画を Vault 内に置くと容量だけでなく git 履歴が永久に肥大化する。Drive ストリーミングモードならローカル容量も食わず、クラウドにも自動バックアップされ「元ツイートが消えても残る」。

**How to apply:**
- 保存先フォルダ：Drive の `obsidian-media/`。リネームは内容が分かる名前＋日付（例 `konmari_GAS投稿管理ダッシュボード_20260627.mp4`）。
- .md には callout でリンク埋め込み：`[🎬 動画を開く](file:///Users/sakamotomitsue/Library/CloudStorage/GoogleDrive-hydeistpunk10ve@gmail.com/My%20Drive/obsidian-media/ファイル名)`（スペースは %20）。Vault外なのでインライン埋め込みは不可・クリックで外部再生になる仕様。
- 私(Claude Code)の bash が Drive に書き込めるのは、VSCode に**フルディスクアクセス**を許可済みだから（2026-06-28 Miey 許可）。許可が外れると `Operation not permitted` で再び書けなくなる。
