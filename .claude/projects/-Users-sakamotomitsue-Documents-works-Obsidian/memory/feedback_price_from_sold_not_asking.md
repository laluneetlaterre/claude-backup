---
name: feedback_price_from_sold_not_asking
description: 値付けは「売れた価格」だけを根拠にする。出品中の価格（asking）は根拠にしない
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a291a9de-a6fd-4eaf-a3f4-1df333e2c4bf
  modified: 2026-08-15T13:14:48.554Z
---

オークション・フリマの値付けを助言するときは、**実際に売れた価格（sold）と、まだ売れていない出品価格（asking）を必ず表で分けて提示する**。asking を参照点にして価格を決めない。

**Why:** 2026-08-15、LV Pégase 55 の値付けで「出品中の同型 Fair が US$880」を参照点にして US$860 を提示した。後の監査で、破損した同型の**実売**は US$630・US$667 と判明。$880 は誰も買っていない希望価格にすぎず、根拠価値はゼロだった。さらにその高値を前提に `Minimum offer` を $650 に設定したため、**実勢価格帯（$480〜520）のオファーを全部自動拒否する**設定になっていた。asking を根拠にすると、価格だけでなく設定まで連鎖的に狂う。

**How to apply:** 相場を出すときは必ず「種別」列を作り `売れた` / `売れていない` を明記する。sold が1件も見つからない場合は「実測ゼロの推定」とはっきり言い、推定であることを消さない。Best Offer の下限を決めるときは sold の帯から逆算する（下限が sold 帯より上だと機会を自動で捨てる）。関連： [[project_ebay_feedback_bootstrap]]、[[feedback_shipping_cost_includes_materials]]（根拠なく数字を述べない）。
