---
name: sns-article
description: |
  Miey の SNS 記事を「1記事＝1ファイル（媒体別セクション内蔵）」の形で作成・媒体展開するスキル。一つの内容を X / note / cafetalk / Threads / Facebook など複数媒体に転用する運用を、命名・frontmatter・媒体セクション・index更新まで自動で整える。Miey はフォーマットを覚えず中身に集中できる。
  トリガー：「新しい記事」「記事のひな形作って」「これ記事にして」「記事にまとめて」「○○を記事化して」「別媒体に展開」「note版作って」「cafetalk版作って」「Threads版作って」「Facebook版作って」「X版作って」「/sns-article」、または下書き／1媒体版のテキストを貼って「他の媒体にも展開したい」と頼んだとき。
  対象は 02_sns-posts/articles/ 配下のSNS発信記事のみ。lune/ や商品教材・wiki・diary は対象外。文章の最終文体・採否は必ず Miey。
---

# sns-article スキル（SNS記事 1ファイル化・媒体展開）

## 役割（なぜ存在するか）

Miey は **一つの内容を色々な媒体（X / note / cafetalk / Threads / Facebook）に転用したい**。
このスキルは、その記事を毎回ブレなく **「1記事＝1ファイル・媒体別セクション内蔵」** の形に整える。
＝ Miey は「命名ルール？frontmatter？index更新した？」を気にしなくてよくなり、**中身を書くことだけに集中できる**。

文章の創造性（魅力的に書き換える・媒体に合わせて整形する）は master `~/.claude/CLAUDE.md` §7 に従う。**文体・採否の最終判断は必ず Miey**。

---

## 置き場所・命名・フォーマット（唯一の正）

- **置き場所**：`~/Documents/works/obsidian/02_sns-posts/articles/`
  - 完成・下書き記事 … `articles/` 直下にフラット配置
  - ネタ・未作成の種 … `articles/_ideas/`
  - 画像・PDF … `articles/_attachments/`（本文からは `![[ファイル名.png]]` で参照）
  - 一覧 … `articles/_index.md`（**作成・更新したら必ずここも更新**）
  - 発信戦略・分析は `02_sns-posts/_strategy/` `_analytics/`（articles の外・このスキールは触らない）
- **ファイル名**：`YYYY-MM-DD_トピック.md`（日付はネタ発生日 or 作成日）。**日本語OK・省略しない**（`…`や曖昧な短縮は禁止 / Miey は literally 動く）。日付が無い記事は日付プレフィックスなしの説明的な名前でよい。
- **frontmatter（必須）**：
  ```yaml
  ---
  type: sns-article
  topic: <トピック名・日本語可>
  status: ネタ / 下書き / 公開済み
  media: [x, note, cafetalk, threads, facebook, x-article]   # 展開した/する媒体
  created: YYYY-MM-DD
  tags: [tag1, tag2]
  ---
  ```
  公開済みなら `published-note:` `published-x:` 等のURLも足してよい。
- **本文の構成**：媒体ごとに `## ○○版` 見出しで区切る。元ネタ・素材があれば先頭に `## 📌 マスター（元ネタ）`。
  ```
  ## 📌 マスター（元ネタ・素材）
  ## X版
  ## note版
  ## cafetalk版
  ## Threads版（500字ずつ・コピー用）
  ## Facebook版（md記号なし・コピー用）
  ```

---

## 2つのモード

### モード A：新規作成（ひな形 or 内容から記事化）

トリガー例：「新しい記事作って」「これ記事にして」「○○を記事化」＋（任意で本文や1媒体版を貼る）。

1. トピック名・想定媒体・status を Miey の入力から決める（不明なら最小限だけ確認。先回りで根掘り葉掘り聞かない＝master §4.2）。
2. `articles/YYYY-MM-DD_トピック.md` を作成。frontmatter ＋ Miey が指定した媒体の `## ○○版` セクション（中身があれば流し込む／空ならプレースホルダ）。
   - まだ書きかけ・ネタ段階なら `articles/_ideas/` に置き status: ネタ。
3. `articles/_index.md` の表に1行追記。
4. 作成後、**書けたか verify**（Read/grep で確認するまで「作成済み」と言わない＝memory feedback_verify_after_write）してから1行で報告。

### モード B：媒体展開（既存記事に別媒体版を足す）

トリガー例：「note版作って」「cafetalk版作って」「Threads版にして」（対象記事を指すか、直近作業の記事）。

1. 対象の記事ファイルを特定（曖昧なら候補を出して確認）。
2. 既存の本文（マスター or 他媒体版）を素材に、**指定媒体に合わせて整形した `## ○○版` セクションを追記**する。
   - トーンの大方針は `~/Documents/works/obsidian/03_stock/02_IT_AIツール/ai-sns-post-kit.md`（「バズは殺さない・雑さだけ消す」）。
   - X の磨き込みは `~/Documents/works/obsidian/wiki/reference/x-post-editing-craft.md`。
   - 媒体の癖：X＝短文・フック／フォロー導線はリプライ、note＝長文・保存向き・見出し構造、Threads＝500字ずつ連投、Facebook／cafetalk＝プレーン or HTML・コピー用。
   - **意味・主張を変える整形は黙ってやらず、草案を出して Miey に提案**（master §7.3-3）。事実誤認は黙って直す（§7.3-1）。
3. frontmatter の `media:` にその媒体を追加。`articles/_index.md` も更新。
4. verify → 1行報告。「最終文体は Miey が決めてね」を添える。

---

## やらないこと

- 勝手な公開・投稿（ドラフトを作るだけ。投稿は Miey）。
- Miey の文体を AI 風に均す／キャラ表現を本文で連発する（master §7.4・§4.1）。
- `_strategy/` `_analytics/`、cafetalk のレッスン・四柱推命・ポリシー等、articles 外の領域への変更。
- 既存セクションの指定外の書き換え（外科的編集の鉄則・他媒体版を勝手にいじらない）。

## 他AIへの注意

このスキルは Claude Code 専用。Codex / Gemini はスキルを使えないので、同じ運用をするときは `articles/_index.md` 冒頭の「フォーマット定義」と本ファイルの命名・frontmatter 規則に従って手作業で同じ形に揃える。
