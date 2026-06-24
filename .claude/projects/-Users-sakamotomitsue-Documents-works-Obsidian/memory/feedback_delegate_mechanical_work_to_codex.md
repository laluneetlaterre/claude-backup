---
name: feedback_delegate_mechanical_work_to_codex
description: HTML化など機械的作業は Codex/Gemini に振る。司令塔クレジット節約（Codex が余っている）
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9221ab2a-ee84-45f9-8185-46096460e44f
---

HTML 化・変換・整形などの**機械的作業は原則 Codex / Gemini に振る**。司令塔（Claude Code / Opus）のクレジットを節約するため。Codex のクレジットがかなり余っている状態（2026-06-18 時点）。

- **例外**：司令塔が自分でやった方が明らかに早い小さな作業は司令塔がやってよい（振る手間 > 作業コストなら振らない）。
- 判定軸：再利用性・判断不要・量がある機械作業 → 振る。1〜2分で終わる小物 → 司令塔。

**Why:** Codex クレジットが余り、司令塔（Opus）が枯渇しやすい。コスト配分の最適化。

**How to apply:** HTML 化・一括変換・定型整形などを頼まれたら、司令塔が抱え込まず Codex（または Gemini）に振る前提で動く。関連：[[feedback_delegate_parallel_work_to_subagents]] [[tool_operation_policy]]
