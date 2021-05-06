import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { itemListService } from './itemList';

const server = setupServer(
  ...[
    rest.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/ItemList`, (req, res, ctx) => {
      const query = req.url.searchParams;
      const keyword = query.get('keyword');
      const offset = query.get('offset');

      if (keyword) {
        return res(ctx.status(200), ctx.json({ id: 2 }));
      }

      if (offset) {
        return res(ctx.status(200), ctx.json({ id: 3 }));
      }

      // itemListService のテストの目的は itemListService が、API の正しいエンドポイントにリクエストして、
      // レスポンスを取得できるかどうかなので、レスポンスの内容自体はなんでも良いと思っている。
      // itemListService のテストで、API が本来返却するものを取得しているかまでをテストするのは、
      // itemListService のテストからは逸脱している気がしており、そのテストは API 自体のテストで行うべきだと思っている。
      // そのため、適当なレスポンスを返却するように指定している。
      return res(ctx.status(200), ctx.json({ id: 1 }));
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
  describe(`get`, () => {
    it('API の正しいエンドポイントにリクエストする', async () => {
      const result = await itemListService.get();

      expect(result.status).toBe(200);
    });

    it('API にリクエストしてレスポンスを取得する', async () => {
      const result = await itemListService.get();

      expect(result.status).toBe(200);
      expect(result.data).toEqual({ id: 1 });
    });

    it('keyword クエリパラメータを付与して API にリクエストし、レスポンスを取得する', async () => {
      const result = await itemListService.get({ keyword: 'セール' });

      expect(result.status).toBe(200);
      expect(result.data).toEqual({ id: 2 });
    });

    it('offset クエリパラメータを付与して API にリクエストし、レスポンスを取得する', async () => {
      const result = await itemListService.get({ offset: 1 });

      expect(result.status).toBe(200);
      expect(result.data).toEqual({ id: 3 });
    });
  });
});
