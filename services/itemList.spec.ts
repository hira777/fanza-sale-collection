import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { itemListService } from './itemList';
import { getItems } from '../mocks/items';
import { ItemListResponseResult as Response } from '../types/api';

const items = getItems();
const response: Response = {
  status: 200,
  result_count: 100,
  total_count: 1000,
  first_position: 1,
  items: items,
};
const server = setupServer(
  ...[
    rest.get('http://localhost:3000/api/ItemList', (req, res, ctx) => {
      const query = req.url.searchParams;
      const keyword = query.get('keyword');
      const offset = query.get('offset');

      if (keyword || offset) {
        return res(
          ctx.status(200),
          ctx.json({
            ...response,
            ...{
              items: [keyword ? items[0] : items[1]],
            },
          })
        );
      }

      return res(ctx.status(200), ctx.json(response));
    }),
  ]
);

// すべてのテストの前に、APIのモッキングを確立する。
beforeAll(() => server.listen());

// テスト中に追加したリクエストハンドラをリセットして、他のテストに影響を与えないようにする。
afterEach(() => server.resetHandlers());

// クリーンアップ
afterAll(() => server.close());

describe(`itemList service`, () => {
  it('API にリクエストしてレスポンスを取得する', async () => {
    const result = await itemListService.get();

    expect(result.data).toEqual(response);
  });

  it('keyword パラメータを付与して API にリクエストしてレスポンスを取得する', async () => {
    const result = await itemListService.get({ keyword: 'セール' });

    expect(result.data).toEqual({
      ...response,
      ...{
        items: [items[0]],
      },
    });
  });

  it('offset パラメータを API にリクエストしてレスポンスを取得する', async () => {
    const result = await itemListService.get({ offset: 1 });

    expect(result.data).toEqual({
      ...response,
      ...{
        items: [items[1]],
      },
    });
  });
});
