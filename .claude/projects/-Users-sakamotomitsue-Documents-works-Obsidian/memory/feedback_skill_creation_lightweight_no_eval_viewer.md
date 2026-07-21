---
name: skill-creation-lightweight-no-eval-viewer
description: スキル作成・改善時は eval viewer / ベンチマークHTML を出さない。実戦投入して使いながらレビューする方式が Miey 流
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 8635953c-2b0b-4330-9af0-51d1549ce3d4
---

スキル作成（/skill-creator）で skill-creator 標準の eval viewer（HTMLレビュー画面）・ベンチマーク比較を出したら、Miey から「ただの記事を書いて欲しいだけなのに、HTMLで出力する必要あったの？（笑）実際使わないとわからないから、また今度レビューする」（2026-07-18、sns-article 統合時）。

**Why:** Miey のレビューは「画面で見比べる」より「実運用で使ってみて気になったら直す」。重い評価プロセスは判断疲労とクレジットの無駄（[[minimum-viable-rules]] と同じ思想）。

**How to apply:** スキル作成・改善時は ①ドラフト作成 ②最小限の動作確認（1〜2ケース、可能ならインライン） ③即納品 → 実戦で不満が出たら直す。eval viewer・ベンチマーク・並行サブエージェント比較は Miey が明示的に求めたときだけ。
