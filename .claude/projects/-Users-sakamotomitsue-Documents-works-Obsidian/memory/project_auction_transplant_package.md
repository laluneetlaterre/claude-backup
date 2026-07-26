---
name: project-auction-transplant-package
description: フリマ出品システム（記憶の書斎・フリマ編）お客様移植版の設計決定
metadata: 
  node_type: memory
  type: project
  originSessionId: f02aa557-2640-48dd-8ef2-3f25e0b03bb1
  modified: 2026-07-25T09:17:06.697Z
---

2026-07-25 Miey 決定：auction システムのお客様移植パッケージは**デフォルト単一台帳 `sales/`**（wallet・settled キーなし・.base 1本）。**Miey/Ben の二財布構造はオプションとしても説明しない**（ドキュメントに一切載せない）。

その他の設計骨子（2026-07-25 監査で確定した前提）：
- 佐川契約運賃は `sagawa_fare.py` の FARES 辞書に全132件ハードコード＋SKILL.md 例示にも実単価。移植前にデータ／ロジック分離（`rules/sagawa-fare-table.json` 外出し、スクリプトは数字ゼロの汎用リーダー）が必須。お客様は自分の契約PDFを rules/ に置き AI に json を1回生成させる差し替え式。
- 運賃表.pdf・FARES・実売上データ（追跡番号・届け先入り）は **git 履歴にも残っている**ため、リポジトリごと配布は不可。クリーンエクスポートで配布。
- パラメータ化3点：絶対パス→vault相対、「Miey」→「ユーザー」、佐川関東発URL→設定値。symlink セットアップスクリプト同梱。
- 除外：旧GPTs 3ファイル、出品予定物/、README 内の Ben・Notion 移行史。

関連: [[project_business_value_ladder]]（ヤフオク・メルカリは同じ階段への別入口）、[[project_stock_content_strategy]]（YouTube「AI×ヤフオク・メルカリ」の見せ筋）
