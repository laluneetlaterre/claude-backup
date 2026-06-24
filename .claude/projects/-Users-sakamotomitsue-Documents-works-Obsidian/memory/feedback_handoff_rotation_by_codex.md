---
name: feedback-handoff-rotation-by-codex
description: handoff（AI参謀会議.md）のローテーションは VSCode 司令塔・Codex が書き込み前に rotate_handoff.py で実施。Gemini は担当外（追記のみ）
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9f530f67-6d56-43e1-ad5a-b4f6bd52e082
---

`ai-handoff/AI参謀会議.md` のローテーション（本日以外のエントリの `archive/YYYY-MM.md` への切り出し）は、**VSCode 司令塔・Codex が、新規エントリを積む「前」に実施する**標準手順。スクリプト `ai-handoff/rotate_handoff.py` を実行して機械的に行う。**Gemini は rotation を担当しない（handoff への追記のみ可）。**

**Why:** 2026-06-19 Miey 指示で改訂。Gemini を rotation 担当から外した。理由：起動時の多段機械手順（script 実行 → archive 切り出し）が、長文・複雑タスク時に Gemini をループさせる誘発要因と疑われた（Codex 報告・handoff 2026-06-19、タイミング一致で切り分け中）。「Gemini がやらなくても誰か（司令塔・Codex）がやれる＝結果は同じ」ため完全に担当から外した。
※経緯：2026-06-01〜 Codex 専任 → 2026-06-18（master v0.22）司令塔・Codex・Gemini 共通に拡大 → 2026-06-19 Gemini を除外し司令塔・Codex に集約。

**How to apply:**
- handoff に新エントリを積む前に：① `python3 ~/Documents/works/obsidian/ai-handoff/rotate_handoff.py --dry-run` で確認 → ② 本番実行 → ③ AI参謀会議.md 最上部に新規エントリ追記
- スクリプトは今日基準で昨日以前の見出しを `archive/YYYY-MM.md` 先頭へ移動、本日分＋「過去ログ → archive/ 参照」1行だけ残す。本日分しかなければ「不要」と表示して何もしない
- 過去エントリの本文は書き換えず移動のみ。月をまたぐ場合は該当月 archive に振り分け（スクリプトが自動）
- 追記後、チャット欄に「📬 handoff に記録 → from <自分> to: <相手>」の 1 行通知（master §2 trigger 運用）
- 詳細・書式は `ai-handoff/README.md`「handoff 書き込み前の標準手順」、上位ルールは master §2
- 関連メモリ：[[feedback_clippings_ingested_after_done]]
