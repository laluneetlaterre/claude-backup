---
name: reference_cafetalk_auto_calendar
description: Cafetalkの予約は自動でGoogle Calendarに入るので、司令塔がカレンダー登録する必要はない
metadata: 
  node_type: memory
  type: reference
  originSessionId: 74f2d4c9-3e87-4ce8-b691-0337e9a7cf21
  modified: 2026-08-05T12:19:26.139Z
---

Cafetalk で予約が確定すると、**Cafetalk のシステムが自動的に Google Calendar へ予定を入れてくれる**（2026-08-05 Miey確認）。

**Why:** 司令塔が善意で「カレンダーに入れておきますか？」と提案すると、二重登録になるか、Miey に不要な判断を1つ増やすだけになる。

**How to apply:** Cafetalk の予約確定メール（`no-reply@cafetalk.com`）を読んだあと、カレンダー登録を提案・実行しない。予約から拾うべきは日時ではなく「**こちらから先に送るべき連絡があるか**」（例：第◯話からの開始確認、OS申告の依頼）。連絡ログは [[project_cafetalk_student_mail_consolidation]] の置き場所へ。生徒への送信手段は [[reference_cafetalk_message_web_only]] のとおり Web 画面のメッセージ機能のみ。
