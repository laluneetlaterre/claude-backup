---
name: no-machine-artifacts-in-user-storage
description: AI が作る検証用ファイル（ハッシュ一覧・manifest・作業ログ）を Miey の保存領域に置き去りにしない
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 4c714c17-83b9-40f6-bfab-96c8a7904488
  modified: 2026-08-13T01:09:03.673Z
---

照合用の manifest／ハッシュ一覧／作業ログなど、**人が読まない機械用ファイルを Miey の保存領域（ボリューム直下・Vault・Documents）に残さない**。作業用は scratchpad に置き、残す価値のある結果は handoff / worklog の .md に文章として書く。

**Why:** 2026-08-13、外付け直下の `100CANON-manifest-md5-20260812.txt` について Miey から「私はあっても見ないから不要なんだけど、AI にとっては必要なの？」と指摘。答えは「必須ではない」— AI は毎回その場でハッシュを計算し直すので過去の記録は使わない。唯一の用途は将来の bit rot 検出だが、コピーが2か所あれば互いを照合すれば済む。Miey の目に入る場所に、Miey が読まないファイルを置くのは純粋なノイズ。

**How to apply:** 照合スクリプトの中間生成物は scratchpad へ。どうしても永続化したいときは、まず「これは Miey が読むものか？」を問い、読まないなら残さない。残す場合は理由を1行で説明して GO を取る。結果の要約は [[feedback_verify_after_write]] のとおり検証してから、[[feedback_always_include_filepaths]] の形式で .md に書く。
