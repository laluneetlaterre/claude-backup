---
name: daily-tech-news-email
description: |
  ユーザーが「news」「ニュース」「デイリーニュース」「ニュースメール作成」と入力したら即座に実行する。
  RSSフィードから最新ニュースを取得し、日本語に翻訳してGmail下書きを自動作成するスキル。
  「news」というコマンド一発で毎朝のニュースメール下書きが完成する。
---

# 毎朝のニュース厳選メール自動作成スキル

## 何をするか

毎朝6時に、テック・世界情勢・不動産・米国動向などの重要ニュースを信頼できるニュースソース20個から厳選し、メール下書き形式でGmail Draftsに自動保存するスキルです。

### 実行フロー

```
毎朝6時 → ニュースソース20個から最新記事取得
       → カテゴリー別分類＆重要度判定
       → 11～13件の重要ニュースを厳選
       → メール下書き形式に整形
       → Gmail Draftsに2つの下書き作成
       → 朝、Gmail Draftsで確認＆送信
```

## トリガー

以下のいずれかを入力したら、このスキルを実行する：
- `news`
- `ニュース`
- `デイリーニュース`
- `ニュースメール作成`

## 実行手順

**ステップ1: RSS記事を取得**

以下のBashコマンドを実行する：

```bash
python3 ~/.claude/skills/daily-tech-news-email/skill.py
```

**ステップ2: 記事を日本語に翻訳**

出力されたJSONの記事（英語タイトル・サマリー）を日本語に翻訳する。
- 翻訳は自然な日本語で、ニュース記事らしい文体にする
- NHK Worldなど元から日本語の記事はそのままにする
- 記事タイトルと要約の両方を翻訳する

**ステップ3: Gmail下書きを2通作成**

翻訳済みの内容で以下の形式でGmail下書きを2通作成する：

件名：`デイリーニュース - [本日の日付]`

**ステップ4: 完了報告**

```
✅ メール下書き作成が完了しました（2通、Gmail Drafts に保存）
```

### 信頼できるRSSニュースソース一覧 (2026年4月時点)

#### 1. 日本のニュース (英語/日本語)
- **NHK World-JAPAN (Top)**: https://www3.nhk.or.jp/rss/news/cat0.xml
- **Nikkei Asia (LATEST)**: https://asia.nikkei.com/rss/feed/nar
- **The Japan Times (Top Stories)**: https://www.japantimes.co.jp/feed/topstories/
- **Kyodo News (English Top)**: https://english.kyodonews.net/rss/news.xml
- **Japan Today (All Stories)**: https://japantoday.com/feed
- **The Mainichi (English News)**: https://mainichi.jp/english/rss/all/index.xml

#### 2. アメリカの主要ニュース
- **The New York Times (Home Page)**: https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml
- **The Wall Street Journal (World News)**: https://feeds.a.dj.com/rss/RSSWorldNews.xml
- **NPR (Top Stories)**: https://feeds.npr.org/1001/rss.xml
- **ABC News (Top Stories)**: https://abcnews.go.com/abcnews/topstories
- **Associated Press (AP News)**: https://news.google.com/rss/search?q=source:Associated_Press&hl=en-US&gl=US&ceid=US:en

#### 3. 世界の主要ニュース
- **BBC News (World)**: https://feeds.bbci.co.uk/news/world/rss.xml
- **Reuters (World News)**: https://news.google.com/rss/search?q=when:24h+allinurl:reuters.com&hl=en-US&gl=US&ceid=US:en
- **The Guardian (International)**: https://www.theguardian.com/international/rss
- **Al Jazeera English (All)**: https://www.aljazeera.com/xml/rss/all.xml
- **Financial Times (Global Home)**: https://www.ft.com/?format=rss
- **France 24 (English)**: https://www.france24.com/en/rss
- **The Economist (The World this Week)**: https://www.economist.com/the-world-this-week/rss.xml

## ニュース厳選スペック
以下のカテゴリは必須です。必ず含めてください。
毎日のカテゴリー別件数（合計5～10件）

| カテゴリー | 件数 | 絵文字 |
|----------|------|-------|
| テック・AI・Anthoropic・Google・OpenAI | 1~2件 | 🤖 |
| 世界情勢・国際ニュース | 1~2件 | 🌍 |
| 不動産・不動産投資 | 1～2件 | 🏢 |
| アメリカ経済・動向 | 1~2件 | 🇺🇸 |
| 車・自動車業界 | 1～2件 | 🚗 |



### メール形式テンプレート

```
【件名】
デイリーニュース - 2026年4月19日

【本文】
おはようございます。本日のニュース厳選13件をお知らせいたします。

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【🤖 テック・AI・スタートアップ】(3件)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

【1】ニュースタイトル
ニュース本文の説明（1～2段落）
📰 記事：Reuters（https://example.com）

【2】ニュースタイトル
ニュース本文の説明（1～2段落）
📰 記事：Bloomberg（https://example.com）

...

【📚 引用ニュースサイト一覧】

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

本メールで引用したニュースソース：
- Reuters
- Bloomberg
- NPR

本日もよろしくお願いいたします。
```

### メール形式の重要要件

1. **すべてのニュースに完全なURL記載**
   - 各ニュース後に「📰 記事：[ソース名]([URL])」を記載
   - URLは必ず https:// または http:// で始まる完全なURL

2. **信頼できるソースのみ使用**
   - 上記20のニュースソースからのみ引用
   - 出所を必ず明記

3. **メール構成**
   - 冒頭：「おはようございます。本日のニュース厳選[件数]件をお知らせいたします。」
   - 各カテゴリーをセパレータ（━）で区切る
   - カテゴリー名の後に「(件数)」を記載
   - 各ニュースに通し番号【1】【2】【3】...を付与
   - 末尾に「【📚 引用ニュースサイト一覧】」セクションを追加

4. **最後に引用サイト一覧を記載**
   - メール末尾に実際に引用したニュースサイトのみをリストアップ
   - 重複は避ける
   - 「本日もよろしくお願いいたします。」で締める

## Gmail Drafts保存仕様

2つの下書きを作成：

**下書き1：hydeistpunk10ve@gmail.com 宛**
- 件名：デイリーニュース - [本日の日付]（例：デイリーニュース - 2026年4月19日）
- 宛先：hydeistpunk10ve@gmail.com

**下書き2：saintnyah@gmail.com 宛**
- 件名：デイリーニュース - [本日の日付]
- 宛先：saintnyah@gmail.com

**注意：** メール本文は両方の下書きで同一内容

## 完了メッセージ

メール下書き作成が完了したら：

```
「メール下書き作成が完了しました（2通、Gmail Drafts に保存）」
```

その後、下書きのリンクと簡潔な完了報告を提示してください。

## タイムゾーン注意事項（必読）

このスキルのリモートトリガー（`trig_01NEYsJL4fYcHLfrKDyPnFbH`）は **UTC環境** で動作します。

| 実行タイミング | UTC | JST |
|--------------|-----|-----|
| cron実行 | `0 21 * * *`（例：4/22 21:00 UTC） | 翌日06:00 JST（4/23 06:00） |

### ルール
- **`skill.py`**: `datetime.now(ZoneInfo('Asia/Tokyo'))` を使う（`datetime.now()` は UTC になるため禁止）
- **Bash での日付取得**: `TZ=Asia/Tokyo date '+%-Y年%-m月%-d日'` を使う
- **LLMへの指示**: プロンプトに「JST = UTC+9」の明示が必須

## 重要なポイント

- ✅ 自動送信ではなく下書き保存 - ユーザーが内容確認後に送信
- ✅ 複数メールアドレス対応 - 2つのアドレス宛に同時作成
- ✅ 信頼性重視 - Reuters、Bloomberg等の信頼できるソースのみ
- ✅ 日付自動付与 - メール件名に当日の日付が自動付与（**必ずJST日本時間**で取得。UTC日付厳禁）
- ✅ 視認性の高いフォーマット - 絵文字とセパレータで見やすく整形
- ✅ 完全なURL記載 - すべてのニュース項目に記事の完全なURLを記載
