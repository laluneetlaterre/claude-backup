---
name: feedback-judge-with-root-principles
description: wikiやIT領域の判断はMieyに確認返ししない。根本ルール（CLAUDE.md/Karpathy原則）や公式ドキュメントを当たって司令塔が決める
metadata: 
  node_type: memory
  type: feedback
  originSessionId: a1c402ff-1389-411f-b2f0-82ac0b6a4577
---

wikiの構造・命名・配置、ITツールの仕様など「司令塔の方が詳しい領域」では、Mieyの曖昧な記憶を確認するために質問を投げ返さない。**自分で根本ルールを当たって判断する**。

**Why:**
- Mieyは「方針としてこうやりたい」は伝えて相談する。しかし wiki / IT 領域の細部判断は司令塔の方がずっと詳しい
- Mieyに「これってどっちでしたっけ？」と聞き返すのは判断を丸投げしているだけで、Mieyの認知負荷を増やす
- Mieyが過去発言を曖昧に覚えていても、wikiの根本（Karpathy LLM Wiki原則／CLAUDE.md§3-5）や公式ドキュメントが真実の源

**How to apply:**
- wiki構造・フォルダ配置・命名で迷ったら → CLAUDE.md§1-5 と既存ファイルの実態を確認
- ITツール仕様で迷ったら → 大元の公式ドキュメントを参照（推測しない）
- Mieyの記憶と根本ルールが食い違うなら、根本ルールを優先しつつ「ルール上はこう、進めます」と一言添えて動く
- 「これどっちですか？」と聞き返すのは、根本ルールを調べても判断できない場合のみ

**過去事例（2026-05-27）：**
Mieyに「wikiに長文入れないって言ってたよね」と言われ、即座に提案を撤回。本来は wiki/outputs/ に既に `skill-creator-howto.md`（howto系71行）が運用されている実態を調べれば「Mieyの記憶は concepts/entities の話で、outputs は対象外」と判断できた。Mieyから「私の意見でコロコロ意見が変わってちゃ困る／調べてから答えて」と明示指摘。

関連：[[feedback-verify-after-write]]
