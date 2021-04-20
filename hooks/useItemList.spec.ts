import { renderHook, act } from '@testing-library/react-hooks';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { itemListService } from '../services/itemList';
import { useItemList } from './useItemList';

const server = setupServer(
  ...[
    rest.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/ItemList`, (req, res, ctx) => {
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

describe('useItemList', () => {
  const initialResponse = {
    status: 200,
    result_count: 0,
    total_count: 0,
    first_position: 1,
    items: [],
  };
  const initialCategory = '期間限定セール';
  const spyItemListServiceGet = jest.spyOn(itemListService, 'get');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('受け取った引数に応じた正しい初期値を返す', async () => {
    const { result } = renderHook(() =>
      useItemList({ response: initialResponse, category: initialCategory })
    );

    expect(spyItemListServiceGet).toHaveBeenCalledTimes(0);
    expect(result.current.response).toEqual(initialResponse);
    expect(result.current.keyword).toBe(initialCategory);
  });

  test('カテゴリを変更すると、itemListServiceをコールしてデータを取得する', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({ response: initialResponse, category: initialCategory })
    );

    act(() => {
      result.current.setCategory('ブランドストア30％OFF');
    });

    await waitForNextUpdate({});
    expect(spyItemListServiceGet).toHaveBeenCalledTimes(1);
    expect(spyItemListServiceGet).toHaveBeenCalledWith({
      keyword: 'ブランドストア30％OFF',
      offset: 1,
    });
    expect(result.current.response).toEqual({ id: 1 });
    expect(result.current.keyword).toBe('ブランドストア30％OFF');
  });

  test('検索開始位置が2以上の状態でカテゴリを変更すると、検索開始位置を1にしてitemListServiceをコールする', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponse,
        category: initialCategory,
        offset: 101,
      })
    );

    act(() => {
      result.current.setCategory('ブランドストア30％OFF');
    });

    await waitForNextUpdate({});
    expect(spyItemListServiceGet).toHaveBeenCalledTimes(1);
    expect(spyItemListServiceGet).toHaveBeenCalledWith({
      keyword: 'ブランドストア30％OFF',
      offset: 1,
    });
  });

  test('入力値を変更すると、itemListServiceをコールしてデータを取得する', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponse,
        category: initialCategory,
      })
    );

    act(() => {
      result.current.setInputValue('AAA');
    });

    await waitForNextUpdate();
    expect(spyItemListServiceGet).toHaveBeenCalledTimes(1);
    expect(spyItemListServiceGet).toHaveBeenCalledWith({
      keyword: `${initialCategory} AAA`,
      offset: 1,
    });
    expect(result.current.response).toEqual({ id: 1 });
    expect(result.current.keyword).toBe(`${initialCategory} AAA`);
  });

  test('検索開始位置が2以上の状態で入力値を変更すると、検索開始位置を1にしてitemListServiceをコールする', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponse,
        category: initialCategory,
        offset: 101,
      })
    );

    act(() => {
      result.current.setInputValue('AAA');
    });

    await waitForNextUpdate({});
    expect(spyItemListServiceGet).toHaveBeenCalledTimes(1);
    expect(spyItemListServiceGet).toHaveBeenCalledWith({
      keyword: `${initialCategory} AAA`,
      offset: 1,
    });
  });

  test('検索開始位置を変更すると、itemListServiceをコールしてデータを取得する', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponse,
        category: initialCategory,
      })
    );

    act(() => {
      result.current.setOffset(100);
    });

    await waitForNextUpdate();
    expect(spyItemListServiceGet).toHaveBeenCalledTimes(1);
    expect(spyItemListServiceGet).toHaveBeenCalledWith({
      keyword: initialCategory,
      offset: 100,
    });
    expect(result.current.response).toEqual({ id: 1 });
    expect(result.current.keyword).toBe(initialCategory);
  });
});
