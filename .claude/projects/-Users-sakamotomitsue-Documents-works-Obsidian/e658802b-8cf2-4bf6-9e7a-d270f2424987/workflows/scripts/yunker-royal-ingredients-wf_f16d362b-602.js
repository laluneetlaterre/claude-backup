export const meta = {
  name: 'yunker-royal-ingredients',
  description: 'ユンケルロイヤルの成分を公式情報から特定し、有効成分ごとの薬理・即効性/長期性を検証・統合する',
  phases: [
    { title: '調査', detail: '製品特定・成分表・生薬薬理・ビタミン/アミノ酸薬理・規制区分を並行調査' },
    { title: '検証', detail: '成分表の正確さと即効/長期の切り分けを敵対的に検証' },
  ],
}

const PRODUCT_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    productNameOfficial: { type: 'string', description: '佐藤製薬の正式製品名（ユンケルロイヤル/ユンケルローヤル等）' },
    confirmedExists: { type: 'boolean' },
    variantsFound: { type: 'array', items: { type: 'string' }, description: '「ユンケルロイヤル」で見つかった類似・関連製品名一覧（混同注意用）' },
    regulatoryClass: { type: 'string', description: '第2類医薬品/指定医薬部外品 等' },
    approvedEfficacy: { type: 'string', description: '添付文書・公式の効能効果（原文に近い形で）' },
    servingSize: { type: 'string', description: '1回量/1本容量' },
    caffeine: { type: 'string', description: 'カフェイン含有の有無と量（無水カフェイン等）' },
    activeIngredients: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string' },
          amount: { type: 'string' },
          category: { type: 'string', description: '生薬/ビタミン/アミノ酸/その他' },
        },
        required: ['name', 'amount', 'category'],
      },
    },
    sources: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title: { type: 'string' }, url: { type: 'string' } }, required: ['title', 'url'] } },
    notes: { type: 'string' },
  },
  required: ['productNameOfficial', 'confirmedExists', 'variantsFound', 'regulatoryClass', 'approvedEfficacy', 'activeIngredients', 'caffeine', 'sources', 'notes'],
}

const PHARM_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    analyses: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          ingredient: { type: 'string' },
          action: { type: 'string', description: '薬理作用・体で何をするか' },
          timeframe: { type: 'string', enum: ['即効・一時的', '継続で効く・蓄積型', '両方/条件による', '不明'] },
          timeframeReason: { type: 'string', description: 'なぜその区分か（半減期・作用機序・欠乏補充か刺激か等）' },
        },
        required: ['ingredient', 'action', 'timeframe', 'timeframeReason'],
      },
    },
    sources: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title: { type: 'string' }, url: { type: 'string' } }, required: ['title', 'url'] } },
  },
  required: ['analyses', 'sources'],
}

const VERIFY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ingredientListAccurate: { type: 'boolean' },
    corrections: { type: 'string', description: '成分表・数量の誤り指摘（なければ「なし」）' },
    productConfusionRisk: { type: 'string', description: 'ユンケルの他製品と取り違えている懸念があれば指摘' },
    temporaryVsLongTermVerdict: { type: 'string', description: '全体として一時的効果か長期的効果かの独立見解' },
    caffeineCheck: { type: 'string', description: 'カフェイン有無の再確認結果' },
    concerns: { type: 'string', description: '連用リスク・注意事項（薬機的に断定しすぎない範囲で）' },
    sources: { type: 'array', items: { type: 'object', additionalProperties: false, properties: { title: { type: 'string' }, url: { type: 'string' } }, required: ['title', 'url'] } },
  },
  required: ['ingredientListAccurate', 'corrections', 'productConfusionRisk', 'temporaryVsLongTermVerdict', 'caffeineCheck', 'concerns', 'sources'],
}

phase('調査')

// まず製品特定＋公式成分表（後段の薬理はこれに依存するので先に取る）
const product = await agent(
  `佐藤製薬（SATO）の栄養ドリンク「ユンケルロイヤル」について、公式情報（佐藤製薬 公式サイト yunker.com / satoseiyaku.co.jp、添付文書、医薬品情報）から正確な事実を集めてください。WebSearch と WebFetch を使い、必ず一次情報（公式・添付文書）を優先。

重要な注意：ユンケルには非常に多くの製品（ユンケル黄帝液、ユンケルローヤル、ユンケルスターほか多数）があり、名前が紛らわしい。ユーザーは「ユンケルロイヤル」と書いたが、これが正式には「ユンケルローヤル」等どの製品を指すかを確定し、正式名称・規制区分（第2類医薬品/医薬部外品）・公式の効能効果・1本(1回)量・全有効成分と配合量を、公式表記どおりに列挙してください。カフェイン（無水カフェイン等）の有無と量も必ず確認。該当製品が複数ありうる場合は最有力を1つに絞りつつ variantsFound に候補を残す。`,
  { label: '製品特定+成分表', phase: '調査', schema: PRODUCT_SCHEMA }
)

const ingList = (product?.activeIngredients || []).map(i => `${i.name}(${i.amount}/${i.category})`).join(', ') || '（成分表取得失敗）'

// 生薬薬理 / ビタミン・アミノ酸薬理 / 規制・効能の3方向を並行
const [herbPharm, vitaminPharm, regulatory] = await parallel([
  () => agent(
    `次の成分表のうち「生薬・動物性生薬・ローヤルゼリー類」について、各成分の薬理作用と、効果が「即効・一時的」か「継続で効く・蓄積型」かを、公的・信頼できる情報源（PMDA添付文書、医薬品情報、大学/公的機関、佐藤製薬公式）を WebSearch/WebFetch で確認して判定してください。判定理由（作用機序・強壮 vs 対症）も添える。栄養補給・強壮系は特に「その場の賦活」か「続けて意味が出る」かを明確に。\n\n成分表: ${ingList}\n\n生薬・ローヤルゼリー系のみ対象。ビタミン・アミノ酸・カフェインは別担当。`,
    { label: '生薬薬理', phase: '調査', schema: PHARM_SCHEMA }
  ),
  () => agent(
    `次の成分表のうち「ビタミン類・アミノ酸・タウリン・カフェイン等」について、各成分の薬理作用と、効果が「即効・一時的」か「継続で効く・蓄積型」かを、信頼できる情報源で確認して判定してください。特に:（1）カフェインは覚醒・抗疲労が一時的で半減期で切れること、（2）水溶性ビタミン(B群等)は欠乏補充なら継続的意味、充足者では過剰分は排泄され体感は乏しいこと、を機序ベースで説明。判定理由を必ず添える。\n\n成分表: ${ingList}\n\nビタミン・アミノ酸・カフェイン系のみ対象。生薬は別担当。`,
    { label: 'ビタミン/アミノ酸薬理', phase: '調査', schema: PHARM_SCHEMA }
  ),
  () => agent(
    `「ユンケルロイヤル（佐藤製薬）」の規制区分（第2類医薬品か指定医薬部外品か）と、公式の「効能・効果」原文、用法用量、使用上の注意（連用・カフェイン・妊娠授乳・他薬併用など）を公式/添付文書から確認し、この製品が薬機法上どう位置づけられ、うたえる効果が「一時的な疲労回復・栄養補給」の範囲なのか「体質改善など長期効果」までうたえるのかを整理してください。断定しすぎず出典ベースで。`,
    { label: '規制・効能効果', phase: '調査', schema: PHARM_SCHEMA }
  ),
])

phase('検証')

const verify = await agent(
  `以下は「ユンケルロイヤル（佐藤製薬）」に関する調査結果です。あなたは懐疑的な検証役として、独立にWebSearch/WebFetchで一次情報を当たり、次を厳しくチェックしてください:
1. 成分表・配合量が実在製品と一致するか（別のユンケル製品と取り違えていないか）
2. カフェインの有無の再確認
3. 「一時的効果 vs 長期的効果」の全体判定が妥当か（栄養ドリンクの体感の大半は対症的・一時的という点を含め）
4. 毎日連用した場合の注意点（過剰・カフェイン依存・原疾患の見逃し等）を、薬機法的に断定しすぎない範囲で

【製品特定結果】
${JSON.stringify(product, null, 2)}

【生薬薬理】
${JSON.stringify(herbPharm?.analyses || [], null, 2)}

【ビタミン/アミノ酸薬理】
${JSON.stringify(vitaminPharm?.analyses || [], null, 2)}

【規制・効能】
${JSON.stringify(regulatory?.analyses || [], null, 2)}`,
  { label: '敵対的検証', phase: '検証', schema: VERIFY_SCHEMA }
)

return { product, herbPharm, vitaminPharm, regulatory, verify }
