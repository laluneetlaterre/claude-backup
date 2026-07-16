# nouhin-pdf テストラン summary — テスト花子さん（eval-0-folder-batch / with_skill）

- 実行日: 2026-07-16
- 対象フォルダ（fixture）: `/Users/sakamotomitsue/.claude/skills/nouhin-pdf-workspace/iteration-1/eval-0-folder-batch/with_skill/fixture/テスト花子さん/`
- 使用スキル: `/Users/sakamotomitsue/.claude/skills/nouhin-pdf/SKILL.md`（バンドルスクリプト `scripts/md2pdf.py` 使用）
- 注記: テストランのため、実在のお客様データ・Google Drive 実フォルダには一切触れていない。作業は fixture フォルダと outputs フォルダのみ。

## PDF化したもの（2件）

| 元md | 生成PDF | 判定理由 |
|---|---|---|
| `四柱推命鑑定書_hanako.md` | `四柱推命鑑定書_hanako.pdf` | お客様向け納品物（鑑定書）。SKILL.md の「PDF化する対象」に該当 |
| `質問の見本帳_hanako.md` | `質問の見本帳_hanako.pdf` | お客様向け納品物（質問の見本帳）。同上 |

- PDF は各 md の隣（fixture フォルダ内）に生成し、コピーを本 outputs フォルダに保存。
- frontmatter（type / 対象 / 生年月日 / 作成 等の内部管理情報）はスクリプトが自動除去。PDF に混入していないことを目視確認済み。
- 変換前に本文を一瞥し、内部メモ（「作成: Notion既存版より転記」等）の混入がないことを確認。鑑定書本文の引用「これは架空のテストデータです」は fixture の本文そのものなので、外科的編集の原則によりそのまま残した。

## PDF化しなかったもの（1件）

| ファイル | 理由 |
|---|---|
| `セッション準備_hanako.md` | 講師用メモ（frontmatter に「講師用。お客様には渡さない。」と明記）。SKILL.md「PDF化しない：講師用メモ」に該当。さらに SKILL.md の指示どおり「お客様フォルダに講師用ファイルがある」こと自体を Miey に報告する（下記・最終報告に記載）。ファイルの移動・削除は権限外なので行っていない |

## 検証結果（SKILL.md ステップ3：目視検証）

生成した 2 冊とも 1 ページ目を Read ツールで開いて確認した（「最低1冊」の要件を上回って全数確認）。

- **四柱推命鑑定書_hanako.pdf**: h1 に金（#e8c179）の下線、h2 に えんじ（#a13d3d）の左帯、表は 生成り（#fdf6ea）ヘッダで4列×4行が崩れなく描画、引用ブロックは金の左枠＋生成り背景、日本語は明朝体で正常表示。frontmatter 混入なし。文字化けなし。
- **質問の見本帳_hanako.pdf**: 同スタイルで h1・h2・番号付きリストが正常描画。frontmatter 混入なし。文字化けなし。
- 環境確認: `python3 -c "import markdown"` OK、`/Applications/Google Chrome.app` あり。変換は2件とも `OK:` で正常終了。

## 最終報告文（Miey への報告として）

生成したPDF（配置先：fixture の テスト花子さん フォルダ。コピーを outputs にも保存）：

1. 四柱推命鑑定書_hanako.pdf
2. 質問の見本帳_hanako.pdf

2冊とも1ページ目を目視確認済み。表の崩れ・日本語フォント・frontmatter混入なし。本番運用なら Drive マウント内に直接出力するため、デスクトップ版 Drive が自動同期して数分で Web 側にも反映されます（今回はテストランのため Drive には置いていません）。

**報告事項**: お客様フォルダ内に講師用ファイル `セッション準備_hanako.md`（「お客様には渡さない」と明記）が置かれていました。SKILL.md の指示どおり PDF 化はしていません。本番であれば、このファイルをお客様フォルダから講師用の場所へ移すかどうか、Miey の判断をお願いします。
