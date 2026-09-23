---
name: feedback-stable-names-not-volatile-ids
description: 物や場所は恒久的な名前で呼ぶ。diskN 等の可変IDで呼ばない。会話中に呼称を変えない
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 3761aa27-6016-49f2-90ac-0952212d0e1e
  modified: 2026-08-13T06:54:06.224Z
---

外付けドライブ等を指すときは、**製品名＋容量など恒久的に変わらない呼び方**を使う。`disk4` `/dev/disk7` のような macOS が接続順に振る可変識別子を会話の主語にしない。また、**同じ対象を会話のたびに違う名前で呼ばない**（一度決めた呼称を最後まで使う）。

**Why:** 2026-08-13、写真ライブラリ整理で司令塔が「disk4」「disk6」と device identifier で説明した。これは抜き差しで変わる一時的な番号で、Miey が後から見返しても何を指すか分からない。加えて「Othes」「Mac SSD」「disk4」と呼び名が揺れ、Miey が対象を追えなくなった。

**How to apply:**
- 物理ドライブ＝製品名＋容量（例：**Silicon-Power 2TB**、**Apple SSD 500GB**）
- ボリューム＝Finder に表示される名前（例：`Mac SSD`、`Othes`）
- 可変IDが必要なときは「Silicon-Power 2TB（今は disk4）」と**恒久名を主、IDを従**にする
- 同一セッション内・別セッション間を通じて呼称を統一する

関連：[[feedback_full_filenames_no_abbreviation]]、[[feedback_always_include_filepaths]]
