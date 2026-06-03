# いちさんモデル研究 → Miey商品強化プロジェクト

## Context（なぜ今これをやるか）

2026-05-31 夜、Miey がインフルエンサー「いち（市岡）@ichiaimarketer / OpenClawガチ勢」のセミナーに参加。同氏は年商1億・8アカウント並列のAI自動運用・AGI CAMP プラチナ208万円を販売中。プレゼントされた 2 本のPDF（AI社員.pdf / obsidian-vault-template.pdf）を分析した結果：

- いちさんは外向きに「Obsidian はただのメモ帳」と言いつつ、商品本体は**完全に Obsidian Vault 構造**（7層モデル：00-rules / 05-raw-data / 06-todo / 02-company_knowledge / 03-AI_departments / memory / 07-routines）
- これは Miey が既に持っている2つの商品（`products/10_第二の脳セットアップ_Obsidian構築/` と `products/20_仮想経営チーム構築/`）と**完全に同じ世界**を売っている

つまりいちさんは「Mieyの最大級ベンチマーク」かつ「最大級の競合候補」。今ここで構造を内部化して両商品に反映できれば、Mieyは「年商1億の構造を等身大で噛み砕いて教える唯一の人」になれる。逆に何もしないと「いちさんの劣化版」と思われるリスクが高い。

X自動化への着手は **Phase 4 に棚上げ**（売上が立ち、再現シリーズで素材が溜まってから）。最低限主義（master §4.2）に従い、事業ロール分割の物理実装も最初はやらない。**まず知見の反映と商品セールスコピー強化に集中する。**

---

## Goal

1. いちさんPDF 2本を `wiki/sources/` に正式 ingest（Obsidian Vault スキーマ準拠）
2. Miey の現運用 vs いちさん 7 層モデルの**差分マップ**を `wiki/syntheses/` に作成
3. **Obsidian構築商品**（`products/10_`）のセールスコピー・カリキュラムに PDF 知見を反映 → 売上加速
4. **仮想経営チーム商品**（`products/20_`）の差別化設計レビュー → いちさんとの被りを「等身大・個人版・体験ドリブン」軸で分離
5. Codex 参謀に handoff で意見を求める（差別化軸が鈍っていないかチェック）

---

## Out of Scope（今回やらないこと・明示）

- `03_AI_roles/` のような「事業ロール別フォルダ」物理実装 → 商品強化が落ち着いてから検討（最低限主義）
- X 自動化基盤の構築 → 売上＋素材が溜まってから（Phase 4）
- いちさんモデルを丸ごと採用すること → コンセプト劣化版になるリスク
- 6部署（CEO/CMO/CTO/CSO/CFO/CHRO）構造の物理実装 → Miey は個人事業者、不要

---

## Phase 構成

### Phase 1（今日〜今週前半）: 知見の Vault 化

- **1-1**: 両PDF を `wiki/sources/` に ingest
  - 新規ファイル: `wiki/sources/ichioka-2026-ai-employees.md`（AI社員.pdf 要約）
  - 新規ファイル: `wiki/sources/ichioka-2026-vault-template.md`（Vault テンプレPDF 要約）
  - スキーマ: `Obsidian/CLAUDE.md §3` の sources frontmatter 準拠
  - 関連エンティティページ: `wiki/entities/ichioka.md`（新規）
  - 関連概念ページ: `wiki/concepts/ai-employee-factory.md`（新規。2回以上の概念出現しきい値クリア）
- **1-2**: 差分マップ作成
  - 新規ファイル: `wiki/syntheses/miey-vs-ichioka-diff-map.md`
  - いちさん7層 × Miey 現状の比較表（採用 / 改変採用 / 不採用、各理由つき）
  - 最重要：「**いちさんが持っていなくて Miey が持っているもの**」を必ず列挙（差別化素材の発掘）
- **1-3**: `wiki/index.md` と `wiki/log.md` を更新

### Phase 2（今週後半〜来週）: Obsidian構築商品の強化（売上即効性 最優先）

- **2-1**: `products/10_第二の脳セットアップ_Obsidian構築/` の現状セールスコピー把握
- **2-2**: Phase 1 の差分マップを当てて、セールスコピーに**いちさんPDF経由の権威性**（「年商1億のAI起業家がプラチナ208万で売っている構造を、個人がレクチャー型で学べる唯一の場所」相当）を追加
  - メモリ `feedback_obsidian_construction_sales_copy.md` の「unfair advantage / ズルい優位性 / 蓄積した知性」フレームを必ず適用
  - メモリ `feedback_obsidian_construction_naming.md` に従い「代行」とは絶対呼ばない
- **2-3**: カリキュラム本体に「7層モデルの理解」をモジュール追加
- master §7（文章推敲・創造性ルール）に従い、AI から能動的に草案提示する

### Phase 3（Phase 2 と並行）: 仮想経営チーム商品の差別化設計

- **3-1**: `products/20_仮想経営チーム構築/` の現状コンセプト把握
- **3-2**: いちさん「AI社員工場」とのコンセプト被りを直視し、差別化軸を明文化
  - Miey 軸候補：①個人事業者・等身大、②HSP×ADHD 当事者の運用知見、③Codex/Gemini 並行運用の handoff 制、④Karpathy LLM Wiki パターン採用
  - メモリ `user_neuro_profile.md` / `user_observation_log.md` の知見を活用
- **3-3**: 商品の射程定義（誰の・どの規模の・どんな課題を解くか）を1ページで言語化

### Phase 4（保留・着手条件つき）

着手条件：Phase 2 で Obsidian構築商品が販売開始済み、かつ Phase 3 で仮想経営チームのコンセプトが固まったあと。

- 4-1: 事業ロール分割の物理実装検討（`03_AI_roles/obsidian-construction/` 等）
- 4-2: いちさんモデル「再現実験シリーズ」コンテンツ化（X / note / YouTube台本）
- 4-3: X 自動化基盤（→ Miey との「約束」事項）

---

## Critical Files

### 新規作成

- `wiki/sources/ichioka-2026-ai-employees.md`
- `wiki/sources/ichioka-2026-vault-template.md`
- `wiki/entities/ichioka.md`
- `wiki/concepts/ai-employee-factory.md`
- `wiki/syntheses/miey-vs-ichioka-diff-map.md`

### 編集（Phase 2-3）

- `products/10_第二の脳セットアップ_Obsidian構築/` 配下のセールスコピー・カリキュラム関連 md（Phase 2 着手時に Miey 確認の上で特定）
- `products/20_仮想経営チーム構築/` 配下のコンセプト関連 md（Phase 3 着手時に Miey 確認の上で特定）

### 既存更新

- `wiki/index.md`（カタログ追記）
- `wiki/log.md`（作業履歴追記、フォーマット `## [2026-06-01] ingest | ...` 準拠）
- `ai-handoff/AI参謀会議.md`（Codex 参謀への意見要請を1エントリ追記）

### 保護対象（編集絶対しない）

- `raw/いち/` 配下の元PDF・原文MD（Mieyの素材、読むだけ）
- master `~/.claude/CLAUDE.md` 及び `Obsidian/CLAUDE.md`（Phase 1-3 では一切触らない）

---

## ルール適用チェック

- ✅ Rule 1: `products/` は編集前に Miey 許可必要 → Phase 2-3 着手時に各ファイル特定後に GO を取る
- ✅ Rule 2 外科的編集: 指定外には手を加えない
- ✅ Rule 3 大規模操作: Phase 1 で wiki に 5 ファイル新規作成 → これは大規模操作に該当するため、Phase 1 着手前に Miey GO を取る
- ✅ master §4.1 チャレンジ報告応答プロトコル: 本計画ファイルが 5 項目チェック済み（X自動化 Phase 4 棚上げ・撤退条件あり）
- ✅ master §4.2 最低限主義: 事業ロール物理実装は Phase 4 へ
- ✅ master §7 文章推敲ルール: Phase 2-3 のセールスコピー強化時に AI 側から能動的に草案提示

---

## 既存資産の再利用

- `~/Documents/works/obsidian/CLAUDE.md §3` フロントマター仕様（sources / entities / concepts）→ Phase 1-1 で準拠
- `~/Documents/works/obsidian/CLAUDE.md §4 Ingest オペレーション` の手順 → Phase 1-1 の進め方そのまま
- `~/Documents/works/obsidian/CLAUDE.md §5 index.md / log.md 運用` → Phase 1-3
- メモリ `feedback_obsidian_construction_sales_copy.md` → Phase 2-2 で必須適用
- メモリ `feedback_obsidian_construction_naming.md` → Phase 2 全体で禁則ワード
- メモリ `feedback_obsidian_book_master_source.md` → Phase 2-3 で本文_AI第二の脳システム_v0 をマスター素材として活用
- メモリ `user_neuro_profile.md` / `user_observation_log.md` → Phase 3-2 の差別化軸抽出

---

## Verification（完了確認）

### Phase 1 完了条件
- [ ] `wiki/sources/ichioka-2026-ai-employees.md` 存在、frontmatter 完備、200〜500 語の要約
- [ ] `wiki/sources/ichioka-2026-vault-template.md` 同上
- [ ] `wiki/entities/ichioka.md` `wiki/concepts/ai-employee-factory.md` 新規作成
- [ ] `wiki/syntheses/miey-vs-ichioka-diff-map.md` に「採用 / 改変採用 / 不採用」表 + Miey 固有の差別化素材 5 個以上列挙
- [ ] `wiki/index.md` と `wiki/log.md` 更新済み
- [ ] Miey が差分マップを見て「ここを真似する / 真似しない」の判断ができる状態

### Phase 2 完了条件
- [ ] Obsidian構築商品のセールスコピー草案（v1）が `products/10_`配下に保存
- [ ] unfair advantage フレーム適用済み、「代行」呼称なし
- [ ] Miey が「これで売れる」と判断、または修正点が明示されている
- [ ] カリキュラムに 7 層モデル理解モジュール追加（または追加不要と判断）

### Phase 3 完了条件
- [ ] 仮想経営チーム商品の差別化軸 1 ページ言語化済み
- [ ] いちさん「AI社員工場」とのポジショニング比較表
- [ ] Codex 参謀から差別化の鋭さについて意見取得済み（handoff 経由）

### 撤退条件
- Phase 1 の差分マップを作った時点で「Mieyの商品コンセプトといちさんが致命的に重なっていて勝負にならない」と判断した場合 → 仮想経営チーム商品の方向転換を即協議。Obsidian構築側は単独で進める。
- Phase 2 でセールスコピーが Miey にしっくり来ない場合 → master §7-3 に従い再草案、3 回回しても駄目なら Phase 3 を先に進めて軸を固め直す。

---

## Next Action（GO 後の最初の動き）

1. Miey から **Phase 1 着手 GO**（5 ファイル新規作成のため Rule 3 適用）を取得
2. `raw/いち/` 配下の 4 ファイルを Mieyと**要点会話**してから書き始める（CLAUDE.md §4 Ingest オペレーション）
3. `wiki/sources/ichioka-2026-ai-employees.md` から着手 → 1 ファイルできた段階で Miey にレビュー依頼 → OK なら残りを書く
