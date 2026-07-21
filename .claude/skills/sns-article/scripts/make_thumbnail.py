#!/usr/bin/env python3
"""SNS記事サムネイル生成（ハイブリッド型：AI背景画像＋日本語タイトルをHTML合成→PNG）

使い方:
    python3 make_thumbnail.py --title "AIに仕事を頼む前に、|「第二の脳」を作れ" --out thumb.png
    python3 make_thumbnail.py --title "タイトル" --bg 背景.png --out thumb.png
    python3 make_thumbnail.py --title "タイトル" --sub "Miey｜Obsidian×AI" --out thumb.png

引数:
    --title  タイトル文字列（必須）。`|` で手動改行。日本語はここで合成するので崩れない
    --bg     背景画像パス（省略可）。Imagen 等で生成した画像。省略時はブランド配色のグラデ背景
    --sub    下部の帯に出すクレジット行（省略時 "Miey｜Obsidian × AI"）
    --out    出力 PNG パス（必須）
    --size   WxH（省略時 1280x670 = note 推奨。X も同比率でそのまま使える）

処理:
    1. タイトル長からフォントサイズを自動決定（はみ出し防止）
    2. 背景（画像 cover＋可読性用の暗めオーバーレイ／なければ深紺グラデ）に
       白タイトル＋金のアクセント線＋クレジット行を重ねた HTML を組む
    3. Chrome headless の --screenshot で PNG 化

依存: python3, Google Chrome（macOS標準パス）。nouhin-pdf の md2pdf.py と同じ仕組み。
"""
import argparse
import base64
import pathlib
import subprocess
import sys
import tempfile

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def font_size_for(lines: list[str]) -> int:
    longest = max(len(line) for line in lines)
    if longest <= 8:
        return 96
    if longest <= 11:
        return 80
    if longest <= 14:
        return 66
    if longest <= 18:
        return 54
    return 44


def build_html(title: str, sub: str, bg_path: str | None, width: int, height: int) -> str:
    lines = [l.strip() for l in title.split("|") if l.strip()]
    size = font_size_for(lines)
    title_html = "<br>".join(lines)

    if bg_path:
        data = base64.b64encode(pathlib.Path(bg_path).read_bytes()).decode()
        ext = pathlib.Path(bg_path).suffix.lstrip(".").lower() or "png"
        bg_css = (
            f"background: linear-gradient(rgba(16,16,40,.50), rgba(16,16,40,.62)),"
            f" url('data:image/{ext};base64,{data}') center/cover no-repeat;"
        )
    else:
        bg_css = (
            "background: linear-gradient(135deg, #1a1a2e 0%, #24244a 55%, #3a2b4a 100%);"
        )

    return f"""<!doctype html><html><head><meta charset='utf-8'><style>
* {{ margin: 0; padding: 0; box-sizing: border-box; }}
body {{ width: {width}px; height: {height}px; overflow: hidden; {bg_css}
  font-family: 'Hiragino Sans', 'Yu Gothic', sans-serif;
  display: flex; flex-direction: column; justify-content: center; align-items: center; }}
.title {{ color: #ffffff; font-size: {size}px; font-weight: 800; line-height: 1.42;
  text-align: center; letter-spacing: 0.04em; padding: 0 70px;
  text-shadow: 0 2px 14px rgba(0,0,0,.45); }}
.rule {{ width: 120px; height: 5px; background: #e8c179; border-radius: 3px;
  margin: 34px 0 26px; }}
.sub {{ color: #e8c179; font-size: 28px; font-weight: 600; letter-spacing: 0.12em; }}
</style></head><body>
<div class='title'>{title_html}</div>
<div class='rule'></div>
<div class='sub'>{sub}</div>
</body></html>"""


def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--title", required=True)
    p.add_argument("--bg", default=None)
    p.add_argument("--sub", default="Miey｜Obsidian × AI")
    p.add_argument("--out", required=True)
    p.add_argument("--size", default="1280x670")
    a = p.parse_args()

    width, height = (int(v) for v in a.size.lower().split("x"))
    if a.bg and not pathlib.Path(a.bg).exists():
        sys.exit(f"背景画像が見つかりません: {a.bg}")

    html = build_html(a.title, a.sub, a.bg, width, height)
    with tempfile.NamedTemporaryFile(
        mode="w", suffix=".html", delete=False, encoding="utf-8"
    ) as tmp:
        tmp.write(html)
        tmp_path = tmp.name

    out = pathlib.Path(a.out).resolve()
    out.parent.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [
            CHROME,
            "--headless",
            "--disable-gpu",
            "--hide-scrollbars",
            f"--window-size={width},{height}",
            f"--screenshot={out}",
            f"file://{tmp_path}",
        ],
        check=True,
        capture_output=True,
    )
    pathlib.Path(tmp_path).unlink(missing_ok=True)
    print(f"OK: {out}")


if __name__ == "__main__":
    main()
