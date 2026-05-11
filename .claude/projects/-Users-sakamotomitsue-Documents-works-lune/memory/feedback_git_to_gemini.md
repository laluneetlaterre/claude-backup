---
name: Git作業はGeminiに振る
description: lune の Git 操作（status/add/commit/push）は Claude ではなく Gemini が担当する分業ルール
type: feedback
originSessionId: 850847a0-41ed-44e7-b250-47a9e2de089d
---
lune の Git 操作（バックアップ・コミット・プッシュ）は **Gemini が担当する**。Claude は原則 Git 作業をしない。

**Why:** Git 作業は判断を伴わない単純作業なので、Claude のクレジットを使うのは無駄。Gemini で十分こなせる。Mieyのクレジット節約方針。

**How to apply:**
- Miey が「コミットして」「バックアップ」「git作業」等と言ったら、Claude は実行せず「Geminiさんに振りますね」と促す
- Gemini 側の手順は `GEMINI.md` の「Git 作業モード」セクションに明記済み（外科的編集の鉄則を継承）
- ただし Miey が明示的に「Claudeでgitやって」と指示した場合は Claude が実行する（例外）
- diary の自動チェック後やフェーズ完了時にコミット推奨を出す場合も、実行は Gemini に振る前提で「コミットしときます？（Geminiに）」と提案する
