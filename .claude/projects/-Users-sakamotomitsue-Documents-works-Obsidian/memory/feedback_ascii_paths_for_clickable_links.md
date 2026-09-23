---
name: feedback_ascii_paths_for_clickable_links
description: Vault内のファイル・フォルダ名は原則ASCII（英数字）。日本語がパスに1文字でも入るとClaude CodeのVSCodeチャットでリンクがクリックで開かない
metadata: 
  node_type: memory
  type: feedback
  originSessionId: cc0202aa-18aa-4b83-ad3a-5a249e71f09f
  modified: 2026-09-18T07:46:43.589Z
---

2026-08-09、Claude Code VSCode拡張 v2.1.226 のバンドルを解析して判明した確定事実：**チャット内の Markdown リンクは、パスが全部 ASCII のときだけクリックで開く。日本語が1文字でも混ざると無反応**。

**Why（バグの機序・コード確認済み）**：
- webview のマークダウン描画時、mdast-util-to-hast の `normalizeUri` が **コード127超の文字を全部 percent-encode** する（`サイト一覧.md` → `%E3%82%B5...`）
- リンククリックのハンドラ `aM()` はその**エンコード済み文字列をそのまま filePath として** `open_file` に渡す
- extension 側 `openFile()` に **`decodeURIComponent` が一切無い**。存在しないパスなので `showTextDocument` が reject、しかも **`.catch` が無いので握り潰される** → エラーも出ず「何も起きない」
- `file://` リンクが死ぬのは別要因：react-markdown の urlTransform が **http/https/irc/ircs/mailto/xmpp 以外のスキームを `href=""` に潰す**
- つまり英語圏ユーザーはこの不具合に遭遇しない。Miey の Vault が日本語だらけだから壊れていた

**上流の追跡先**：github.com/anthropics/claude-code/issues/**76328**（2026-07-10 起票・`bug` `area:ide` `has repro` ラベル付きで受理済み・2026-08-09 時点 Open）。Miey が同日 macOS＋欧州言語の追加検証をコメント済み。**拡張がアップデートされたらこの issue を見て、直っていれば本メモの運用（日本語パスはリンクにしない）を緩められる。**

**重要な抜け道（2026-08-09 Miey の実クリックで確認済み）**：**ツール行のファイル名は日本語でもクリックで開く**。`Read` 等のツール行に出るファイル名は、私がツールに渡した**生のパスがそのまま** `opener.open()` に渡る配線で、remark の percent-encode を通らないため。つまり **日本語ファイルを Miey に開かせたいときは、そのファイルを `Read` すればよい**（本文が不要なら `limit: 1`）。文章中の Markdown リンクとは別物。

**How to apply**:
1. **新規ファイル・フォルダは原則 ASCII（ケバブケース）**。Miey 2026-08-09「お客様に渡すなど、明らかに日本語じゃないと不便なもの以外は英語名にしたい」
2. **例外（日本語のままでよい）**：お客様に渡す納品物、`raw/`（原文置き場・Rule 1 で改名不可）、商品教材の本文で Miey が日本語名で探すもの、`diary/`
3. **ファイル名だけ英語にしても無意味**。パス全体が ASCII でないと直らない（日本語フォルダの中の英語ファイルも壊れる）。**フォルダ改名の方がレバレッジが高い**
4. **一気に改名しない**（Miey「今、一気にやるとわからなくなる」）。フォルダは1つずつ提案 → GO をもらってから。ファイルは触ったついでに改名
5. **改名は Obsidian 上でやる**（内部リンクが自動追従する）。CLI で `mv` すると `[[wikilink]]` が全部切れる
6. **日本語パスを案内するときは、以下3点セットを必ず出す**（2026-08-11 Miey 指摘：「何度言っても書いてくれない」＝ルールはあったが実行されていなかった。Markdown リンクだけ出して終わるのは禁止）
   - ① そのファイルを `Read`（`limit: 1` でよい）→ ツール行が唯一クリックで開く経路
   - ② `open "フルパス"` を **1つの```フェンスで**（[[feedback_obsidian_code_block_one_click_copy]]）
   - ③ 文中の Markdown リンクは付けてもよいが、①②の代わりにはならない

**2026-08-09 時点の実測（1194 md ファイル）**：クリックできる（全部ASCII）190 ／ 壊れている 1004（内訳：フォルダ名だけ日本語 115・ファイル名だけ日本語 515・両方 374）。

**2026-09-18 追記（適用範囲の確認）**：このバグは Obsidian Vault 内ローカルファイルパスのクリックにのみ発生する（remark の percent-encode → decode 無しで握り潰される経路）。**Google Drive 等の https:// リンクは対象外**（react-markdown の urlTransform が http/https は素通しするため、日本語名でも正常にクリックできる）。それでも Miey は「Vault 限定ではなく今後は何でも英語で統一したい」と明言（Google Drive フォルダも英語にリネーム：`金融・契約書`→`Finance`、`ソニー銀行`→`Sony Bank`）。**→ Vault 外（Google Drive・Notion 等）でも新規フォルダ・ファイルは原則英語(ASCII)で作る。日本語のままでよい例外は本メモ項目2と同じ基準で判断**。
