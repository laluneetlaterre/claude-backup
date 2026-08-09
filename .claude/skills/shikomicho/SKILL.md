---
name: shikomicho
description: |
  「絵の仕込み帳」（画像生成プロンプト事典・非公開サイト）の更新。作った画像を事例に登録し、
  原本を Google Drive へ退避し、覚書を書き足し、Cloudflare Pages へ公開するまでを一続きで行う。
  トリガー：「例56の画像できた」「Pro例3やってみた」「仕込み帳に追加して」「事典を更新して」
  「仕込み帳デプロイして」「/shikomicho」、または画像ファイルを提示して事典への追加を求めたとき。
  新しい事例（原典に無いMiey自作のプロンプト）の追加もここで扱う。
  ※ 原典 Awesome-Nano-Banana-images のプロンプト本文は絶対に書き換えない。
---

# 絵の仕込み帳の更新

Nano Banana のプロンプト事典サイト。Miey が画像を1件ずつ作って埋めていく。

- サイト：https://shikomicho-ac5d5d.pages.dev/ （**非公開**・noindex・URLを知る人のみ）
- ソース：`~/Documents/works/shikomicho/`
- GitHub：`laluneetlaterre/shikomicho`（private）
- 記録：`obsidian/03_stock/02_it-ai-tools/絵の仕込み帳サイト.md`

## 絶対に守ること

1. **原典のプロンプト本文（frontmatter の `prompt:`）は一字も変えない。** 誤字があってもそのまま。原文忠実がこの事典の価値。
2. **考案者クレジット（`credit:` `sourceUrl:`）を消さない。** CC BY 4.0 の条件。
3. **原典の画像を転載しない。** 載せるのは Miey が自分で生成したものだけ。
4. **Obsidian Vault に画像を置かない。** 原本は Google Drive、配信用 WebP はサイトのリポジトリ。
5. **勝手に画像を生成しない。** 「この画像は◯◯で作ったものですか？」と聞く。Miey の実作を別物で置き換えるのは厳禁。
6. **32件の空の `sourceUrl` を「原典から補完」しない。** 原典 README は Pro事例31件＋`n-002` で
   同じ投稿ID `1960583251460022626` を使い回しており、リンク先が別人の投稿になる。
   2026-08-09 に Miey の GO を得て意図的に空にした。**戻すのは改悪**。考案者は `credit:` で正しく残っている。

## 手順

### 1. どの事例か決める

Miey の言い方を slug に直す。

| 言い方 | slug |
|---|---|
| 例56 / 56番 | `n-056` |
| Pro例1 / プロの1 | `pro-01` |
| 題名だけ言われた | `grep -l "題名" ~/Documents/works/shikomicho/src/content/cases/*.md` で探す |

迷ったら候補を出して確認する。**推測で別の事例に入れない。**

### 2. 画像を登録する

```bash
python3 ~/.claude/skills/shikomicho/scripts/add_case_image.py \
  --ref "例56" --output <生成画像のパス> [--input <元画像のパス>]
```

これで3つが同時に済む。

- 原本 → `マイドライブ/obsidian-media/nanobanana/<slug>/`（PNG原寸）
- サイト → `public/cases/<slug>/`
- `images:` を `.webp` のパスに書き換え

入力画像が要らないプロンプトなら `--input` は省く。
`--dry-run` を付けると書き込まずに下見できる。

### 3. 覚書を書き足す（あれば）

Miey が「文字が崩れた」「2回目で通った」などと話したら、その事例の本文末尾に足す。**話していないことは書かない。**

```markdown
## 作ってみた

入力は◯◯。このプロンプトで、上の一枚になりました。

- （実際に起きたことだけを箇条書きで）
```

節が既にあれば追記、無ければ新設。ここが他のプロンプト集に無い価値なので、Miey が何か言ったら必ず拾う。

### 4. 公開する

```bash
cd ~/Documents/works/shikomicho && npm run deploy
```

WebP変換 → ビルド → 一括DL用 zip の作り直し → 公開物からPNG除外 → Cloudflareへアップロード、まで自動。
※ 目録ページの「まとめて持ち帰る」zip は毎回ビルドし直される。手で触る必要はない。
※ Claude Code から実行するときは Bash に `dangerouslyDisableSandbox=true` が要る（ネットワークを使うため）。

### 5. 報告

チャットには短く1〜2行。

```
例56 に画像を入れました → https://shikomicho-ac5d5d.pages.dev/book/n-056/
収録140件／画像あり◯件
```

## 新しい事例を足すとき（原典に無いもの）

`src/content/cases/own-XX.md` を作る。番号は 900番台。

```yaml
---
number: 901
title: "題名（20字以内）"
summary: "どんな絵ができて、どういう場面で効くか。40〜70字"
date: YYYY-MM-DD
origin: original
refId: "自作 1"
credit: []
sourceUrl: ""
models: [nano-banana]
needsInput: true
aspect: ""
tags: [既存のタグから2〜4個]
portability:
  chatgpt: medium
  note: "ChatGPTで同じ結果になるかの見立てを1文"
images:
  input: ""
  output: ""
prompt: |
  プロンプト全文
---
```

タグは既存のものから選ぶ（勝手に増やさない）。一覧はこれで出る：

```bash
grep -h "^tags:" ~/Documents/works/shikomicho/src/content/cases/*.md | tr -d 'tags:[]' | tr ',' '\n' | sort -u
```

## よくある変更

| やりたいこと | どこを |
|---|---|
| サイト名を変える | `src/config.ts` の `SITE.name` |
| 見本に出したくない事例がある | `src/config.ts` の `SHOWCASE_EXCLUDE` に slug |
| 検索に載せたい（公開に転じる） | `public/_headers` と `public/robots.txt` を消して再デプロイ |
| 画像だけ差し替え | 手順2をもう一度（上書きされる） |

## 落とし穴

- **見本は手で選ばない。** 画像が入っている事例が自動で出る。リストを書き換えようとしないこと。
- **PNG は git に入らない。**`.gitignore` 済み。原本は Google Drive にあるので消さない。
- **プレビューが見たいだけなら** `npm run dev` → http://localhost:4321（デプロイ不要）。
- **サーバーはセッションが終わると落ちる。** 見たいときに立て直す。
