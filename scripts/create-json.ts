import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';
import * as dotenv from 'dotenv';
import {
  ItemListRequestParameters as RequestParameters,
  ItemListResponse as Response,
  ItemInfo,
} from '../types/api/';

dotenv.config();

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const hits = 100;
const initialOffset = 1;

function createClient() {
  const params: RequestParameters = {
    api_id: process.env.API_ID as string,
    affiliate_id: process.env.AFFILIATE_ID as string,
    site: 'FANZA',
    service: 'digital',
    floor: 'videoa',
    hits: hits,
    offset: initialOffset,
    keyword: '％OFF',
    output: 'json',
  };

  return axios.create({
    baseURL: 'https://api.dmm.com/affiliate/v3/',
    params,
  });
}

/**
 * 不快なコンテンツではないかどうか
 * @param item
 */
function notOffensive(item: ItemInfo) {
  const ngCategories = [
    '鬼畜',
    '残虐表現',
    '飲尿',
    '食糞',
    'ゲロ',
    'スカトロ',
    'イラマチオ',
  ];
  return !item.iteminfo.genre.find(({ name }) => ngCategories.includes(name));
}

/**
 * セール品であるかどうか
 * @param item
 */
function isSale(item: ItemInfo) {
  return item.campaign && item.campaign.length > 0;
}

/**
 * 正規化（レンダリングに必要なデータだけ抽出）
 * @param item
 */
function normalize(item: ItemInfo) {
  return {
    product_id: item.product_id,
    title: item.title,
    URL: item.URL,
    imageURL: item.imageURL,
    sampleMovieURL: item.sampleMovieURL?.size_720_480,
    prices: item.prices,
    campaign: item.campaign,
  };
}

const client = createClient();

async function init() {
  const response = await client.get<Response>('/ItemList', {
    params: { ...client.defaults.params },
  });
  const { result } = response.data;
  let items = result.items;
  const totalCount = result.total_count;
  console.log(`totalCount: ${totalCount}`);

  for (let offset = hits + initialOffset; offset < totalCount; offset += hits) {
    await sleep(1000);
    console.log(`fetch offset:${offset}`);
    const response = await client.get<Response>('/ItemList', {
      params: {
        ...client.defaults.params,
        ...{
          offset,
        },
      },
    });
    items = [...items, ...response.data.result.items];
  }

  console.log('write items.json');
  fs.writeFileSync(
    `${path.join(__dirname, '../public')}/items.json`,
    JSON.stringify({
      all: items.filter(notOffensive).filter(isSale).map(normalize),
    })
  );
  console.log('finished!!');
}

init();
