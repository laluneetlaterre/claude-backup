---
name: project-cafetalk-price-cap-10000pt
description: "Cafetalkの構造的制約 — 価格上限10,000pt、かつ外部の同種商品へリンク不可の閉じたチャネル（入口ではない）"
metadata: 
  node_type: memory
  type: project
  originSessionId: 44b279d7-0b3f-458b-a4ff-ecf8c4bb18ee
  modified: 2026-07-21T08:55:40.227Z
---

Cafetalkの価格上限は **1レッスン 10,000pt（＝1万円）**。これを超える値付けは**累計150レッスン以上**で初めて解放される（Mieyは2026-06時点で60〜66回）。パックレッスンも「パック総額」に同じ10,000pt上限がかかるため、複数回コースをまともな単価で売ることは構造的に不可能。

つまり **Cafetalkでは14,900円や19,800円は設定できない**。直販LP（90分14,900円）やMOSHの価格をCafetalkに当てはめて話さないこと。Cafetalk版の商品は常に60分10,000pt。

**もう一つの構造的制約：Cafetalkは「入口」ではなく閉じたチャネル。** YouTubeリンクは置けるが、**Cafetalkのレッスンと競合する同種のオンライン商品へのリンクは規約違反**（自分の直販LP・MOSH・他プラットフォームの同等商品を含む）。したがって Cafetalk → 外部 の導線は作れない。流入は一方通行で、**note/X/LINE → Cafetalk はOK、その逆はNG**。Cafetalkコラム・レッスンページの導線は必ずCafetalk内で完結させる。「Cafetalkを入口にして直販へ送る」という設計は提案しない。

**Why:** 2026-07-21、司令塔が手数料比較の際に「Cafetalkで14,900円相当を売っても手取り8,940〜12,665円」と、存在しない価格を前提に計算してMieyに指摘された。仕様は `03_stock/cafetalk/カフェトーク仕様シート.md` と `03_stock/cafetalk/Cafetalk戦略_前提ファクトシート.md` に明記済みだった（読めば防げた誤り）。

**How to apply:** Cafetalkの売上・手数料・チャネル比較を計算するときは、単価を必ず10,000ptに固定する。Cafetalk絡みの価格の話が出たら、まず上記2ファイルを確認する。Mieyの方針は「10,000pt固定・低単価で数を追わない（来ないなら来ないでよい）」なので、値下げ提案はしない（[[project_cafetalk_high_price_only]]）。他チャネル（MOSH・タイムチケット等）を勧める根拠として、この上限は正当な理由になる。
