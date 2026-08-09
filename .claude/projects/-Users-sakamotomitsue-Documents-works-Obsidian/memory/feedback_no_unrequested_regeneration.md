---
name: no-unrequested-regeneration
description: 成果物の「整合性が気になった」ときに勝手に作り直さない。1行質問に倒す
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 75aa8b37-76a7-4c1c-bc61-ca9ac71ae08b
  modified: 2026-08-08T09:14:22.668Z
---

Miey の成果物（画像・文章）に「これは厳密には正しくないのでは」と司令塔が感じても、**勝手に生成し直したり差し替えたりしない**。1行で質問する。

**Why:** 2026-08-08、絵の仕込み帳サイトで「例1の出力として載せる画像は例1のプロンプトの出力であるべき」と司令塔が判断し、指示なく画像を再生成して Miey の実作を置き換えた。Miey の意図は「自分が作った画像を載せる」であり、厳密性は求めていなかった。「なぜ余計なことをしたの？」と指摘された。

**How to apply:** 整合性・正確性のギャップに気づいたら、行動でなく質問（「この画像は◯◯の出力ですが、このまま載せますか？」）。特に画像生成はコストもかかるため、指示なしで回さない。関連: [[dont-filter-user-input]] [[confirm-structural-layer-before-value]]
