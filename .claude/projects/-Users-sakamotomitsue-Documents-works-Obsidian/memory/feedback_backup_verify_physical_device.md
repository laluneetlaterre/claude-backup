---
name: feedback-backup-verify-physical-device
description: バックアップ先の独立性はボリューム名でなく物理機器単位で最初に確認する。disk番号でなく機器名・ボリューム名で話す
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a63e61e5-cb95-4cc9-8505-d6decec8d901
  modified: 2026-08-13T22:08:51.919Z
---

バックアップ・複製の作業では、開始前に `diskutil info` の APFS Physical Store まで辿り、**各ボリュームがどの物理筐体に載っているか**を確定してから設計する。ボリューム名が複数あっても同一筐体なら冗長性は1台分。

**Why:** 2026-08 の子供写真バックアップで、「Mac SSD」「Othes」を別ドライブと誤認したまま「外付け2台にコピー完了」と報告。実際は両方とも Silicon-Power 2TB 1台の中の区画で、Miey の「3つの別SSDに」という指示を満たせていなかった。df や diskutil list の一覧だけでは Physical Store の共有は見えない。

**How to apply:**
- コピー先を決める段階で物理機器→ボリュームの対応表を作り、Miey に見せてから開始する。
- 冗長性の報告は「何本コピーした」でなく「物理何台にあるか」で言う。
- Miey に説明するとき disk4/disk7 等の番号は使わない（接続のたびに変わるため）。機器名（Silicon-Power 2TB 等）とボリューム名（Othes 等）で話す。
- 構成の正本は `03_stock/02_it-ai-tools/backup-drives-map.md`。ドライブ構成が変わったら更新する。

関連：[[feedback-verify-after-write]]
