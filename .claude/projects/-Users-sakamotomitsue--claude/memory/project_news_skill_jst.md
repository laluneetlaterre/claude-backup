---
name: daily-tech-news-email JST日付バグと修正
description: デイリーニューススキルのリモートトリガーがUTC環境で動作するため日付が1日ずれる問題とその修正内容
type: project
originSessionId: 29f844fa-b080-4586-b744-c16c5d71114c
---
デイリーニュースメールスキルはUTC環境のリモートトリガーで動作するため、`datetime.now()` を使うとUTC日付になり1日ずれる問題があった。JST 06:00 = UTC 21:00（前日）なので特に顕著。

**修正済み内容（2026-04-23）：**
1. `skill.py:148` → `datetime.now(ZoneInfo('Asia/Tokyo'))` に変更
2. リモートトリガー（`trig_01NEYsJL4fYcHLfrKDyPnFbH`）のプロンプト → JST明示・`TZ=Asia/Tokyo python3 skill.py` 指示を追加
3. `SKILL.md` → タイムゾーン注意事項セクションを追加

**Why:** リモートトリガーのcron `0 21 * * *`（UTC）= JST 06:00（翌日）。UTC環境では前日の日付になる。

**How to apply:** このスキルや類似のスケジュール実行スクリプトで日付を扱う場合は必ず `ZoneInfo('Asia/Tokyo')` またはシェルで `TZ=Asia/Tokyo` を明示すること。
