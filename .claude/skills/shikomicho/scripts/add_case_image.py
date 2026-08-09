#!/usr/bin/env python3
"""絵の仕込み帳：作った画像を1件ぶん登録する。

やること（機械的な部分だけ。文章は書かない）
  1. 原本を Google Drive の obsidian-media/nanobanana/<slug>/ へ保存
  2. 同じものをサイトの public/cases/<slug>/ へ複製
  3. その事例の frontmatter の images: を .webp のパスに書き換える

使い方
  python3 add_case_image.py --ref "例56" --output ~/Downloads/out.png [--input ~/Downloads/in.png]
  python3 add_case_image.py --ref pro-01 --output out.png --dry-run
"""
import argparse
import re
import shutil
import sys
from pathlib import Path

SITE = Path.home() / "Documents/works/shikomicho"
CASES = SITE / "src/content/cases"
PUBLIC = SITE / "public/cases"
DRIVE = (
    Path.home()
    / "Library/CloudStorage/GoogleDrive-hydeistpunk10ve@gmail.com/マイドライブ/obsidian-media/nanobanana"
)


def resolve_slug(ref: str) -> str:
    """Miey の呼び方（例56 / Pro例1 / n-056 / pro-01）を slug に直す"""
    r = ref.strip().replace(" ", "").replace("　", "")
    if re.fullmatch(r"(pro-\d+|n-\d+)", r, re.I):
        return r.lower()
    m = re.fullmatch(r"(?:pro|Pro|PRO)?例?(\d+)", r)
    is_pro = r.lower().startswith("pro")
    if m:
        n = int(m.group(1))
        return f"pro-{n:02d}" if is_pro else f"n-{n:03d}"
    sys.exit(f"事例の指定が読み取れません: {ref!r}\n  例: 「例56」「Pro例1」「n-056」「pro-01」")


def set_images(md: Path, slug: str, has_input: bool) -> str:
    text = md.read_text(encoding="utf-8")
    out = f"/cases/{slug}/output.webp"
    inp = f"/cases/{slug}/input.webp" if has_input else ""

    block = re.search(r"^images:\n(?:[ \t]+\w+:.*\n)+", text, re.M)
    if not block:
        sys.exit(f"{md.name} に images: の欄が見つかりません")

    new = "images:\n"
    new += f'  input: {inp if inp else chr(34) + chr(34)}\n'
    new += f"  output: {out}\n"
    text = text[: block.start()] + new + text[block.end() :]
    md.write_text(text, encoding="utf-8")
    return new


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ref", required=True, help="事例の指定（例56 / Pro例1 / n-056 / pro-01）")
    ap.add_argument("--output", required=True, help="生成した画像のパス")
    ap.add_argument("--input", help="プロンプトに入れた元画像のパス（あれば）")
    ap.add_argument("--dry-run", action="store_true")
    a = ap.parse_args()

    slug = resolve_slug(a.ref)
    md = CASES / f"{slug}.md"
    if not md.exists():
        sys.exit(f"そんな事例はありません: {slug}（{md}）")

    src_out = Path(a.output).expanduser()
    if not src_out.exists():
        sys.exit(f"画像が見つかりません: {src_out}")
    src_in = Path(a.input).expanduser() if a.input else None
    if src_in and not src_in.exists():
        sys.exit(f"元画像が見つかりません: {src_in}")

    title = re.search(r'^title:\s*"(.*)"', md.read_text(encoding="utf-8"), re.M)
    print(f"事例: {slug} — {title.group(1) if title else '?'}")

    if a.dry_run:
        print("  [下見] 何も書き込みません")
        print(f"  原本 → {DRIVE / slug}/")
        print(f"  複製 → {PUBLIC / slug}/")
        print(f"  images: を /cases/{slug}/*.webp に書き換え")
        return

    for base in (DRIVE / slug, PUBLIC / slug):
        base.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src_out, base / f"output{src_out.suffix.lower()}")
        if src_in:
            shutil.copy2(src_in, base / f"input{src_in.suffix.lower()}")

    print(f"  原本を保存 → {DRIVE / slug}/")
    print(f"  サイトへ複製 → {PUBLIC / slug}/")
    print("  " + set_images(md, slug, bool(src_in)).replace("\n", "\n  ").rstrip())
    print("\n次: cd ~/Documents/works/shikomicho && npm run deploy")


if __name__ == "__main__":
    main()
