---
name: reference-cafetalk-html-constraints
description: Cafetalk レッスン説明欄HTMLで使える/使えない要素。絵文字は文字化けする
metadata: 
  node_type: memory
  type: reference
  originSessionId: be4f7702-de9f-4220-ac7d-4e66022718a1
---

Cafetalk のレッスン説明文（HTML可）に貼るときの制約（実機検証）：

- **絵文字は使用不可＝文字化けする**（🔱🎁🔮🧠🌱 等。2026-07-08 Miey確認）。視覚マーカーは色・枠・太字で付ける。どうしても記号が要るなら ■ ▶ ● ◆ ※ 等の標準記号で代替（絵文字ではない）。
- `<table>` は剥がされる（セルが一列に潰れる）→ カード型 `div` にする。
- `line-height` が効かない → 各要素に `margin` を明示して余白を作る。
- 濃い（ダーク）背景 `background` は剥がされる → 明るい背景＋色付き枠＋濃い文字色。
- 通る：`div`＋明るい `background`＋`border`＋`padding`＋インライン `color`/`font-size` ／ `<a>` リンク ／ `<hr>`。

影響先（絵文字入りで要除去のCafetalk向けHTML）：体験セッションのレッスンページ（既に公開＝文字化けしている可能性）・構築レッスン§3本文HTML・note.md のコラム用HTML。関連 [[project_cafetalk_high_price_only]]
