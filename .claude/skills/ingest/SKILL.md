# /ingest スキル

## 何をするか

貼り付けたコンテンツ（rawファイルのパス・テキスト・記事要約）を **wiki/ 内の最適な場所に取り込む**。
保存先判断 → 1案提示 → 確認 → 保存 → index/log 更新 まで一貫して行う。

`/vault-stash` との違い：このスキルは wiki/ 内専用。wiki/ 外（03_stock/ 等）への保存は `/vault-stash` を使う。

---

## トリガー

- `/ingest`
- `ingestして`
- `wikiに入れて` / `wiki に取り込んで`

---

## 振り分けルール

内容を読んで以下で判断：

| 内容の性質 | 保存先 | ファイル名規則 |
|---|---|---|
| 単語定義・用語解説（「○○とは」系） | `wiki/concepts/` | ケバブケース英語（例：`normalization.md`）。日本語固有概念はそのまま可 |
| 外部記事・クリッピングの要約 | `wiki/sources/` | `author-year-short-title.md` |
| 人物・ツール・組織の情報 | `wiki/entities/` | 人物は姓のみ、組織・ツールはそのまま |
| 複数ソースを横断した分析・統合 | `wiki/syntheses/` | テーマ名ケバブケース |
| クエリ回答・比較表・出力物 | `wiki/outputs/` | テーマ名ケバブケース |

判断が難しい場合は第一案＋代替案を提示してMieyに選んでもらう。

---

## 実行フロー

1. コンテンツを読んで振り分け先・ファイル名を決定
2. **1案提示して確認待ち**（沈黙実行しない）

```
> 判定：概念定義（単語の意味）
> 保存先：wiki/concepts/normalization.md

OK なら保存します。
```

3. OK が出たら保存（フロントマターを付ける）
4. `wiki/index.md` の該当カテゴリに1行追記
5. `wiki/log.md` にエントリ追記
6. 完了報告（1〜2行）

---

## フロントマター

CLAUDE.md §3 のスキーマに従い、type に応じて使い分ける。

### concept（単語定義・用語解説）
```yaml
---
type: concept
name: 概念名（日本語OK）
domain: IT / Philosophy / Business など
related: []
source: Perplexity AI（YYYY-MM-DD）など出典があれば
created: YYYY-MM-DD
updated: YYYY-MM-DD
tags: [tag1, tag2]
---
```

### source-summary（外部記事要約）
```yaml
---
type: source-summary
source: "[[clippings/元記事]]"
source-author: 著者名
source-url: https://...
ingested: YYYY-MM-DD
ingested-by: Claude
status: draft
tags: [tag1]
---
```

---

## raw/ フォルダのファイルを渡された場合

```
/ingest
/path/to/raw/正規化とは？.md
```

→ ファイルを読んで内容判定 → `wiki/concepts/normalization.md` などに取り込み提案
→ 完了後、rawファイルは削除してよい（Miey「削除した方がいい」GO 運用）

複数ファイルを一度に渡された場合は、まとめて判定して一覧提示 → まとめて確認 → まとめて実行。

---

## 外部記事（ingest フロー詳細版）

CLAUDE.md §4 Ingest フローに沿う：
1. ソースを読む
2. Miey と要点を会話してから書き始める（勝手に進めない）
3. 関連する既存エンティティ・概念ページの横断更新を提案
4. 保存 → index → log 更新

---

## 完了後の報告

```
保存：[normalization.md](wiki/concepts/normalization.md) → index.md・log.md 更新済み。
```

1〜2行。process narration しない（master §4.2）。
