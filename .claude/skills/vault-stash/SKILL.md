---
name: vault-stash
description: |
  ユーザーが「/vault-stash」「これ保存して」「これどこに置く？」「stashして」「保存先教えて」と入力し、続けてテキスト・URL・ファイルパス等を貼り付けたら実行する。
  貼られたコンテンツの性質を判定し、Obsidian Vault（~/Documents/works/obsidian/）内の適切なフォルダに保存先・ファイル名を1案提示 → ユーザー確認後に保存 → 必要なら index.md / log.md / references.md を自動更新する。
  プロンプト → prompts/、技術TIPS → 03_stock/02_IT_AIツール/、概念定義 → wiki/concepts/、Web参考リンク → prompts/references.md など、CLAUDE.md と過去事例に基づき分類する。
---

# vault-stash スキル（/vault-stash）

## 何をするか

Miey が貼り付けたコンテンツを **「どこに保存すればいい？」と毎回相談するコスト**をゼロにするためのスキル。

司令塔（Claude）が：

1. 貼られた内容の性質を判定
2. **保存先・ファイル名・カテゴリを1案提示**
3. Miey が `ok` / `別のフォルダに` / `ファイル名変えて` 等で返答
4. OK が出たら保存実行
5. 必要なら index・log・references を自動追記

---

## トリガー

以下のいずれかを Miey が入力したら、このスキルを発動：

- `/vault-stash`
- `これ保存して` / `これどこに置く？` / `どこに保存すればいい？`
- `stashして` / `保存先教えて`

トリガー語の直後（または続けて貼った内容）が**処理対象**。

---

## 分類ルール（判定フロー）

貼られた内容を以下の順で判定する：

### 1. プロンプト系 → `prompts/`

判定キー：
- 命令形の指示文（「〜してください」「あなたは〜です」）
- `# 命令:` `# 制約:` 等のテンプレ構造
- AIに渡す前提のテキスト

サブカテゴリ：
- 画像生成プロンプト（Midjourney/Niji/DALL-E等、`--ar` `--v` 等のパラメータ） → `prompts/images/`
- 文章生成・SNS・LP・コピー・メール・システムプロンプト → `prompts/writing/`
- 分析・タスク洗い出し・データ抽出・壁打ち → `prompts/analysis/`
- 外部リンク（プロンプト集サイト等） → `prompts/references.md` に追記
- PDF・教材 → `prompts/references/<theme>/` に格納、`prompts/references.md` 更新

判定後、`prompts/index.md` に1行追記。

### 2. 技術TIPS / ツール使い方 → `03_stock/02_IT_AIツール/`

判定キー：
- ツール導入手順（Raycast拡張、CLI、MCP、Obsidianプラグイン等）
- ワークフロー観察（例：「Codex × Canva 連携」）
- ショートカット・効率化TIPS

サブフォルダ：
- AIプロンプト関連 TIPS → `03_stock/03_AIプロンプト/`
- マーケ・コンテンツ販売 → `03_stock/04_コンテンツ販売マーケ/`
- 思考・自己分析 → `03_stock/05_思考_自己分析/`
- トラブル対応 → `03_stock/07_トラブル対応/`

ファイル名：`<ツール名or機能>_<用途>TIPS.md`（例：`ScreenOCR_Raycast使い方TIPS.md`）

### 3. 概念定義・用語解説 → `wiki/concepts/`

判定キー：
- 「〜とは」で始まる定義テキスト
- 用語の意味整理
- 体系化された解説（複数段落、比較表あり等）

ファイル名：日本語OK（例：`ナレッジ.md`）
フロントマター必須（CLAUDE.md schema §3 参照）：

```yaml
---
type: concept
name: 概念名
domain: AI / Marketing / Philosophy / etc
related: []
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [tag1]
---
```

保存後：
- `wiki/index.md` の concepts セクションに追記、統計更新、updated日付更新
- `wiki/log.md` に `## [YYYY-MM-DD] concept-add | <概念名>` で追記

### 4. ソース要約・記事 ingest → `wiki/sources/`

判定キー：
- clippings/ にある記事の要約依頼
- 外部記事をWikiに取り込む指示

→ CLAUDE.md §4 Ingest フローに沿う（Miey と要点を会話 → 関連エンティティ更新提案 → 保存 → log更新）。

### 5. レシピ・暮らし系メモ → `03_stock/09_個人メモ/` or 既存サブフォルダ

例：料理レシピ、買い物リスト、家族関連メモ。

### 6. 判定不能 → Miey に確認

候補が2つ以上に分かれる場合は、**1案推奨＋代替案1つ**の形で提示し、Miey の判断を待つ。

---

## 実行フロー

### ステップ 1: 内容判定（沈黙）

貼られたテキストを読み、上記分類ルールに従って保存先・ファイル名・カテゴリを決定。

### ステップ 2: 1案提示

形式例：

```
> 判定：技術TIPS（ツール使い方）
> 保存先：03_stock/02_IT_AIツール/ScreenOCR_Raycast使い方TIPS.md

OK なら保存します。別のフォルダ・ファイル名がよければ指示してください。
```

迷いがある場合のみ代替案を添える：

```
> 第一案：prompts/writing/SuperWhisper音声入力タスク分岐エージェントプロンプト.md
> 第二案：新カテゴリ prompts/agents/ を作る（システムプロンプト系が今後増える場合）
```

### ステップ 3: ユーザー確認待ち

`ok` `go` 等 → 実行
`別のフォルダに` `XXに置いて` → 指示反映して再提示 or 実行
`ファイル名変えて` → 名前変更
`やめる` → 中止

### ステップ 4: 保存 + 関連ファイル更新

| 保存先 | 自動更新する関連ファイル |
|---|---|
| `prompts/*` | `prompts/index.md` |
| `prompts/references/*` | `prompts/references.md` |
| `wiki/concepts/`, `wiki/sources/`, `wiki/syntheses/`, `wiki/outputs/`, `wiki/entities/`, `wiki/reference/` | `wiki/index.md`（該当セクション + 統計 + updated） + `wiki/log.md` |
| `03_stock/*` | 関連index無し（追記不要） |

### ステップ 5: 完了報告（1〜2行）

形式例：

```
保存：[ファイル名](相対パス) → index.md 追記済み。
```

---

## ルール（Miey 共通運用ルール準拠）

- **編集権限の階層**（master Rule 1）を厳守。`clippings/` `diary/` は対象外（保存しない）
- 5ファイル以上の一括操作になる場合は、実行前に Miey GO を取る（Rule 3）
- 新フォルダ作成は Rule 3 該当 → 事前確認
- ファイル名・カテゴリの判断は CLAUDE.md と過去事例（このスキルが過去に提案した分類）に基づく
- 判定後にスキルが沈黙で実行を始めることはしない。**必ず1案提示 → 確認待ち**
- 完了報告は1〜2行。process narration はしない（master §4.2 過剰を出さない原則）

---

## 過去事例（学習用ログ）

判定の典型パターン。新しいケースが増えたら追記する。

| 内容のタイプ | 保存先 | 例 |
|---|---|---|
| Midjourney 画像プロンプト | `prompts/images/` | 和風スピリチュアル広告ビジュアル_Midjourney.md |
| キャッチコピー生成プロンプト | `prompts/writing/` | キャッチコピー10個生成プロンプト.md |
| 業務タスク生成プロンプト | `prompts/analysis/` | 開業準備タスクリスト生成プロンプト.md |
| ツール使い方TIPS | `03_stock/02_IT_AIツール/` | ScreenOCR_Raycast使い方TIPS.md |
| ツール連携ワークフロー | `03_stock/02_IT_AIツール/` | Codex_Canva_BulkCreate連携TIPS.md |
| 用語の意味整理 | `wiki/concepts/` | ナレッジ.md |
| プロンプト集サイトのURL | `prompts/references.md` に1行追記 | こんまりプロンプト集 |
| 教材PDF | `prompts/references/<theme>/` | prompting-symbols/ |

---

## 参照

- 共通運用ルール：`~/.claude/CLAUDE.md`
- Obsidian Vault スキーマ：`~/Documents/works/obsidian/CLAUDE.md`
- ファイル参照記法：`feedback_always_include_filepaths`
- 書き込み後 verify：`feedback_verify_after_write`
