---
name: feedback-full-filenames-no-abbreviation
description: ファイル保存・命名・書き出しを指示するときは省略せずフルのファイル名/パスで、手順を1つずつリードする
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4095c177-b9b5-4269-8461-3cf2c3b2b4f6
  modified: 2026-08-13T06:30:38.504Z
---

Miey にファイルの保存・書き出し・命名・移動を指示するときは、**必ず完全なファイル名とフルパスを書く**。`...` や日付プレフィックスの省略（例：`01_comparison-A_final.png` ← `2026-06-07_multi-ai_` を落とす）は禁止。手順は1つずつ明示し、「何を上書きするか」「他のファイルに触れないか」まで言い切る。

ファイル名だけでなく、**報告・提案の文そのものでも主語・目的語・修飾語を省略しない**。「コピー完了後に削除します」ではなく「`copy-and-backup.sh` が全7フォルダのコピーを終えた後に、内蔵の `/Users/sakamotomitsue/Documents/ipad_旧アーカイブ` を削除します」と書く。何の・どの・どこの を毎回添える。

**Why:** Miey は指示どおり literally 動く（ADHD 傾向で、省略を自分で補完しない）。2026-06-09 の Multi-AI ビジュアル制作中、司令塔が省略名（`..._04_carousel-C_4_final.png`）と「書き出し直すだけで復旧」という雑なリードを出し、Miey がその通りに動いた結果、改良版①がカルーセル4枚目のファイル名に上書き保存され、カルーセル4完成版が一時消失 → 復旧の手間が発生。原因は Miey でなく司令塔の省略指示。

**How to apply:**
- 保存名は毎回フルで：`2026-06-07_multi-ai_01_comparison-A_final.png`（短縮形を一度も使わない）
- 保存先もフルパスで：`/Users/sakamotomitsue/Documents/works/obsidian/01_attachments/`
- 「この操作は○○を上書きします／他のファイルには触れません」を明示
- 1手順ずつ番号を振ってリードし、各ステップ後に確認を挟む
- 「その後」「完了後に」「あれを」等の指示語で済ませない。**何のコピーか／どのファイルか／どこのパスか**を毎回書く（2026-08-13 Miey 指摘：「なんのコピー完了後？修飾語、目的語をちゃんと添えてね」）

関連：[[feedback_always_include_filepaths]]（参照提示も常にパス付き）・[[feedback_verify_after_write]]（書き込み後は必ず verify）
