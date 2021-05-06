# fanza-sale-collection

FANZA のセール品を検索できるサービス

## Motivation

FANZA のセール品の検索がし辛いので、本家よりも検索がしやすいサービスを作った。

## Setup

アプリケーションを動作させるためには、`.env.local`を作成し、以下の情報を記述する必要がある。

```
API_ID=[DMM API の API ID]
AFFILIATE_ID=[DMM API の アフィリエイト ID]
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/
NEXT_PUBLIC_SALE_CATEGORIES=[現在セール中のカテゴリ]
```

以下は入力例。

```
API_ID=AAA
AFFILIATE_ID=BBB
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/
NEXT_PUBLIC_SALE_CATEGORIES=期間限定セール,SODクリエイト30%OFF
```

そして、以下のコマンドを実行すればアプリケーションが動作する。

```
npm run dev
```
