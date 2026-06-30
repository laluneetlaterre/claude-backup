---
name: project_ai_session_log_diary
description: 全AIセッションログをゼロLLMで集約しdiaryに流すツール。四柱推命商品への将来応用あり
metadata: 
  node_type: memory
  type: project
  originSessionId: 049404f9-2c99-4a5e-929c-a70eaa193528
---

りお（X @Rio_working）のツイートを起点に2026-06-27構築。Claude Code / Codex / Gemini CLI の**全セッションログをPythonで読むだけ（LLM呼び出しゼロ・約1.5秒）**で、指定日（JST 0:00〜24:00・開始時刻基準）の全AI作業を1本のタイムラインに集約するツール。

- スクリプト：`00_obsidian_system_files/scripts/ai_session_log.py`（`python3 … [YYYY-MM-DD]`）
- ログ場所：Claude=`~/.claude/projects/*/*.jsonl`（ai-title）／Codex=`~/.codex/sessions/年/月/日/rollout-*.jsonl`（session_meta）／Gemini=`~/.gemini/tmp/<proj>/chats/session-*.jsonl`
- `/diary` スキルを改造済み：起動時にこのスクリプトを走らせ→重複統合→チェック欄のみ書込。**どのツールから打っても3AI全部拾う＝1回打てば済む**（各タブで打つ不要）。

**設計の背骨（判断主権）**：Python＝生ログを全部そのまま拾う／AI＝重複統合・選別だけ。AIの要約を本人の言葉にしない。diaryは🤖AIログゾーン（チェック欄）と✍️本人ゾーン（振り返り）の2ゾーンで、AIは本人ゾーンを絶対に触らない。分類（相談/決定/実行/未決）はMieyがNG→フラット時系列。

**将来応用（今はやらない）**：四柱推命商品（[[project_uranai_obsidian_product_concept]]）に同型を載せ、「お客様がその日AIに相談したこと」が自動でdiaryに集約＋本人が日記を足すだけ＝「書かなくても育つ日記」を販売フックにする。プライバシーは複雑な選択UI不要（嫌なら本人が後で消す）。商品化時のみ顧客別分離・保存同意・削除訂正・ローカル処理を検討。
