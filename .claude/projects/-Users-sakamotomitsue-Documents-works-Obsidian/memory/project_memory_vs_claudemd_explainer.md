---
name: project-memory-vs-claudemd-explainer
description: 「memory/ vs CLAUDE.md の違い」を整理した3層表＋判断軸。Obsidian構築商品 or 仮想経営チーム構築の共通解説素材として流用予定
metadata: 
  node_type: memory
  type: project
  originSessionId: 505259a8-0189-4df9-846d-a8e239fe9d69
---

「memory/ と CLAUDE.md（master・project）の違いは？」という Miey の質問に対して、司令塔が即興で出した 3 層表 + 判断軸の説明（2026-06-02）。Miey から「この表と判断軸の説明いいね、Obsidian構築の本文に入れるか、仮想経営チーム構築との共通解説文に入れるかしたい」と評価された。**2026-06-02 に独立共通解説 [[wiki/concepts/ai-memory-three-layer-design]] として確定済**（Obsidian構築・仮想経営チーム両商品から参照する共通ハブ）。

**Why:** Obsidian構築（オンラインレクチャー型）と仮想経営チーム構築の両商品で「AI に持たせる記憶を3層で設計する」発想は中核メカニズムの一つ。Karpathy LLM Wiki / Memex 系の概念を Miey の実運用語彙に翻訳した形になっており、購入者が「自分の AI 環境にも同じ設計を移植できる」言語化として強い。

**How to apply:**
- 教材作成時（特に「AI の記憶設計」「ルール vs メモリ」「全 AI 共通 vs 個別 AI クセ」を扱う章）に、この素材を起点に文章を膨らませる。
- 流用先候補：
  - **本文_AI第二の脳システム_v0**（マスター素材・[[feedback-obsidian-book-master-source]]）：「AI に何を覚えさせるか」の章
  - **仮想経営チーム構築商品**：チームメンバーごとの記憶設計
  - 共通解説：「AI 記憶設計の三層モデル」として独立コンテンツ化も可
- 素材本体（3層表＋判断軸）：

---

### memory / CLAUDE.md（master）/ プロジェクト CLAUDE.md の違い

| 場所 | スコープ | 誰が読む | 何を入れる |
|---|---|---|---|
| `~/.claude/projects/.../memory/` | **Claude Code 専用**（VSCode 司令塔の頭の中） | Claude Code が起動時に自動ロード | 司令塔の観察・クセ・運用調整・「Miey はこう言ったらこう動け」系 |
| `~/.claude/CLAUDE.md`（master） | **全 AI 共通の不可侵ルール** | Claude Code・Codex・Gemini（同期コピー経由） | 指揮系統・編集権限・handoff 運用・大規模操作の事前確認など、全員が守るべき大枠 |
| プロジェクト `CLAUDE.md`（Obsidian/lune 各直下） | **そのプロジェクト固有のスキーマ** | 全 AI（プロジェクト内で起動したとき） | Vault 構造・フロントマター仕様・Ingest/Query/Lint など |

**判断軸**：
- 私だけが知ってればいい / 司令塔の動きの調整 → **memory/**
- 全 AI が同じように動かないと困る / ルール化レベル → **CLAUDE.md（master）**
- Obsidian や lune 固有 → **プロジェクト CLAUDE.md**

---

**関連メモリ**：
- [[feedback-obsidian-book-master-source]] — 本文_AI第二の脳システム_v0 がマスター素材
- [[reference-infoproduct-writing]] — 教材作成時の最優先参照先
- [[feedback-obsidian-construction-naming]] — 「代行」ではなく「オンラインレクチャー型」
