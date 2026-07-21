export const meta = {
  name: 'verify-screenshot-contents',
  description: '商品スクショ27枚の中身を実際に見て、想定ラベルと一致するか検証する',
  phases: [
    { title: 'Identify', detail: '各画像を開いて内容を記述し、想定ラベルと照合' },
  ],
}

const IMG_BASE = '/Users/sakamotomitsue/Downloads/obsidian set up'

const ITEMS = [
  { f: 'obsidian/スクリーンショット 2026-06-11 095849.png', intent: '別冊Step1 Obsidian公式サイトのダウンロードページ' },
  { f: 'obsidian/スクリーンショット 2026-06-11 100705.png', intent: '別冊Step1 Obsidianインストール画面' },
  { f: 'obsidian/スクリーンショット 2026-06-11 101400.png', intent: '別冊Step2 Vault名・保存場所の入力ダイアログ' },
  { f: 'obsidian/スクリーンショット 2026-06-11 173111.png', intent: '別冊Step2 Vault作成完了後の画面' },
  { f: 'step2.5 obsidianの初期設定/スクリーンショット 2026-06-12 130641.png', intent: '別冊Step2.5 設定→ファイルとリンク→内部リンクを毎回更新する' },
  { f: 'vscode/スクリーンショット 2026-06-11 103433.png', intent: '別冊Step3 VS Code公式サイトのダウンロードボタン' },
  { f: 'vscode/スクリーンショット 2026-06-11 110450.png', intent: '別冊Step3 VS Code起動直後のウェルカム画面' },
  { f: 'vscode/スクリーンショット 2026-06-11 105807.png', intent: '別冊Step3 VS Codeのサインイン選択画面' },
  { f: 'claude code 拡張/スクリーンショット 2026-06-11 111436.png', intent: '別冊Step3 VS Codeの日本語化(Japanese Language Pack)' },
  { f: 'claude code 拡張/スクリーンショット 2026-06-11 130737.png', intent: '別冊Step4 拡張機能タブでClaude Codeを検索した結果' },
  { f: 'claude code 拡張/スクリーンショット 2026-06-11 132936.png', intent: '別冊Step4 Claude.aiへのサインイン画面' },
  { f: 'claude code 拡張/スクリーンショット 2026-06-11 133034.png', intent: '別冊Step4 「外部のウェブサイトを開きますか」ダイアログ' },
  { f: 'vaultをVScodeで開く/スクリーンショット 2026-06-11 173955.png', intent: '別冊Step5 VS Codeの「フォルダを開く」ダイアログ' },
  { f: 'vaultをVScodeで開く/スクリーンショット 2026-06-11 211102.png', intent: '別冊Step5 「作成者を信頼しますか」ダイアログ' },
  { f: 'vaultをVScodeで開く/スクリーンショット 2026-06-11 213656.png', intent: '別冊Step5 Vaultを開いた直後のVS Code画面' },
  { f: 'step6.  付録Aの初期化プロンプトを実行する/スクリーンショット 2026-06-13 170124.png', intent: '別冊Step6 Claude Codeのモデル設定画面' },
  { f: 'step6.  付録Aの初期化プロンプトを実行する/スクリーンショット 2026-06-19 062051.png', intent: '別冊Step6 初期化後の完成したフォルダツリー' },
  { f: 'ingest/スクリーンショット 2026-06-19 075616.png', intent: '別冊Step7 Ingest成功画面' },
  { f: 'obsidian web clipper/スクリーンショット 2026-06-12 143438.png', intent: '別冊周辺ツール Obsidian Web ClipperのChromeウェブストア画面' },
  { f: 'obsidian web clipper/スクリーンショット 2026-06-19 080009.png', intent: '別冊周辺ツール Web Clipperの保存先(Vault)設定画面' },
  { f: 'AI exporter/スクリーンショット 2026-06-12 150651.png', intent: '別冊周辺ツール AI ExporterのChromeウェブストア画面' },
  { f: 'AI exporter/スクリーンショット 2026-06-12 174617.png', intent: '別冊周辺ツール AI Exporterの書き出しボタン' },
  { f: 'AI exporter/スクリーンショット 2026-06-12 174754.png', intent: '別冊周辺ツール AI Exporterの「名前を付けて保存」ダイアログ' },
  { f: 'calendar plugin/スクリーンショット 2026-06-16 094938.png', intent: '別冊周辺ツール Calendarプラグインの制限モード解除画面' },
  { f: '拡張編/スクリーンショット 2026-06-16 133424.png', intent: '拡張編Skills Skillsパックのダウンロードボタン' },
  { f: '拡張編/スクリーンショット 2026-06-16 134806.png', intent: '拡張編Skills .claude/skills フォルダへの配置' },
  { f: '拡張編/スクリーンショット 2026-06-16 135923.png', intent: '拡張編Skills 新セッションでスキルが効いた成功画面' },
]

const SCHEMA = {
  type: 'object',
  properties: {
    observed: { type: 'string', description: '画像に実際に写っているものの簡潔な説明（日本語・1〜2文）' },
    matches_intent: { type: 'boolean', description: '想定ラベルと実際の内容が一致しているか' },
    mismatch_note: { type: 'string', description: '一致しない場合、実際は何の画像か。一致するなら空文字' },
    slug: { type: 'string', description: 'ファイル名に使う短い日本語スラッグ。例: step1_公式ダウンロードページ。拡張子・スペースなし、アンダースコア区切り' },
  },
  required: ['observed', 'matches_intent', 'mismatch_note', 'slug'],
}

phase('Identify')

const results = await pipeline(
  ITEMS,
  (item, _orig, i) => agent(
    `画像ファイルを Read ツールで開いて、実際に何が写っているか確認してください。\n\n` +
    `ファイル: ${IMG_BASE}/${item.f}\n` +
    `想定ラベル: 「${item.intent}」\n\n` +
    `やること:\n` +
    `1. 画像を実際に見て、写っている内容を簡潔に記述する（observed）\n` +
    `2. 想定ラベルと一致するか判定する（matches_intent）。違う場合は実際が何かを mismatch_note に書く\n` +
    `3. ファイル名用の短い日本語スラッグを提案する（slug）。実際の内容に基づくこと。\n` +
    `   命名規則: 想定ラベル冒頭の区分に合わせ、別冊Stepなら "step3_ウェルカム画面"、\n` +
    `   周辺ツールなら "webclipper_ストア"、拡張編なら "skills_配置" のような形。\n` +
    `   スペース禁止、アンダースコア区切り、短く。\n\n` +
    `注意: 推測で答えないこと。必ず画像を開いて見た内容だけを報告する。`,
    { label: `img:${item.f.split('/').pop().slice(-14, -4)}`, phase: 'Identify', schema: SCHEMA }
  ).then(r => ({ ...r, file: item.f, intent: item.intent, idx: i }))
)

const ok = results.filter(Boolean)
const mismatches = ok.filter(r => !r.matches_intent)

log(`検証完了: ${ok.length}/${ITEMS.length} 枚。想定と不一致 ${mismatches.length} 枚`)

return {
  total: ITEMS.length,
  checked: ok.length,
  mismatches: mismatches.map(r => ({ file: r.file, intent: r.intent, observed: r.observed, note: r.mismatch_note })),
  all: ok.map(r => ({ file: r.file, slug: r.slug, observed: r.observed, matches: r.matches_intent })),
}
