---
name: CLAUDE.md/GEMINI.md は必ず同時更新
description: lune プロジェクトで Claude 向けファイルを更新するときは、対応する Gemini 向けファイルも必ず同時に同期する
type: feedback
originSessionId: fa882a97-fca6-4cf5-ab77-b4ac4d7e083a
---
lune プロジェクトでは Claude Code と Gemini Code Assist (VS Code) の**両方**が司令塔として実務運用に関与している。CLAUDE.md / GEMINI.md は対のファイルで、共通ルール（ルーティングテーブル、エスカレーション基準、起動時挨拶など）は両方に反映しなければならない。

**Why:**
- 元々の設計思想が「両AIが同一のguidelines/とエージェント定義を参照して同じ挙動をする」というもの（[docs/2026-04-30_initial-setup.md](file:///Users/sakamotomitsue/Documents/works/lune/docs/2026-04-30_initial-setup.md) Phase 2、[docs/2026-05-01_gemini-onboarding.md](file:///Users/sakamotomitsue/Documents/works/lune/docs/2026-05-01_gemini-onboarding.md) で運用確認済み）
- GEMINI.md フッター「CLAUDE.md との整合性」にも明文化されている：「ルーティングテーブルを更新する場合は、必ず両ファイルを同時に更新する」
- 過去に Claude が CLAUDE.md だけ更新して GEMINI.md を放置し、Miey から指摘された（2026-05-01）

**How to apply:**
- CLAUDE.md を更新する作業の最後に、必ず GEMINI.md の対応箇所を確認し同期する
- 同期する内容：ルーティングテーブル、エスカレーション基準、共通の動作原則、起動時挨拶など「両AI共通の運用ルール」
- 同期しない内容：Gemini固有のセクション（「Gemini Code Assist 利用時の注意」「複数領域にまたがる指示への対応（Gemini版）」「CLAUDE.md との整合性」フッター）と、Claude固有のセクション（Agent tool による並列起動の具体例、`.claude/commands/` 配下のスラッシュコマンド名）
- guidelines/, agents/, templates/ は両AIが共通参照するので個別の Gemini 版ファイルは不要
- 新しい Claude 専用機能（slash command 等）を追加した場合は、GEMINI.md にも「Gemini はこのファイルを直接参照する」旨を補足する
