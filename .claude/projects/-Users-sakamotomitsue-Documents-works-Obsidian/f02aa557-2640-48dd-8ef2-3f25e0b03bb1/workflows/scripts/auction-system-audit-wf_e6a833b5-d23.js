export const meta = {
  name: 'auction-system-audit',
  description: 'Audit auction system skills/docs for refinement and customer-transplant readiness',
  phases: [
    { title: 'Audit', detail: 'parallel readers over skills, rules, templates, data' },
    { title: 'Verify', detail: 'cross-check rates and drift claims' },
  ],
}

const FINDINGS = {
  type: 'object',
  required: ['component', 'summary', 'usability_issues', 'portability_blockers', 'quick_wins'],
  properties: {
    component: { type: 'string' },
    summary: { type: 'string', description: '2-3 sentences: what this component does and its overall state' },
    usability_issues: {
      type: 'array',
      items: {
        type: 'object',
        required: ['issue', 'file', 'severity', 'suggestion'],
        properties: {
          issue: { type: 'string' },
          file: { type: 'string' },
          severity: { type: 'string', enum: ['high', 'medium', 'low'] },
          suggestion: { type: 'string' },
        },
      },
    },
    portability_blockers: {
      type: 'array',
      description: 'Miey-specific hardcoding that breaks a customer transplant: absolute paths, personal contract rates, Ben/shared-wallet specifics, personal names/addresses',
      items: {
        type: 'object',
        required: ['blocker', 'file', 'fix'],
        properties: {
          blocker: { type: 'string' },
          file: { type: 'string' },
          fix: { type: 'string', description: 'how to genericize or parameterize it' },
        },
      },
    },
    quick_wins: { type: 'array', items: { type: 'string' } },
  },
}

const CTX = `背景：Miey の Obsidian vault 内メルカリ/ヤフオク出品・売上管理システムを監査する。目的は2つ。
(1) Miey 自身の日常運用をもっと洗練させる（重複・矛盾・迷いポイント・エラーしやすい箇所を潰す）
(2) このシステム一式を「お客様の vault + お客様の Claude Code / Codex」へ移植できる商品パッケージにする準備。ただし rules/運賃表.pdf（佐川急便の Miey 会社契約運賃）は Miey 固有で、パッケージには絶対に含めない。お客様が自分の契約運賃を同じ場所に置けば動く設計にしたい。
ルート: /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/
Claude スキル: /Users/sakamotomitsue/.claude/skills/
読み取り専用の監査。ファイルを一切編集しないこと。
返答は最終テキストではなく StructuredOutput で返す。日本語で書く。severity は「お客様移植 or Miey の日常運用を実際に妨げる度合い」で判定。些末な文体指摘は入れない。`

phase('Audit')

const audits = await parallel([
  () => agent(`${CTX}
担当: auction-listing スキル。以下を全部読む:
- /Users/sakamotomitsue/.claude/skills/auction-listing/SKILL.md と agents/ 配下
- /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/skills/auction-listing/SKILL.md と agents/openai.yaml
チェック観点: ①2コピー間の drift（diff を取り、実質的な差分を列挙）②手順の分かりやすさ・質問フローの無駄 ③絶対パス・Miey固有情報のハードコード ④prompts/（出品文生成_手順.md, prompt-universal.md, mercari-rules.md, yahoo-auction-rules.md, condition-phrases.md）との役割重複・矛盾（該当ファイルも読む）⑤テンプレ 出品メモ_テンプレ.md との整合`, { label: 'audit:auction-listing', phase: 'Audit', schema: FINDINGS }),

  () => agent(`${CTX}
担当: auction-sale-record スキル。以下を全部読む:
- /Users/sakamotomitsue/.claude/skills/auction-sale-record/SKILL.md
- /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/skills/auction-sale-record/SKILL.md
- /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/templates/sale-template.md
チェック観点: ①2コピー間の drift（diff）②売上記録フロー（スクショ→台帳→archived移動）の抜け・曖昧さ ③sales-shared（Ben共有財布・精算サイクル）と sales-miey の分離ロジックがお客様移植時にどう単純化できるか ④絶対パスのハードコード ⑤テンプレとの整合`, { label: 'audit:auction-sale-record', phase: 'Audit', schema: FINDINGS }),

  () => agent(`${CTX}
担当: 配送ナビ2スキルの比較監査。以下を全部読む:
- /Users/sakamotomitsue/.claude/skills/mercari-shipping/SKILL.md
- /Users/sakamotomitsue/.claude/skills/yahoo-auction-shipping/SKILL.md
- /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/rules/shipping.md
チェック観点: ①送料・サイズ・資材データが3ファイルで重複していないか（真実の源はどこか、矛盾する数字はないか——具体的な数字の食い違いを列挙）②2スキルの構造の非対称（片方にあって片方にない機能・出力形式のばらつき）③vault 側 skills/ にこの2スキルのコピーが無い（Codex ユーザーは使えない）ことの影響 ④絶対パス・Miey固有情報`, { label: 'audit:shipping-skills', phase: 'Audit', schema: FINDINGS }),

  () => agent(`${CTX}
担当: sagawa-fare-lookup スキル（Miey固有・移植除外対象の核心）。以下を全部読む:
- /Users/sakamotomitsue/.claude/skills/sagawa-fare-lookup/SKILL.md と scripts/, agents/ 配下
- /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/skills/sagawa-fare-lookup/SKILL.md と scripts/sagawa_fare.py, agents/openai.yaml
チェック観点: ①契約運賃の数字がスクリプト or SKILL.md 内にハードコードされているか（されている場所を全部列挙——パッケージ除外の要）②2コピー間 drift ③「お客様が自分の契約運賃PDF/表を rules/ に置いたら同じスキルが動く」形に汎用化できるか、その設計案 ④他スキル（auction-sale-record 等）からこのスキルへの依存参照`, { label: 'audit:sagawa', phase: 'Audit', schema: FINDINGS }),

  () => agent(`${CTX}
担当: フォルダ構造とドキュメント（お客様が最初に読む層）。以下を全部読む:
- /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/README.md
- sales-miey/README.md, sales-shared/README.md, 出品メモ/README.md, 出品メモ/archived/README.md（同ルート配下）
- dashboards/Miey売上.base と「dashboards/売上 20260314〜.base」（.base は YAML ライクなテキスト。フィルタ条件・パス参照を確認）
チェック観点: ①初見のお客様がこの README 群だけでシステム全体を理解できるか（全体像マップの欠如など）②.base のフィルタ・パスが移植時に壊れる箇所 ③フォルダ命名の一貫性（日本語/英語混在が移植パッケージとして問題になるか）④READMEと実態のズレ`, { label: 'audit:structure-docs', phase: 'Audit', schema: FINDINGS }),

  () => agent(`${CTX}
担当: 実データのテンプレ準拠チェック。以下を読む:
- templates/出品メモ_テンプレ.md と templates/sale-template.md（ルート: /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/）
- 出品メモ/ から3件（Pioneer AVIC-ZH0077 カーナビ.md、タキシード上.md、蛇バッグ.md）
- sales-miey/ から2件（13_Apple iPad 第7世代*.md、15_Mardingtop*.md）と sales-shared/ から2件（09_つば九郎 刺繍キーホルダー.md、11_つば九郎 冷感タオル.md）
チェック観点: ①実ファイルの frontmatter・見出し構造がテンプレと一致しているか（フィールド名のばらつき・欠落を具体的に列挙）②テンプレに無いのに実データに繰り返し現れるフィールド（テンプレ側に取り込むべき）③dashboards の .base が期待するプロパティ名と実データの一致`, { label: 'audit:data-conformance', phase: 'Audit', schema: FINDINGS }),

  () => agent(`${CTX}
担当: reference/ フォルダの棚卸し。以下を読む（ルート: /Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/reference/）:
- mercari/ 配下4ファイル、yahoo_auction/ 配下の .md 全部（PDF は読めないのでファイル名から役割推定でよい）、yahoo_auction/出品予定物/ の2件
チェック観点: ①どれが現役の参照資料で、どれが旧GPTs時代のレガシーか（スキル群がどのファイルを参照しているかは名前から推定でよい）②お客様パッケージに含めるべき/除外すべきの仕分け案 ③出品予定物/ という作業ファイルが reference/ に居る違和感など、置き場所の整理案`, { label: 'audit:reference', phase: 'Audit', schema: FINDINGS }),

  () => agent(`背景: Miey のメルカリ/ヤフオク配送スキルが持つ料金データの鮮度を検証する。今日は 2026-07-25。
まず以下を読んで、記載されている配送方法ごとの料金・サイズ規定を抜き出す:
- /Users/sakamotomitsue/.claude/skills/mercari-shipping/SKILL.md
- /Users/sakamotomitsue/.claude/skills/yahoo-auction-shipping/SKILL.md
次に WebSearch / WebFetch（必要なら ToolSearch で取得）で、メルカリ便（らくらく・ゆうゆう）とヤフオクおてがる配送の 2026年7月時点の公式料金を確認し、スキル記載の数字と食い違うものを列挙する。公式ソース（mercari.com / yahoo 公式ヘルプ）を優先し、確認できなかった項目は「未確認」と明記する。推測で「変わったはず」と書かない。
返答は StructuredOutput で。日本語。`, { label: 'audit:rate-freshness', phase: 'Audit', schema: {
    type: 'object',
    required: ['component', 'summary', 'discrepancies', 'unverified'],
    properties: {
      component: { type: 'string' },
      summary: { type: 'string' },
      discrepancies: {
        type: 'array',
        items: {
          type: 'object',
          required: ['service', 'skill_says', 'official_says', 'source_url'],
          properties: {
            service: { type: 'string' },
            skill_says: { type: 'string' },
            official_says: { type: 'string' },
            source_url: { type: 'string' },
          },
        },
      },
      unverified: { type: 'array', items: { type: 'string' } },
    },
  } }),
])

const [listing, saleRecord, shipping, sagawa, structure, dataConf, reference, rates] = audits

phase('Verify')

// Adversarially verify only the high-severity claims — cheap findings pass through.
const highClaims = []
for (const a of [listing, saleRecord, shipping, sagawa, structure, dataConf, reference]) {
  if (!a) continue
  for (const u of a.usability_issues || []) {
    if (u.severity === 'high') highClaims.push({ from: a.component, ...u })
  }
  for (const b of a.portability_blockers || []) {
    highClaims.push({ from: a.component, issue: b.blocker, file: b.file, severity: 'blocker', suggestion: b.fix })
  }
}

const VERDICT = {
  type: 'object',
  required: ['confirmed', 'note'],
  properties: {
    confirmed: { type: 'boolean' },
    note: { type: 'string', description: '1-2文。反証できたなら理由、確認できたなら根拠ファイル・行' },
  },
}

const verified = await parallel(highClaims.map((c, i) => () =>
  agent(`次の監査指摘が事実か、該当ファイルを実際に読んで検証せよ（読み取り専用）。誇張・誤読なら confirmed=false。
指摘: ${c.issue}
対象ファイル: ${c.file}
提案: ${c.suggestion}
コンテキスト: Miey のオークションシステム（/Users/sakamotomitsue/Documents/works/obsidian/03_stock/auction/ と /Users/sakamotomitsue/.claude/skills/）。日本語で。`, { label: `verify:${i}`, phase: 'Verify', schema: VERDICT })
    .then(v => ({ claim: c, verdict: v }))
))

return {
  audits: {
    listing, saleRecord, shipping, sagawa, structure, dataConf, reference, rates,
  },
  highClaimVerification: verified.filter(Boolean),
}