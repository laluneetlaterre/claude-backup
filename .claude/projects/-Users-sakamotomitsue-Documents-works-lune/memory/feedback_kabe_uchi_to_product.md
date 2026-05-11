---
name: 壁打ち→情報商材化の運用方針
description: Mieyとの壁打ち会話は将来の情報商材ネタ。テーマごとに 03 stock/ 配下にフォルダを作って会話ログを蓄積する
type: feedback
originSessionId: 067e1fe9-0899-49da-bef0-b073ddeaea66
---
Mieyとの壁打ち会話は、将来 note記事 / Brain / マンツーマンコンサル / Cafetalkコース 等の情報商材として販売することを前提に運用する。

**Why:** Mieyは個人事業主として AI仮想チームで月5万→100万を目指しており、自身のリアルな試行錯誤プロセス自体が商品価値を持つ。「よくわかってない人」のリアルな質問・つまずき・判断の流れは、教科書的記事には絶対ない強みになる（読者が自分を投影しやすい）。2026-05-06のObsidian × LLM Wiki導入セッションで Miey本人が明示。

**How to apply:**

1. **テーマごとにフォルダを作る** — `03 stock/{テーマ名}/` に集約。テーマが違うネタは別フォルダ。
   - 例：`03 stock/ObsidianをLLM管理のWikiにする/`
   - フォルダ名は日本語OK（Mieyの視認性優先）

2. **壁打ちログのファイル名規則** — `YYYY-MM-DD_壁打ちログ_{サブタイトル}.md`
   - 例：`2026-05-06_壁打ちログ_LLM-Wiki導入ゼロから.md`

3. **必ず保存するもの**
   - Mieyの発言（質問・反応・判断）
   - 司令塔の回答（選択肢提示、説明、提案）
   - 司令塔の動き（裏で何をしたか）
   - 生成された成果物の一覧
   - 商品化メモ（売れる要素・媒体候補・固有情報削除リスト）

4. **YAMLフロントマター必須**
   ```yaml
   ---
   type: kabe-uchi-log
   category: {テーマ名}
   title: {サブタイトル}
   date: YYYY-MM-DD
   participants: [Miey, Claude（lune司令塔）]
   status: raw-draft / curated / product-ready
   contains-personal-info: true / false
   product-candidate: true / false
   target-products: [note記事, Brain, コンサル, Cafetalkコース]
   target-audience: {誰が読むか}
   key-themes: [...]
   ingredients-for-product: [...]
   remove-before-publishing: [...]
   ---
   ```

5. **固有情報は削除前提で残してOK** — Miey固有のフォルダ名・lune固有名詞・収益数字・Cafetalk言及・私的事情等は商品化前に削除する運用。raw-draftには含めて構わない。

6. **司令塔は「これは商品ネタになる」と判断したらMiey許可なしに 03 stock/ に追記OK** — `feedback_prompt_evolution_authority.md` と同じ思想。lune本体の改変ではなく、お客様用素材ストック。

7. **テーマ判定が難しい場合はMiey確認** — 既存テーマフォルダに入るか新規かは迷ったら聞く。

8. **クロスリファレンス** — 同テーマで複数セッションがある場合、index.md的なファイルを各テーマフォルダに作って蓄積を可視化することを検討（ネタが3本溜まったら）。

9. **「商品ネタ級」と「lune内部の運用調整」を区別する** — lune の内部ルール（編集ポリシー・挨拶トーン・Git運用・メモリ整理など）に関する会話は、商品素材ではなく**メモリで残せば十分**。壁打ちログは作らない。商品ネタかどうか迷ったら、Mieyから明示の依頼があるまで作らない方を選ぶ。Miey本人「全体的に残したい時は必ず声をかける」（2026-05-09 明示）。
