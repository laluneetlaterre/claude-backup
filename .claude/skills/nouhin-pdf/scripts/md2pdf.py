#!/usr/bin/env python3
"""お客様納品用 Markdown → PDF 変換（「育つ魂の設計図」世界観スタイル）

使い方:
    python3 md2pdf.py <入力.md> [<入力2.md> ...]
    → 各入力の隣に同名の .pdf を生成する

    python3 md2pdf.py <入力.md> --out <出力.pdf>
    → 出力先を明示指定（入力1つのときのみ）

    python3 md2pdf.py <入力.md> --compact
    → 行間・余白を詰めた「一覧向け」スタイル（質問の見本帳・辞典など、
      ざっと見渡して選ぶ文書向け。鑑定書・天命の地図は付けない＝ゆったり読ませる）

処理内容:
    1. YAML frontmatter を自動除去（内部管理情報をお客様に見せない）
    2. Markdown → HTML（表・コードブロック対応）
    3. 商品配色の CSS を適用（深紺 #1a1a2e／金 #e8c179／えんじ #a13d3d／生成り #fdf6ea・明朝体）
    4. Chrome headless で PDF 化（ヘッダー・フッターなし、A4）

依存: python3 + markdownモジュール, Google Chrome（macOS標準パス）
"""
import sys
import re
import subprocess
import tempfile
import pathlib

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

CSS = """
@page { size: A4; margin: 17mm 15mm; }
body { font-family: 'Hiragino Mincho ProN', 'Yu Mincho', serif;
  font-size: 10.5pt; line-height: 1.95; color: #26262b; margin: 0; }
h1 { font-size: 17pt; color: #1a1a2e; border-bottom: 2px solid #e8c179;
  padding-bottom: 6px; letter-spacing: 0.06em; margin: 0 0 18px; }
h2 { font-size: 13.5pt; color: #1a1a2e; border-left: 5px solid #a13d3d;
  padding-left: 10px; margin: 26px 0 10px; letter-spacing: 0.04em; }
h3 { font-size: 11.5pt; color: #1a1a2e; margin: 20px 0 8px; }
table { border-collapse: collapse; width: 100%; margin: 10px 0 16px;
  font-size: 9.5pt; line-height: 1.7; }
th { background: #fdf6ea; color: #1a1a2e; font-weight: 600; }
th, td { border: 0.6pt solid #b9b3a6; padding: 5px 8px; text-align: left;
  vertical-align: top; }
blockquote { border-left: 3px solid #e8c179; background: #fdf6ea;
  margin: 12px 0; padding: 8px 14px; color: #4a4640; }
strong { color: #1a1a2e; }
hr { border: none; border-top: 0.6pt solid #c9c3b6; margin: 22px 0; }
ul, ol { padding-left: 1.6em; }
li { margin: 2px 0; }
"""

# 一覧向けの詰めスタイル（--compact）。見本帳・辞典など、通読でなく
# 見渡して選ぶ文書向け。ページ数を抑えて一覧性を上げる。
COMPACT_EXTRA = """
@page { margin: 14mm 14mm; }
body { font-size: 10pt; line-height: 1.62; }
h1 { margin: 0 0 12px; }
h2 { margin: 17px 0 7px; }
h3 { margin: 13px 0 6px; }
p { margin: 6px 0; }
blockquote { margin: 9px 0; padding: 6px 12px; }
ul, ol { margin: 6px 0; }
table { margin: 8px 0 12px; }
hr { margin: 15px 0; }
"""


def md_to_pdf(src: pathlib.Path, dst: pathlib.Path, compact: bool = False) -> None:
    import markdown

    text = src.read_text(encoding="utf-8")
    # frontmatter除去（ファイル先頭の --- ... --- ブロック）
    m = re.match(r"^---\n.*?\n---\n", text, re.S)
    if m:
        text = text[m.end():]

    body = markdown.markdown(text, extensions=["tables", "fenced_code"])
    css = CSS + (COMPACT_EXTRA if compact else "")
    html = (
        f"<!doctype html><html><head><meta charset='utf-8'>"
        f"<title>{src.stem}</title><style>{css}</style></head>"
        f"<body>{body}</body></html>"
    )

    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".html", delete=False, encoding="utf-8"
    ) as tmp:
        tmp.write(html)
        tmp_path = tmp.name

    subprocess.run(
        [
            CHROME,
            "--headless",
            "--disable-gpu",
            "--no-pdf-header-footer",
            f"--print-to-pdf={dst}",
            f"file://{tmp_path}",
        ],
        check=True,
        capture_output=True,
    )
    pathlib.Path(tmp_path).unlink(missing_ok=True)
    print(f"OK: {dst}")


def main() -> None:
    args = sys.argv[1:]
    if not args:
        print(__doc__)
        sys.exit(1)

    compact = False
    if "--compact" in args:
        args.remove("--compact")
        compact = True

    out = None
    if "--out" in args:
        i = args.index("--out")
        out = pathlib.Path(args[i + 1])
        args = args[:i] + args[i + 2:]
        if len(args) != 1:
            sys.exit("--out は入力が1つのときだけ使えます")

    for a in args:
        src = pathlib.Path(a)
        if not src.exists():
            sys.exit(f"見つかりません: {src}")
        dst = out if out else src.with_suffix(".pdf")
        md_to_pdf(src, dst, compact=compact)


if __name__ == "__main__":
    main()
