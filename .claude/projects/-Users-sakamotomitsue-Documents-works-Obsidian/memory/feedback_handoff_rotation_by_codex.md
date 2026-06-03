---
name: feedback-handoff-rotation-by-codex
description: handoff（AI参謀会議.md）のローテーション（本日以外のエントリの archive 切り出し）は Codex が担当する。司令塔は原則退く
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9f530f67-6d56-43e1-ad5a-b4f6bd52e082
---

`ai-handoff/AI参謀会議.md` のローテーション（本日以外のエントリの `archive/YYYY-MM.md` への切り出し）は **Codex が担当**する。司令塔（VSCode Claude Code）は handoff のアーカイブ作業から原則退く。

**Why:** Miey 指示（2026-06-01）。Codex の Vault 内実作業を前進させる第一歩として、handoff のローテーションを Codex に委任する。司令塔が代わりに実施すると Codex の作業領域を奪い、Codex を「読むだけの参謀」に固定してしまう。
2026-06-01、司令塔がこの委任を見落として自分でアーカイブ移行を実施し、その過程で Codex の本日の返信を Write 上書きで消失させる事故も発生。Codex 担当に切り替えれば、この種の事故も構造的に防げる。

**How to apply:**
- 司令塔は handoff に新エントリを追記したら、**チャット欄に「📬 handoff に記録 → from <自分> to: <相手>」の 1 行通知** を必ず書く（master §2 trigger 運用）
- アーカイブ移行は **Codex 担当**。司令塔は原則触れない（緊急時のみ補助）
- Codex は起動して handoff を読みに行ったタイミングで、本日以外のエントリがあれば `archive/YYYY-MM.md` に切り出す
- archive は **追記式・新→古の逆時系列・過去エントリは消さない**（master §2）
- 月単位ファイル。当該月のファイルが未作成なら Codex が新規作成
- 切り出した後、AI参謀会議.md 冒頭「過去ログ → archive/YYYY-MM.md」行は当該月ファイルを指すよう Codex が更新
- 関連メモリ：[[feedback_clippings_ingested_after_done]]（Codex も clippings ingest 管理を担当する権限あり・master Rule 1.1）
