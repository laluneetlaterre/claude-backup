export const meta = {
  name: 'shikomicho-content-conversion',
  description: 'Obsidian の既存プロンプト20本を、Astro コンテンツコレクション用の Markdown に変換する',
  phases: [
    { title: 'Convert', detail: '各プロンプトファイルを読み、事典1件分のMarkdownに変換して書き出す' },
    { title: 'Audit', detail: '書き出した全件を点検し、抜け・重複・分類の乱れを報告' },
  ],
}

const SRC_DIR = '/Users/sakamotomitsue/Documents/works/obsidian/prompts/images'
const OUT_DIR = '/Users/sakamotomitsue/Documents/works/shikomicho/src/content/cases'

const FILES = [
  { file: '2026-04-17 07-51-16_konmari_nanobanana.md', slug: 'magazine-cover-jp', n: 1 },
  { file: '2026-04-07_09-26-14_magazine_cover_image_prompt_template.md', slug: 'magazine-cover-template', n: 2 },
  { file: '2026-04-07_magazine_cover_prompt_for_saint.md', slug: 'magazine-cover-saint', n: 3 },
  { file: 'アイシングクッキー風ちびキャラ画像生成プロンプト.md', slug: 'icing-cookie-chibi', n: 4 },
  { file: 'signature-world-background-prompt.md', slug: 'signature-world-background', n: 5 },
  { file: '和風スピリチュアル広告ビジュアル生成プロンプト_Midjourney.md', slug: 'spiritual-ad-visual', n: 6 },
  { file: 'Y2K渋谷ファッション女性プロンプト生成テンプレート_Midjourney.md', slug: 'y2k-shibuya-template', n: 7 },
  { file: 'ピンクローズ横顔ポートレート_Midjourney.md', slug: 'pink-rose-profile', n: 8 },
  { file: 'Korean女性喫煙ポートレート_Midjourney.md', slug: 'window-cinematic-portrait', n: 9 },
  { file: 'ホワイトシルクKorean女性ローアングル_Midjourney.md', slug: 'white-silk-low-angle', n: 10 },
  { file: 'バナー金髪Korean女性ポートレート_Midjourney.md', slug: 'platinum-pillow-banner', n: 11 },
  { file: 'ピンクブレザーJapanese女性_Midjourney.md', slug: 'pink-leather-blazer', n: 12 },
  { file: 'オールブラック路地裏Asian女性_Midjourney.md', slug: 'all-black-alley', n: 13 },
  { file: 'コーンロウホログラフィックフェスティバル_Midjourney.md', slug: 'cornrow-holographic', n: 14 },
  { file: '陰陽コーデ2人組ピンク壁_Midjourney.md', slug: 'yin-yang-duo', n: 15 },
  { file: 'レトロアメリカンダイナー2人組_Midjourney.md', slug: 'retro-diner-duo', n: 16 },
  { file: 'バーガンディレース線画オーバーレイ_Midjourney.md', slug: 'burgundy-lace-lineart', n: 17 },
  { file: '90sルーフトップ少女2人_Midjourney.md', slug: '90s-rooftop-duo', n: 18 },
  { file: 'ネオンピンクヘアスパンコールドレス_Midjourney.md', slug: 'neon-pink-sequin', n: 19 },
  { file: 'シャボン玉ヘッドホワイトドレス_Midjourney.md', slug: 'bubble-head-surreal', n: 20 },
]

const SCHEMA_SPEC = `
# 出力先と形式

書き出し先： ${OUT_DIR}/<slug>.md
（Write ツールで新規作成する。既存ファイルは無いので上書き事故の心配はない）

ファイルは以下の frontmatter + 本文の形。**YAMLとして必ず妥当**であること
（日本語のコロンを含む値は必ずダブルクォートで囲む。プロンプト本文は必ずブロックスカラー \`|\` を使う）。

---
number: <通し番号・整数>
title: "<日本語の題名。20字以内。何が作れるかが一目で分かること>"
summary: "<一行説明。40〜60字。どんな絵ができるか＋どんな用途に効くか>"
date: <YYYY-MM-DD。元ファイルの日付が読み取れればそれ、無ければ 2026-08-08>
models: [<このプロンプトが想定/検証されているモデル。使える値: nano-banana / nano-banana-pro / midjourney / chatgpt / imagen>]
needsInput: <true|false。入力画像を必要とするプロンプトなら true>
aspect: "<推奨アスペクト比。不明なら空文字>"
tags: [<日本語のタグを3〜5個。例: ポートレート, 雑誌風, スタイル変換, テンプレート, 商用素材>]
portability:
  chatgpt: <high|medium|low>
  note: "<ChatGPTの画像生成でも同じ結果が出せるかの見立てを1文。根拠も添える>"
images:
  input: ""
  output: ""
prompt: |
  <プロンプト全文をそのまま。改行・記号・YAMLブロック・英文をいじらない>
---

<ここから本文＝Markdown。以下の見出しを必要な分だけ使う>

## 使いどころ
<2〜4文。どういう場面で使うか。Mieyの実務（SNS投稿・サムネ・バナー・商品素材・お客様対応）に引きつけて書く>

## 差し替えポイント
<プロンプト内で変数的に差し替えると別物が作れる箇所を箇条書きで。テンプレート性が低い場合はこの節を省く>

## 摺り方の覚書
<注意点・崩れやすい箇所・うまくいくコツ。元ファイルに情報が無い場合は、プロンプトを読んで技術的に確実に言えることだけ書く。憶測で失敗談を捏造しない>

# 厳守事項
- **プロンプト本文は一字も改変しない**。誤字があってもそのまま（原文の忠実性がこの事典の価値）。
- 元ファイルに無い事実（生成回数・失敗談・実際の出力結果）を**捏造しない**。書けることだけ書く。
- 日本語訳が元ファイルにある場合は、本文の最後に \`## 日本語訳\` 節として残す。
- images の input / output は**空文字のまま**にする（画像はオーナーが後で1つずつ足す）。
- Obsidian の \`![[...]]\` 形式の画像埋め込みが本文にあったら、それは**削除**する（サイトでは使えないため）。
- 元ファイルは**絶対に編集しない**。読み取り専用。
`

phase('Convert')

const results = await pipeline(
  FILES,
  item => agent(`あなたは、画像生成プロンプト事典「絵の仕込み帳」のコンテンツ変換係です。

# 読むファイル
${SRC_DIR}/${item.file}

Read ツールでこのファイルを読んでください。

# やること
このプロンプトを、事典の1エントリとして ${OUT_DIR}/${item.slug}.md に書き出す。
number は ${item.n}、ファイル名の slug は ${item.slug} を使う。

${SCHEMA_SPEC}

# 補足
- ファイル名に \`_Midjourney\` とあるものは models に midjourney を含める。ただし
  「Nano Banana や ChatGPT でも通るか」を portability で必ず評価すること
  （多くの描写系プロンプトは自然言語なので他モデルでも通る。逆に
  \`--ar\` \`--v\` のような Midjourney 専用パラメータや、入力画像の保持精度に依存するものは通りにくい）。
- ファイル名に \`nanobanana\` とあるものは models に nano-banana を含める。
- YAML形式で書かれたプロンプト（yamlart 系）は、YAMLごとプロンプト本文として扱う。

書き終えたら、以下を返してください。`,
    { label: `conv:${item.slug}`, phase: 'Convert', schema: {
      type: 'object',
      properties: {
        slug: { type: 'string' },
        title: { type: 'string' },
        models: { type: 'array', items: { type: 'string' } },
        tags: { type: 'array', items: { type: 'string' } },
        chatgpt_portability: { type: 'string' },
        needsInput: { type: 'boolean' },
        wrote_file: { type: 'boolean' },
        note: { type: 'string', description: '変換で困った点や、オーナーに伝えるべきこと。無ければ空文字' },
      },
      required: ['slug','title','models','tags','chatgpt_portability','needsInput','wrote_file','note'],
    }})
)

const ok = results.filter(Boolean)
log(`${ok.length}/${FILES.length} 件を変換`)

phase('Audit')

const audit = await agent(`画像生成プロンプト事典「絵の仕込み帳」のコンテンツを点検してください。

書き出し先ディレクトリ： ${OUT_DIR}

# やること
1. Bash で \`ls ${OUT_DIR}\` を実行し、何件書き出されたか確認する
2. 全ファイルを読み、以下を点検する：
   - **YAMLとして壊れているファイルがないか**（日本語コロン、インデント崩れ、クォート漏れ、ブロックスカラーの誤用）。これが最重要。壊れていたら Edit で直す
   - number の重複・欠番
   - tags の表記ゆれ（「ポートレート」と「portrait」が混在する等）→ 日本語に統一するよう Edit で直す
   - title / summary が空、または内容が薄いもの
   - prompt が空、または元ファイルの内容と明らかに乖離しているもの
   - \`![[\` が残っていないか（残っていたら削除）
3. tags の全体像を見て、**事典として使えるタグ体系**になっているか評価する。
   バラバラなら、統合案を提示する（実際の統合は報告のみでよい。ただしYAML破損と \`![[\` 残りだけは直すこと）

# 変換係からの申し送り
${JSON.stringify(ok.map(r => ({ slug: r.slug, title: r.title, tags: r.tags, note: r.note })), null, 1)}

日本語で報告してください。`,
  { label: 'audit', phase: 'Audit', effort: 'high', schema: {
    type: 'object',
    properties: {
      file_count: { type: 'number' },
      yaml_errors_fixed: { type: 'array', items: { type: 'string' } },
      other_fixes: { type: 'array', items: { type: 'string' } },
      tag_vocabulary: { type: 'array', items: { type: 'string' }, description: '実際に使われている全タグ' },
      tag_consolidation_proposal: { type: 'string' },
      problems_for_owner: { type: 'array', items: { type: 'string' }, description: 'Mieyが判断すべき残課題' },
      verdict: { type: 'string' },
    },
    required: ['file_count','yaml_errors_fixed','other_fixes','tag_vocabulary','tag_consolidation_proposal','problems_for_owner','verdict'],
  }})

return { converted: ok.length, cases: ok.map(r => ({ slug: r.slug, title: r.title, models: r.models, chatgpt: r.chatgpt_portability })), audit }
