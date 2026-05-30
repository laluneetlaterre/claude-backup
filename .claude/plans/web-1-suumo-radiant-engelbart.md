# 不動産物件ランチャー＋比較表 Webアプリ 実装計画

## Context

Mieyが物件探しの際、SUUMO / HOME'S / アットホーム / Google 横断検索を毎回それぞれ開いて条件入力するのが手間になっている。さらに、各サイトで気になった物件を頭の中で比較するのも難しい。

そこで「物件条件を1回入れたら4サイトの検索リンクをまとめて生成」＋「気になった物件URLを保存して比較表で並べる」ツールを作る。Benに初期レビューしてもらい「繰り返し比較検討したくなるか」を検証するのが第一の目的。将来は公開してSNS発信・商品化の入り口にもしたいので、規約リスク（スクレイピング・非公開API・外部送信）を完全に避け、静的Webアプリとして実装する。

データはブラウザ内（localStorage）に保存し、JSON/CSV/Markdown でエクスポート可能にする。Obsidian保存へのv2移行を見据え、物件データと検索条件データのスキーマを最初から綺麗に分離する。

---

## 配置場所（Miey GO 取得済み）

```
/Users/sakamotomitsue/Documents/works/property-launcher/
```

- 既存 `works/property/` は書類アーカイブ（請求書・契約・図面）で用途が違うため混ぜない
- 独立リポジトリにして、後で GitHub Pages / Vercel / Cloudflare Pages にデプロイしやすくする
- Obsidian Vault 内には作らない（Vault はノート用、master ルールの編集権限階層に抵触しない場所に置く）

---

## 技術スタック

要件の推奨に従う：

- **Vite** + **React** + **TypeScript**
- **Tailwind CSS**（実用品寄りの落ち着いた見た目、レスポンシブ対応）
- データ保存：**localStorage**（IndexedDB はオーバースペック。物件数100件程度想定）
- ルーティング：シングルページ。タブ切替のみ（react-router 不要）
- 状態管理：React の useState / useReducer のみ（Redux 等不要）
- ID生成：`crypto.randomUUID()`
- 外部API・サーバー通信：**一切なし**（CSP的にも `connect-src 'none'` で動く想定）

---

## ディレクトリ構成

```
property-launcher/
├── README.md              # 起動方法・データ仕様・URL生成ルール
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── index.html
├── .gitignore
└── src/
    ├── main.tsx
    ├── App.tsx              # タブ切替（検索 / 比較表 / エクスポート）
    ├── index.css            # Tailwind directives
    ├── types.ts             # Property, SearchCondition, Status 型
    ├── lib/
    │   ├── storage.ts       # localStorage 抽象（properties / conditions）
    │   ├── urlBuilders.ts   # SUUMO / HOME'S / AtHome / Google の URL生成
    │   ├── calc.ts          # totalMonthly, unitPricePerSqm 計算
    │   ├── exporters.ts     # JSON / CSV / Markdown 出力
    │   └── importers.ts     # JSON取り込み（バリデーション込み）
    ├── components/
    │   ├── TabNav.tsx
    │   ├── SearchConditionForm.tsx
    │   ├── SearchLinkButtons.tsx
    │   ├── SavedConditionsList.tsx
    │   ├── PropertyForm.tsx          # 物件URL+メタ手入力
    │   ├── PropertyList.tsx          # モバイル用カード表示
    │   ├── ComparisonTable.tsx       # デスクトップ用テーブル（横スクロール）
    │   ├── FilterBar.tsx             # 比較表の絞り込み
    │   └── ExportImportPanel.tsx
    └── hooks/
        └── useLocalStorage.ts        # 汎用フック
```

---

## データスキーマ（v2 でObsidian移行しやすい設計）

`src/types.ts` に定義：

```typescript
export type PropertyStatus = 'interested' | 'want_to_view' | 'inquired' | 'rejected';

export type Property = {
  id: string;
  propertyName: string;
  url: string;
  siteName: string;          // 'SUUMO' | 'HOME\'S' | 'アットホーム' | 'その他'
  rent: number;              // 万円ではなく円で統一
  managementFee: number;
  deposit: number;
  keyMoney: number;
  totalMonthlyCost: number;  // 計算済みで保持（エクスポート簡単化）
  areaSqm: number;
  unitPricePerSqm: number;   // 計算済みで保持
  layout: string;            // '1LDK' 等
  walkingMinutes: number;
  buildingAge: number;
  address: string;
  status: PropertyStatus;
  memo: string;
  createdAt: string;         // ISO 8601
  updatedAt: string;
};

export type Preferences = {
  bathToiletSeparate: boolean;
  secondFloorPlus: boolean;
  petAllowed: boolean;
  autoLock: boolean;
  deliveryBox: boolean;
  southFacing: boolean;
  internetFree: boolean;
  reheating: boolean;
  independentVanity: boolean;
};

export type SearchCondition = {
  id: string;
  name: string;
  area: string;
  station: string;
  maxRent: number;
  includeManagementFee: boolean;
  layouts: string[];
  minAreaSqm: number;
  maxWalkingMinutes: number;
  maxBuildingAge: number;
  preferences: Preferences;
  createdAt: string;
  updatedAt: string;
};
```

localStorage キー：`property-launcher:properties:v1` / `property-launcher:conditions:v1`（バージョン付けでv2移行時に並存可能）。

---

## URL生成ルール（規約・実装可能性のリアル）

不動産各サイトはクエリパラメータ仕様を公開していない部分が多く、完全再現は不可能。**「可能な範囲」のフォールバック戦略**を `urlBuilders.ts` に明記する：

| サイト | 戦略 |
|---|---|
| **SUUMO** | エリア（都道府県）・キーワード（駅名/エリア名）・家賃上限・専有面積下限を、公開されている `https://suumo.jp/jj/chintai/ichiran/FR301FC001/` 系のクエリ（`kw`, `cb`, `ct`, `mb` 等）で組み立てる。不明な部分はキーワード検索にフォールバック |
| **HOME'S** | `https://www.homes.co.jp/chintai/` のフリーワード検索 `?free_word=` をベースに、家賃上限など分かるパラメータを追加 |
| **アットホーム** | `https://www.athome.co.jp/chintai/` のキーワード検索ベース |
| **Google横断** | `https://www.google.com/search?q=site:suumo.jp OR site:homes.co.jp OR site:athome.co.jp [駅名] [家賃] [間取り]` |
| **全部まとめて開く** | 上記4つを `window.open()` で順に開く（ポップアップブロック対策の注意書きをUIに表示） |

ボタン押下 → 通常の `<a target="_blank">` または `window.open()` でユーザーのブラウザに新タブを開かせるだけ。**fetch しない・iframe で読み込まない**ので、規約リスクなし。

完全再現できなかった条件は、ボタン下に「※詳細条件はサイト側で再設定が必要な場合があります」と明示。

---

## 主要画面・機能

### タブ構成（シングルページ・タブ切替）

1. **🔍 検索条件** — フォーム → 検索ボタン群 → 保存済み条件一覧
2. **📋 比較表** — 物件追加フォーム + テーブル / カード（レスポンシブ）
3. **💾 エクスポート/インポート** — JSON / CSV / Markdown 出力、JSON取り込み

### 1. 検索条件フォーム（`SearchConditionForm.tsx`）

- 全項目を1画面でグルーピング表示（基本条件 / 詳細条件 / こだわり条件）
- スマホでは縦1列、PCでは2列グリッド
- 入力後リアルタイムで `SearchLinkButtons` が更新

### 2. 検索リンクボタン群（`SearchLinkButtons.tsx`）

- `SUUMOで開く` / `HOME'Sで開く` / `アットホームで開く` / `Google横断検索` / `🚀 全部まとめて開く` / `💾 検索条件を保存`
- 各ボタンは `urlBuilders` の関数を呼ぶだけ
- 「全部まとめて開く」は `Promise` で順次 `window.open`（ブラウザのポップアップブロック警告に対応するため、初回のみ事前ガイダンス表示）

### 3. 保存済み検索条件（`SavedConditionsList.tsx`）

- カード形式で一覧（名前 / 主要条件サマリー / 作成日）
- アクション：[再読込] [再検索] [削除]
- 再読込でフォームに値が入る

### 4. 物件追加フォーム（`PropertyForm.tsx`）

- URLペースト → サイト名自動推定（ホスト名でSUUMO/HOME'S/AtHome判別）
- その他項目は手入力
- ステータスは selectbox（気になる / 内見したい / 問い合わせ済み / 見送り）
- 保存時に `totalMonthlyCost` と `unitPricePerSqm` を `calc.ts` で算出

### 5. 比較表（`ComparisonTable.tsx` + `FilterBar.tsx`）

- **PC**：横スクロール可能なテーブル（13列）
- **スマホ**（`md` 未満）：カード形式に切り替え（重要項目のみ：物件名・合計月額・㎡単価・ステータス、タップで詳細展開）
- ソート：列ヘッダクリックで昇順/降順切替（家賃、合計月額、専有面積、㎡単価、駅徒歩、築年数）
- 絞り込みバー：サイト名 / ステータス / 間取り / 家賃上限 / 面積下限
- 各行：[編集] [削除] [URLを開く]

### 6. エクスポート/インポートパネル（`ExportImportPanel.tsx`）

- **JSONエクスポート**：`{ version: '1', properties: [...], conditions: [...] }` をBlobでダウンロード
- **JSONインポート**：fileinput → JSON.parse → スキーマバリデーション → 既存とマージ or 置換を選択
- **CSVエクスポート**：物件のみ（比較表の列に対応）
- **Markdownエクスポート**：要件仕様の表形式そのまま、コピペでObsidian貼り付け可

Markdown出力例：

```markdown
# 物件比較表 (2026-05-28 生成)

| 物件名 | URL | 家賃 | 管理費 | 合計月額 | 広さ | ㎡単価 | 駅徒歩 | メモ |
|---|---|---:|---:|---:|---:|---:|---:|---|
| ○○ハイツ | [リンク](https://...) | 100,000 | 5,000 | 105,000 | 25.0 | 4,200 | 5 | 内見済み |
```

---

## UI方針の具体化

- **起動直後**：タブが既に「🔍 検索条件」と「📋 比較表」両方クリック可能。ランディング画面・チュートリアル無し
- **配色**：Tailwind の `slate` / `zinc` 系をベースに、アクセントは `indigo-600`（落ち着いた実用品トーン）
- **タイポ**：システムフォント（`font-sans`）。装飾なし
- **アイコン**：絵文字を最小限利用（🔍 📋 💾 🚀）。アイコンライブラリは入れない（依存追加を避ける）

---

## 完了条件チェックリスト

- [ ] `npm install && npm run dev` でローカル起動
- [ ] 条件入力 → 検索ボタン4種＋まとめて開く＋保存が動作
- [ ] 保存済み検索条件が localStorage に永続化（リロード後も残る）
- [ ] 物件URL複数を追加・編集・削除可能
- [ ] 比較表に追記・編集・削除可能、㎡単価/合計月額が自動計算
- [ ] ソート・絞り込み動作
- [ ] JSON / CSV / Markdown エクスポート動作
- [ ] JSONインポート（バリデーション込み）動作
- [ ] スマホ画面（375px幅）で破綻しない
- [ ] DevTools の Network タブで「外部リクエストゼロ」を確認（規約リスク証明）

---

## 検証方法（実装後）

1. **起動確認**
   ```bash
   cd /Users/sakamotomitsue/Documents/works/property-launcher
   npm install
   npm run dev
   ```
   ブラウザで `http://localhost:5173` を開く

2. **機能検証シナリオ**
   - 「中目黒 1LDK 30㎡以上」の条件を入力 → 4サイトのリンクが生成され、新タブで開けるか
   - 条件を保存して、リロード後も残るか
   - 3件くらいダミー物件を手入力 → 比較表で㎡単価が計算され、ソート切替できるか
   - JSONエクスポート → 別ブラウザでインポートして同じ状態が再現できるか
   - Markdownエクスポート → Obsidian に貼り付けて表として表示されるか

3. **規約リスク検証**
   - DevTools の Network タブを開いた状態で全機能を操作
   - 外部ドメインへの fetch / XHR が一切発生しないことを確認
   - 各サイトを開くのは `<a target="_blank">` または `window.open()` のみ

4. **Ben レビュー用 README**
   - 「これは何ができるツールか」「使い方」「データはどこに保存されるか」「規約リスク」を README に1ページにまとめ、Ben にレビュー依頼

---

## v2 へ向けたメモ（今回は実装しない）

- Obsidian Vault への直接保存（File System Access API or Obsidian URI scheme）
- Markdown Front Matter 形式での物件メタデータ出力
- 物件画像の手動アップロード（IndexedDB に Blob 保存）
- 検索条件の共有（URLフラグメントにJSON圧縮で埋め込む）
- 公開デプロイ（GitHub Pages / Vercel）

これらは初期版完成・Benレビュー後に検討。
