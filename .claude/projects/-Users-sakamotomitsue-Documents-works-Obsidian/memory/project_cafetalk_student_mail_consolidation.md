---
name: project_cafetalk_student_mail_consolidation
description: 生徒さんとの連絡文の置き場所は 03_stock/cafetalk/ 配下に集約済み（2026-08-05 整理）
metadata: 
  node_type: memory
  type: project
  originSessionId: 74f2d4c9-3e87-4ce8-b691-0337e9a7cf21
  modified: 2026-08-05T12:19:34.586Z
---

生徒さまとの連絡文は 2026-08-05 に4か所から `03_stock/cafetalk/` へ集約した。切り分けの軸は**「連絡文」か「納品物」か**（人単位ではなく用途単位）。

- 個別の連絡 → `03_stock/cafetalk/生徒様とのメール/<英字名>_sama.md`（**1人1ファイル・新しいものを上に追記**。日付ごとにファイルを増やさない）
- 全生徒への一斉配信 → `03_stock/cafetalk/一斉配信/`
- 定型挨拶など → `03_stock/cafetalk/テンプレ/`
- 鑑定書・天命の地図・セッション準備 → `products/「育つ魂の設計図」…/03_講師運用/お客様別（非公開）/<名前>/`（**動かさない**）
- お客様納品Vault → `~/Documents/works/obsidian_customer/<名前>_sama/`（Vault外）

**Why:** 連絡文は商品をまたぐ（占いの生徒にAI第二の脳の案内も送る）が、納品物は商品固有。連絡を商品フォルダに置くと必ずまた散る。

**How to apply:** 生徒さま宛の文面を書いたら、商品フォルダではなく必ず上の連絡ログへ追記する。運用ルールと生徒一覧は `03_stock/cafetalk/生徒様とのメール/README.md` が正。送信手段は [[reference_cafetalk_message_web_only]]、予約とカレンダーは [[reference_cafetalk_auto_calendar]]。
