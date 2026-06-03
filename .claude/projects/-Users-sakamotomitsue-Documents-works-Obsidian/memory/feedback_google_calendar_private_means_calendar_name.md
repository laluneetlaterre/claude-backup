---
name: feedback-google-calendar-private-means-calendar-name
description: Miey が「共有しない予定として入れて」等と言ったら、visibility=private ではなく「共有しない予定」という名前のカレンダーを指す
metadata: 
  node_type: memory
  type: feedback
  originSessionId: 505259a8-0189-4df9-846d-a8e239fe9d69
---

Miey が Google カレンダーで「**共有しない予定**として入れて／登録して」と言ったら、それは **`visibility: private`（非公開設定）のことではなく、「共有しない予定」という名前の専用カレンダー** を指す。

**Why:** Miey は Google カレンダーを用途別に複数持っており、`共有しない予定` は「個人用予定」専用の独立カレンダー名（説明欄にも "個人用予定" と記載）。AI が visibility 設定と取り違えて primary カレンダーに作ると、Miey が手動で正しいカレンダーに移し替える二度手間になる。2026-06-02 に司令塔がこのミスをして指摘された。

**How to apply:**
- 「共有しない予定として入れて」「個人予定で入れて」「これは共有しないやつ」等の指示が来たら、`calendarId` に下記を指定する：
  `6b9108708fda79f649f866449eac7ec9845e59699b0445c089348076c510d39b@group.calendar.google.com`
- visibility はカレンダー側で既に非公開なので、event 側の `visibility` は省略してOK（デフォルト）。
- 他のカレンダー：
  - `Life`（primary）: `hydeistpunk10ve@gmail.com` — 共有 / 普段の予定
  - `Cafetalk`: `3716472eb4bed1813ac2e87c060b74dd10e93eb14647a895193db50fd18069d8@group.calendar.google.com` — 仕事用
- カレンダー指定が曖昧なときは聞く（primary に勝手に作らない）。
