---
name: lune 仮想経営チーム プロジェクト
description: ~/Documents/works/lune/ にある Claude Code + Gemini 用の仮想経営チームの場所と構成
type: project
originSessionId: 268e1873-67ee-4fad-8c2b-670f80c2f34f
---
Miey の仮想経営チーム「lune」を 2026-04-30 に構築。

**場所**: `~/Documents/works/lune/`

**構成**：
- `CLAUDE.md` と `GEMINI.md`：両方を司令塔として配置（同じ guidelines を参照）
- `agents/`：8部門・14名のエージェント定義
  - coaching/aria, strategy/{haruto, mei}, product/{ren, sora},
  - marketing/{kaito, yui, riku}, content/{nao, hina, saki},
  - sales/{takumi, akira}, analytics/shun, operations/kento
- `guidelines/`：13冊の共通マニュアル（philosophy, miey-style-guide, brand-guidelines, revenue-roadmap, product-portfolio など）
- `templates/`：13種類の出力テンプレート
- `.claude/commands/`：8部門のルーター

**Why**: 月5万→月100万の収益目標達成のため、特に弱点の「マーケティング」「商品開発」をエージェント陣で重点強化する設計。

**How to apply**:
- ユーザーが「lune」「仮想チーム」「Aria」「Haruto」など部門名・エージェント名で言及したら、このプロジェクトの話
- 編集する場合は CLAUDE.md と GEMINI.md の両方の整合性を保つ
- guidelines への追記は「育てる」運用（即追記OK）
- 価格や公開承認は必ずユーザー確認（escalation-rules.md 準拠）
