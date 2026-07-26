export const meta = {
  name: 'miey-priority-judge-fable',
  description: 'Fable5で3つの独立した優先順位案を作り、判定して1本に統合する',
  phases: [
    { title: 'Propose', detail: '3つの異なる軸で優先順位案を独立生成', model: 'fable' },
    { title: 'Judge', detail: '3案を採点し弱点を突く', model: 'fable' },
    { title: 'Synth', detail: '勝ち案をベースに統合し最終表を作る', model: 'fable' },
  ],
}

const BRIEF_PATH = '/private/tmp/claude-501/-Users-sakamotomitsue-Documents-works-obsidian/1bd44129-3d3d-4e1f-9df8-403a56174b2a/scratchpad/briefing.md'

const BASE = `まず ${BRIEF_PATH} を Read せよ。これは Miey（日本の個人事業主）の 2026-07-26 時点の事業状況を実地調査した一次ブリーフィングだ。
必要なら vault (/Users/sakamotomitsue/Documents/works/obsidian) 内のファイルを追加で読んでよい。

あなたの仕事は、Miey の diary に載せる「今後の優先順位マップ（2026-07-26版）」の**中身を設計する**こと。
参考にする前版のフォーマットはこれ（列構成は踏襲する）:

| 順位 | 項目 | 重要度 | 緊急度 | 今やること・次アクション |

軸の定義：重要度＝事業の本丸度（中長期の利益期待値）／緊急度＝今すぐ手を動かすべき度。
順位は 🔥1, ⭐2, ⭐3, 4, 5... のほか「土台」「保留」という非数値の枠も使ってよい（前版がそうしている）。

絶対制約：
- ヤフオク／メルカリ 出品・発送 は高順位（上位3以内）に置く。Miey の明示指定。
- eBay出品 を新規行として必ず入れる。
- 体調不良（可処分エネルギー3〜5割・対人セッションはHSPで消耗最大）を前提に組む。
- 9/2〜9/14 は中国旅行で不在。
- Fable5(高性能AI)が使えるのは 8/18 まで。ただしこれは「誰がやるか」に効かせる話であって、事業の優先順位そのものを歪めてはいけない。
- 「中長期で Miey の利益が高くなる確率が高いもの」を上位に。単なる即金だけで並べない。

出力形式：
1. Markdown 表（上記の列構成）。行数は 8〜11 行。「今やること・次アクション」は具体的な動詞で、1〜3文。
2. 表の下に、軸と全体方針を説明する 3〜5 行の地の文。
3. 最後に「この案の設計思想」を3行、「この案が間違っているとしたらどこか」を2行。`

phase('Propose')
const LENSES = [
  { key: 'cash', angle: `**キャッシュフロー最優先の視点**で組め。今後90日でMieyの銀行口座に一番多くの円が入る順に並べる。実績が未確認のもの（＝売れているか分からないもの）は「まず計測する」を先に置く。夢のある将来商品は下げる。` },
  { key: 'asset', angle: `**資産形成（ストック）最優先の視点**で組め。1回の労力が繰り返し収益を生むもの、Mieyが寝ていても働くもの、体調に左右されないものを上に。対人労働集約型は構造的欠陥として下げる。ブランド「AI記憶の書斎」の一貫性を評価軸に入れる。` },
  { key: 'energy', angle: `**エネルギー制約最優先の視点**で組め。可処分3〜5割という制約が最大のボトルネックだと考え、「疲れていても実行できて、かつ利益につながる」ものを上に。着手コストが高いもの・Mieyの意思決定を大量に要求するものは、価値が高くても下げる。ただし「回復してから」で永久に後回しになる罠も避けること。` },
]

const proposals = await parallel(LENSES.map(l => () =>
  agent(`${BASE}\n\n---\n\n今回のあなたの立場：\n${l.angle}`,
    { label: `propose:${l.key}`, phase: 'Propose', model: 'fable', effort: 'high' })
    .then(t => ({ key: l.key, text: t }))
))

const good = proposals.filter(Boolean)
log(`3案生成: ${good.map(g => g.key).join(', ')}`)

phase('Judge')
const bundle = good.map(g => `## 案【${g.key}】\n${g.text}`).join('\n\n---\n\n')

const JUDGE_CRITERIA = [
  { key: 'profit', c: '「中長期でMieyの利益が高くなる確率」の観点。期待値×確度で採点し、希望的観測に乗っている行を名指しで潰せ。' },
  { key: 'feasible', c: '「体調3〜5割のMieyが実際に実行できるか」の観点。絵に描いた餅の行、Mieyの意思決定を過大に要求する行を名指しで潰せ。' },
  { key: 'risk', c: '「見落としているリスク・順序の誤り」の観点。依存関係の逆転（受け皿が無いのに集客する等）、法務・規約リスク、機会損失を名指しで指摘せよ。' },
]

const verdicts = await parallel(JUDGE_CRITERIA.map(j => () =>
  agent(`まず ${BRIEF_PATH} を Read せよ。以下は Miey の優先順位マップの3案だ。

${bundle}

---

あなたは審査員。担当観点：${j.c}

出力：
1. 3案それぞれを 100点満点で採点し、理由を2行ずつ。
2. どの案のどの行が**間違っている**か、具体的に3つ以上。
3. 3案いずれにも無いが、入れるべき行があれば提案せよ（最大2つ）。
簡潔に。`,
    { label: `judge:${j.key}`, phase: 'Judge', model: 'fable', effort: 'high' })
))

phase('Synth')
const final = await agent(`まず ${BRIEF_PATH} を Read せよ。

以下は Miey の優先順位マップの3案と、3人の審査員の講評だ。

${bundle}

---

# 審査講評
${verdicts.filter(Boolean).join('\n\n---\n\n')}

---

あなたの仕事：講評を全て取り込み、**最終版を1本に統合**せよ。勝った案をベースに、他案の良い行を移植し、審査員が潰した行は直すか落とす。

出力は、Miey の diary にそのまま貼れる完成形の Markdown ブロック:

## 今後の優先順位マップ（2026-07-26 / <フェーズ名>）

| 順位 | 項目 | 重要度 | 緊急度 | 今やること・次アクション |
|---|---|---|---|---|
（8〜11行）

そのあとに:
- 軸と全体方針の説明（3〜5行の地の文）
- 「⚡ 体調が3〜5割の日にやること」（3手・各1行・全て低消費）
- 「🗓 8/18まで（Fable5枠）に前倒しすべきもの」（3〜4行。考える重さがボトルネックのタスクだけ。手を動かす量がボトルネックのものは入れない）
- 「❗ 先に潰す穴」（要確認・要判断の項目を3〜5行。Mieyが答えるだけで解決するものを明示）

制約の再確認：ヤフオク/メルカリは上位3以内・eBay行は必須・9/2〜9/14不在・体調前提。
文体は Miey の diary の前版に合わせる（簡潔・断定・絵文字は順位列と見出しの最小限）。装飾過多にしない。
表の「今やること・次アクション」は必ず具体的な動詞で始め、Mieyが読んで即動ける粒度にすること。`,
  { label: 'synth:final', phase: 'Synth', model: 'fable', effort: 'high' })

return { proposals: bundle, verdicts: verdicts.filter(Boolean).join('\n\n===\n\n'), final }
