---
name: reference_google_drive_mcp_binary_upload_workaround
description: Google Drive MCPのcreate_file/update_fileはbase64経由でしか中身を差し替えられず、画像1枚でも数十万トークン消費して非現実的。ローカル同期フォルダ経由が正解
metadata: 
  node_type: memory
  type: reference
  originSessionId: eca06e65-5e6f-40cf-b6eb-9cceca71b124
  modified: 2026-09-18T13:04:27.616Z
---

Google Drive MCP（`mcp__claude_ai_Google_Drive__*`）の `create_file` / `update_file` はファイル内容の指定が `base64Content`（inline）のみで、ローカルパスからのアップロードに対応していない。

**罠**：base64テキストはClaudeの文脈上でほぼ1文字≒4トークン相当で消費される（実測：97,821文字のbase64が25,000トークンの表示上限で22,393文字しか読めなかった＝約4.1トークン/文字）。なので画像1枚（数十〜数百KB）でも Read/tool-call を素直に通そうとすると数十万トークンかかり非現実的。`download_file_content` も同じ理由で大きめのファイルは一発でエラーになる。

**回避策（2026-09-18 確認済み）**：Google Drive for Desktop がローカル同期されていれば、`~/Library/CloudStorage/GoogleDrive-<メールアドレス>/マイドライブ/...` に実ファイルが存在する。base64を経由せず、Bashで直接そのパスのファイルを読み書き（`cp`、`sips`等）すれば、Desktopクライアントが自動でDriveに同期する。数秒後に `get_file_metadata` の `modifiedTime`/`fileSize` が変わっていれば同期完了。

**関連ツール**：
- 画像の回転：`sips -r <度数> in.jpg` （macOS標準、画質劣化ほぼなし）
- PDFページの回転：`qpdf --rotate=<度数> in.pdf out.pdf` （ページの回転メタデータだけ書き換え、再レンダリングなし＝劣化なし。2026-09-18に `brew install qpdf` で導入済み）
- PDFの中身を目視確認（向きチェック等）：`pdftoppm -jpeg -r 100 in.pdf out-prefix`（poppler、導入済み）→ 出力jpgをReadツールで見る

**How to apply**：Google Drive上のファイル（画像・PDF等）を新規アップロード／内容差し替えする依頼が来たら、まずMCPのbase64経由を試す前に `~/Library/CloudStorage/GoogleDrive-*` にローカル同期フォルダがあるか確認し、ある場合はそちらを優先する。
