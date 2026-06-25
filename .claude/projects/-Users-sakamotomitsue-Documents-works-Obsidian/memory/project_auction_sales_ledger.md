---
name: project_auction_sales_ledger
description: オークション売上台帳。共有財布とMiey財布を別フォルダ・別baseに分離(Benに見せても混ざらないよう)
metadata: 
  node_type: memory
  type: project
  originSessionId: 0b6486d8-6f26-4238-9422-744c40fe08a3
---

`03_stock/auction/` のオークション販売売上台帳。**共有財布分とMiey分を物理的に別フォルダ・別baseに分離**している（Miey指示・2026-06-25：Ben に共有財布を見せるとき Miey 個人分が混ざらないように）。各ノートは `type: auction-sale`＋`wallet`（`共有`/`Miey`）。元は Notion の2DBを移行。

**2つの台帳：**
- **共有財布**：`sales-shared/` ＋ `dashboards/売上 20260314〜.base`。`wallet: 共有`。**Miey と Ben の共通のお財布**に入る分（Ben の不用品などを売ったもの）。⚠️ これは「Ben のもの」ではなく **MieyとBenの共有**。「Ben」表記は使わない。元DB＝「オークション販売売り上げ 20260314〜」。
- **Miey財布**：`sales-miey/` ＋ `dashboards/Miey売上.base`。`wallet: Miey`。Miey 自身の不用品（別財布、継続記録、精算で締めない）。元DB＝「Mitsueオークション販売売り上げ」。

⚠️ **Ben 個人専用の売上DB**（Notion「Ben 2026 3/14-3/25」等）は別物・過去データで **Obsidianに移行しない**。

**精算サイクル（共有財布のみ）：** 共有財布の金は年2回ほどの旅行などでドカンと使い、そのタイミングで**その期間分を精算＝サイクルを締める**。`20260314〜` は現行サイクルの起点（〜2026-03-13は精算済み）。精算したらそのサイクルのノートを `settled: true` にし（base「精算済み」ビューへ）、次サイクルを `settled: false` で積む＋ビュー名・base名の期間を更新。

**How to apply:** いま共有財布にいくら溜まってるか＝共有base「未精算 (20260314〜)」ビューの手取り合計。手取り＝販売金額＋送料(収入)−送料2(実費)−システム手数料（送料はお客様から頂く収入、送料2が実費）。両base とも `file.inFolder` ＋ `wallet` で二重に絞り、誤配置でも他財布が混入しない。不動産で Ben と共有する [[project_real_estate_shared_repo]] とは別件。
