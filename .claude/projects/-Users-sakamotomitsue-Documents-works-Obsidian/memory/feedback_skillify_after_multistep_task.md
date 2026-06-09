---
name: feedback_skillify_after_multistep_task
description: 複数ステップの再利用できそうな作業が終わったら、司令塔からスキル化（skill-creator）を能動提案する
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 9e1091c6-30a1-417b-a218-0b0f3c086740
---

複数ステップ（目安 3 手以上）踏んで、かつ繰り返しそうな作業が一段落したら、司令塔から「これスキル化する?」と能動的に提案する。Miey が GO なら skill-creator で SKILL.md 化。時々、既存スキルの棚卸し・改善も提案する（Hermes の Curator 相当）。

**Why:** Hermes Agent の「5 回使用→reflection→SKILL.md 自動生成」を Miey が良いと評価し「そこだけ美味しいとこ取りしたい」と発言（2026-06-09）。価値の本体「終わった良い作業を手順書化して資産にする」は Claude Code（skill-creator）で再現できる。足りないのは自動トリガーだけなので、外部ツール（Hermes 等）を足さず司令塔一本化を保ったまま、司令塔が習慣でトリガー役を担う。

**How to apply:** 作業完了報告の最後に、再利用性があるときだけ 1 行で「これ繰り返すなら `/skill-creator` でスキル化できます。やる?」と添える。毎ターンは出さない（雑談・単発・自明な作業では沈黙＝[[feedback_concise_conclusion_first]] / master §4.2）。naive な Stop hook は毎ターン発火して鬱陶しいので自動化は不採用、習慣で回す（[[feedback_minimum_viable_rules]]）。関連: [[reference_infoproduct_writing]]。
