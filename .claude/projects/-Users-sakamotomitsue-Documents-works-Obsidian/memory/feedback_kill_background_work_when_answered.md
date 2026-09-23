---
name: feedback_kill_background_work_when_answered
description: 背景調査は答えが出た時点で即止める。画面を見れば分かる問いには起動しない
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a291a9de-a6fd-4eaf-a3f4-1df333e2c4bf
  modified: 2026-08-16T03:35:46.253Z
---

背景で走らせた調査・ワークフロー・エージェントは、**その問いが別経路で解決した瞬間に TaskStop で止める**。また、**Miey が画面を見れば即座に確認できる類の問いには、そもそも調査を起動しない**。

**Why:** 2026-08-16、eBay 出品の取り下げ可否を調べるワークフローを起動したが、Miey が `End listing` の確認ダイアログを出した時点で「できる」と答えが出て、その後実際に取り下げも完了した。それでも止めず、**486万トークンを消費してセッション上限に到達**させた。Miey から「クレジットの無駄だからそういうことはやめて」と明示指摘。さらに成果物も、最終レポートが上限で出力されず、66件の findings のうち39件が自前の検証で否定されるという低品質だった。同日の他2本のワークフローも同様にセッション上限で synthesize が落ちている。

**How to apply:** 背景タスクを起動したら、**毎ターン「この答えはもう出ていないか」を確認**し、出ていたら即 TaskStop。判断が Miey の操作で確定する種類の問い（管理画面のボタンが押せるか、設定値が入るか等）は、調査ではなく「画面を見せてください」で解決する。重い並列調査は、実地で確認できず・かつ判断を左右する問いに限る。関連： [[feedback_minimum_viable_rules]]、[[feedback_delegate_mechanical_work_to_codex]]。
