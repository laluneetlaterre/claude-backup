---
name: verify
description: スペース幅・NFC/NFD・テーブル自動整形などで .replace() が無効化されているケース多発。書き込み後の grep/read で実態確認するまで「更新した」と Miey に言わない
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 20cabb69-eb16-4823-a55e-1379e70e37cd
---

Mieyからの2026-05-24指摘：「TIPS統合 取り込みマップ更新してる？」 → 司令塔は「更新済」と前メッセージで報告していたが、実際には3行（🔥3/🟡4/🟡5）の `.replace()` が**スペース幅の不一致で無効化**されており、マップは古いままだった。

**Why**:
- Pythonの `content.replace(old, new)` は完全一致が必要
- diary や本文を Miey が手動編集する／Obsidian や VS Code のテーブル自動整形プラグインが走る／NFC/NFD 正規化が走る、などで **書き込み前後でスペース幅・改行・記号が変わる**ことが頻繁にある
- 司令塔が「更新した」と Miey に報告した後、Miey が diary を見ても変わっていない → Miey が「あれ？」と気づいて指摘してくれる
- これは [[feedback_phase_progression_lead]] の「判断疲労を起こさない」と真逆 — 嘘の進捗報告は最悪の判断疲労を生む
- Miey の Vault は日本語ファイル名・テーブル多用なので、この問題が特に起きやすい

**How to apply**:

1. **書き込み系コマンド（Edit / Write / Python `.replace`）の直後に必ず verify**：
   - 単発 Edit → 「The file has been updated」レスポンスがあれば一応OK（Editは完全一致しないとエラーになるため）
   - Python の `.replace()` → 実行後に必ず `grep` または `Read` で**該当箇所が実際に変わっていることを確認**してから完了報告
   - 複数箇所一括書き込み → 全箇所 grep で確認

2. **特に注意するパターン**：
   - テーブル行の更新（スペース幅が変わりやすい）
   - 日本語ファイル名・全角括弧（NFC/NFD 問題）
   - Miey が手動編集した直後のファイル
   - Obsidian や VS Code を開いた状態で編集（自動整形が走る）

3. **`.replace()` で複数箇所処理するときは件数チェック**：
   ```python
   count_before = content.count(old)
   content = content.replace(old, new)
   count_after = content.count(old)
   print(f'置換件数: {count_before - count_after}')
   ```
   期待件数と一致しなければエラー扱い。

4. **行番号ベースの置換が確実**：テーブル行など空白幅が不安定なものは、`.replace()` ではなく行番号で書き換える方が壊れにくい。
   ```python
   lines[i] = '新しい行\n'
   ```

5. **「更新した」報告のフォーマット**：
   - ❌ 悪い：「updated」「✅完了」とだけ書く
   - ✅ 良い：grep結果や変更後の該当行を引用する。Miey が即「ちゃんと変わってる」を確認できる
