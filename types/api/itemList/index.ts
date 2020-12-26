type Site = 'FANZA' | 'DMM.com';

// ソート順。 rank: 人気, price: 価格が高い順, -price: 価格が安い順, date: 新着, review: 評価, match: マッチング順
type Sort = 'rank' | 'price' | '-price' | 'date' | 'review' | 'match';

// 絞り込み項目。 actress: 女優, author: 作者, genre: ジャンル, series: シリーズ, maker: メーカー
type Article = 'actress' | 'author' | 'genre' | 'series' | 'maker';

// 在庫絞り込み。 stock: 在庫あり, reserve: 予約受付中, mono: DMM通販のみ, dmp: マーケットプレイスのみ
type Stock = 'stock' | 'reserve' | 'mono' | 'dmp';

// 配信タイプ
type DeliveryType = 'hd' | 'download' | 'stream' | 'androiddl' | 'iosdl';

type Delivery = {
  type: DeliveryType;
  price: string;
};

type ItemListReuiredRequestParameters = {
  // 登録時に割り振られたID
  api_id: string;
  // 登録時に割り振られた990～999までのアフィリエイトID
  affiliate_id: string;
  // 一般（DMM.com）かアダルト（FANZA）か
  site: Site;
};

type ItemListOptionalRequestParameters = {
  // フロアAPIから取得できるサービスコードを指定
  service?: string;
  // フロアAPIから取得できるフロアコードを指定
  floor?: string;
  // 取得件数（最大100）
  hits?: number;
  // 検索開始位置
  offset?: number;
  // ソート順
  sort?: Sort;
  // キーワード
  keyword?: string;
  // 商品ID
  cid?: string;
  // 絞りこみ項目
  article?: Article;
  // 絞り込みID
  article_id?: string;
  // 発売日絞り込み（指定した日付以降に発売された商品を取得できる）
  gte_date?: string;
  // 発売日絞り込み（指定した日付以前に発売された商品を取得できる）
  lte_date?: string;
  // 在庫絞り込み
  mono_stock?: Stock;
  // 出力形式
  output?: 'json' | 'xml';
  // コールバック
  callback?: string;
};

export type ItemListRequestParameters = ItemListReuiredRequestParameters &
  ItemListOptionalRequestParameters;

type ItemInfo = {
  service_code: string;
  service_name: string;
  floor_code: string;
  floor_name: string;
  category_name: string;
  content_id: string;
  product_id: string;
  title: string;
  volume: string;
  review: {
    count: number;
    average: string;
  };
  URL: string;
  URLsp: string;
  affiliateURL: string;
  affiliateURLsp: string;
  imageURL: {
    list: string;
    small: string;
    large: string;
  };
  sampleImageURL: {
    sample_s: {
      image: string[];
    };
  };
  sampleMovieURL?: {
    size_476_306: string;
    size_560_360: string;
    size_644_414: string;
    size_720_480: string;
    pc_flag: number;
    sp_flag: number;
  };
  prices: {
    price: string;
    deliveries: {
      delivery: Delivery[];
    };
  };
  date: string;
  iteminfo: {
    genre: {
      id: number;
      name: string;
    }[];
    maker: {
      id: number;
      name: string;
    }[];
    actress: {
      id: number;
      name: string;
      ruby: string;
    }[];
    director: {
      id: number;
      name: string;
      ruby: string;
    }[];
    label: {
      id: number;
      name: string;
    }[];
  };
};

export type Items = ItemInfo[];

export type ItemListResponseResultField = Readonly<{
  status: number; // ステータスコード
  result_count: number; // 取得件数
  total_count: number; // 全体件数
  first_position: number; // 検索開始位置
  items: Items;
}>;

export type ItemListResponse = Readonly<{
  request: {
    parameters: {};
  };
  result: ItemListResponseResultField;
}>;
