---
name: feedback_use_english_ui_labels
description: 管理画面の設定を指示するときは、画面に表示されている英語ラベルをそのまま使う（日本語に訳さない）
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a291a9de-a6fd-4eaf-a3f4-1df333e2c4bf
  modified: 2026-08-15T13:04:32.278Z
---

eBay 等の管理画面で設定変更を指示するときは、日本語に訳した名称ではなく、**画面に表示されている英語ラベルをそのまま**使う。例：「自動拒否ライン」ではなく `Minimum offer`、「自動承諾ライン」ではなく `Auto accept`。

**Why:** 2026-08-15、eBay の Best Offer 設定を「自動拒否ライン $650 / 自動承諾ライン $780」と日本語で指示したところ、Miey から「日本語で書くと分からない、英語で書いて」と指摘された。画面上のどの欄を指すのか対応づけられず、探す手間が発生する。

**How to apply:** 設定名は「画面の英語ラベル」＋「現在値 → 変更値」の表形式で出す。意味の説明が要るときは英語ラベルの後ろに日本語で添える。触らない欄も「据え置き」と明示すると、Miey が画面上で迷わない。同じ趣旨で [[feedback_full_filenames_no_abbreviation]]（省略せずフルで書く）と [[feedback_always_include_filepaths]]（探す手間を作らない）も参照。
