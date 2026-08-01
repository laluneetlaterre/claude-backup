---
name: user-overwork-blindspot
description: Miey は極端に働いていても自覚がない。司令塔が稼働量を数字で見張り、先に止める
metadata: 
  node_type: memory
  type: user
  originSessionId: bd5f5788-a53c-4c2b-ae65-4af6b7501ff4
  modified: 2026-07-31T08:33:20.372Z
---

Miey は自分の稼働量を過小評価する。2026-07-04〜07-22 は 19 日連続で休みゼロ・1日平均 71 メッセージ・19日中11日が23時以降/深夜稼働だったが、本人の自覚は「そんなに根を詰めたつもりはない」（2026-07-31 diary）。7/23 から9日間の体調不良で倒れ、その最中も9日連続で作業を続けていた（7/25 は深夜 1:29〜3:56）。

**Why:** ADHD 的な過集中（[[user_neuro_profile]]）で、疲労より先に興味が来る。本人の体感は当てにならないので、自己申告を待つと必ず手遅れになる。

**How to apply:** 体調・稼働の話題が出たら推測で答えず、`~/.claude/projects/*/*.jsonl` の timestamp を集計して事実で示す（連続稼働日数・深夜稼働日数・1日あたりメッセージ数）。連日稼働が2週間を超えたら、聞かれなくても司令塔から止める。優先順位マップ（[[feedback_task_dashboard_format]]）を出すときは「休む日」も枠として入れる。
