---
name: 重いPDFはClaudeで直読みせずGeminiに解析させる
description: ページ数の多いPDFや統計系PDFはClaudeで直接読まず、Geminiで解析して結果を渡す運用にする
type: feedback
originSessionId: 666c2887-0a46-43a5-a6a7-b97b9b78d413
---
重いPDF(生徒統計PDFなど、ページ数の多いもの・図表が多いもの)はClaudeで直接読み込まない。Geminiに解析させ、その結果(テキスト/構造化データ)を受け取って作業する。

**Why:** 2026-05-01、生徒統計PDFをClaudeに読ませた直後、2時間ほどの間に2回フリーズが発生。コンテキスト肥大とVSCode拡張のメモリ圧迫が原因と推定。

**How to apply:**
- ユーザーがPDFを共有してきた場合、ページ数や内容(統計・図表中心か)を確認
- 重そうなPDFなら、こちら側でReadせず「Geminiで解析してもらってください」と提案
- Geminiの解析結果(テキスト/JSON/要約)を受け取ってから作業を進める
- 軽量なPDF(数ページのテキスト中心)は従来通りRead toolで対応可
