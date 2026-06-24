---
name: feedback_handoff_when_seeking_other_angles
description: 司令塔→Codex の handoff は「他角度の意見を参考にしたいとき」だけ。決定通知やFYIでは書かない。Miey が言わない限り handoff の提案・確認も一切しない
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 65b0acca-26ae-4c23-a229-31a07bba4af1
---

司令塔（VSCode Claude Code）から Codex への handoff は、**司令塔が他角度の意見・異論・レビューを参考にしたいときだけ**書く。決定済みの通知・FYI・「処理しました」報告のために handoff を使わない（Codex からの返事も求めない）。

**Why:** Miey 指示（2026-06-05）。決定通知を handoff に積むと薄いエントリで全 AI のコンテキストを汚す（master §4.2 最低限主義）。Codex が司令塔に未決事項を渡しても、司令塔が判断して処理すれば、わざわざ「決めました」と返す必要はない。

**How to apply:** Codex から未決事項を渡されて司令塔判断で処理 → そのまま実行して Miey に報告するだけ。handoff に書くのは、自分の案に Codex の別視点・リスク指摘・代案が欲しいと司令塔が判断したときに限る。

**さらに（2026-06-09 Miey 再指示・厳守）:** handoff について、**Miey が自分から言い出さない限り、司令塔から一切触れない**。「追記しますか?」と聞く・「往復が閉じます」と促す・「Codex に伝えてもらえれば」と付け足す ── これら提案・確認・言及はすべて不要（＝過剰表示、master §4.2）。Miey の沈黙＝handoff には触らない、が正解。返事も求めない。

**受信側の動作（2026-06-13 Miey 再々指示・「何回も伝えてる」）:** Codex から `📬 from Codex to: 司令塔` の通知／エントリを受け取っても、**返信エントリ（司令塔→Codex のまとめ・確定事項・FYI）を書かない**。受信側の正しい動作は「handoff を読む → Miey に短く報告するだけ」。Codex への返信は **Miey が明示的に「返信して」と指示したときだけ**。Miey が返信を求めるときは自分から指示する。受信通知を見て反射的に「まとめを返す」のは典型的な誤り。

関連: [[feedback_handoff_rotation_by_codex]] [[feedback_concise_conclusion_first]]
