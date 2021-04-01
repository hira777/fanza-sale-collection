import { renderHook, act } from '@testing-library/react-hooks';

import { getItems } from '../mocks/items';
import { getCategories } from '../mocks/categories';
import { itemListService } from '../services/itemList';
import { useItemList } from './useItemList';

function getResponse(items) {
  return {
    data: {
      status: 200,
      result_count: 100,
      total_count: 100,
      first_position: 1,
      items,
    },
    status: 200,
    statusText: 'OK',
    headers: {},
    config: {},
  };
}

jest.mock('../services/itemList');
const modkedItemListService = itemListService as jest.Mocked<typeof itemListService>;
describe('useItemList', () => {
  const items = getItems();
  const categories = getCategories();
  const initialResponseData = {
    status: 200,
    result_count: 0,
    total_count: 0,
    first_position: 1,
    items: [],
  };
  const response = getResponse(items);
  const spyItemListService = jest.spyOn(itemListService, 'get');
  modkedItemListService.get.mockResolvedValue(response);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('レスポンスの初期値を返す', async () => {
    const { result } = renderHook(() =>
      useItemList({
        response: initialResponseData,
        category: categories[0],
      })
    );

    expect(spyItemListService).toHaveBeenCalledTimes(0);
    expect(result.current.response.items).toEqual(initialResponseData.items);
    expect(result.current.response.resultCount).toBe(initialResponseData.result_count);
    expect(result.current.response.totalCount).toBe(initialResponseData.total_count);
    expect(result.current.response.firstPosition).toBe(initialResponseData.first_position);
    expect(result.current.keyword).toBe(`${categories[0]} `);
  });

  test('カテゴリを変更すると、API にリクエストしてレスポンスを返す', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponseData,
        category: categories[0],
      })
    );

    act(() => {
      result.current.setCategory(categories[1]);
    });

    await waitForNextUpdate({});
    expect(spyItemListService).toHaveBeenCalledTimes(1);
    expect(spyItemListService).toHaveBeenCalledWith({
      keyword: `${categories[1]} `,
      offset: 1,
    });
    expect(result.current.response.items).toEqual(response.data.items);
    expect(result.current.response.resultCount).toBe(response.data.result_count);
    expect(result.current.response.totalCount).toBe(response.data.total_count);
    expect(result.current.response.firstPosition).toBe(response.data.first_position);
    expect(result.current.keyword).toBe(`${categories[1]} `);
  });

  test('検索開始位置（offset）が2以上の状態でカテゴリを変更すると、offset を1にして API にリクエストする', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponseData,
        category: categories[0],
        offset: 101,
      })
    );

    act(() => {
      result.current.setCategory(categories[1]);
    });

    await waitForNextUpdate({});
    expect(spyItemListService).toHaveBeenCalledTimes(1);
    expect(spyItemListService).toHaveBeenCalledWith({
      keyword: `${categories[1]} `,
      offset: 1,
    });
  });

  test('入力値を変更すると、API にリクエストしてレスポンスを返す', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponseData,
        category: categories[0],
      })
    );

    act(() => {
      result.current.setInputValue('AAA');
    });

    await waitForNextUpdate();
    expect(spyItemListService).toHaveBeenCalledTimes(1);
    expect(spyItemListService).toHaveBeenCalledWith({
      keyword: `${categories[0]} AAA`,
      offset: 1,
    });
    expect(result.current.response.items).toEqual(response.data.items);
    expect(result.current.response.resultCount).toBe(response.data.result_count);
    expect(result.current.response.totalCount).toBe(response.data.total_count);
    expect(result.current.response.firstPosition).toBe(response.data.first_position);
    expect(result.current.keyword).toBe(`${categories[0]} AAA`);
  });

  test('検索開始位置（offset）が2以上の状態で入力値を変更すると、offset を1にして API にリクエストする', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponseData,
        category: categories[0],
        offset: 101,
      })
    );

    act(() => {
      result.current.setInputValue('AAA');
    });

    await waitForNextUpdate({});
    expect(spyItemListService).toHaveBeenCalledTimes(1);
    expect(spyItemListService).toHaveBeenCalledWith({
      keyword: `${categories[0]} AAA`,
      offset: 1,
    });
  });

  test('検索開始位置を変更すると、API にリクエストしてレスポンスを返す', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({
        response: initialResponseData,
        category: categories[0],
      })
    );

    act(() => {
      result.current.setOffset(100);
    });

    await waitForNextUpdate();
    expect(spyItemListService).toHaveBeenCalledTimes(1);
    expect(spyItemListService).toHaveBeenCalledWith({
      keyword: `${categories[0]} `,
      offset: 100,
    });
    expect(result.current.response.items).toEqual(response.data.items);
    expect(result.current.response.resultCount).toBe(response.data.result_count);
    expect(result.current.response.totalCount).toBe(response.data.total_count);
    expect(result.current.response.firstPosition).toBe(response.data.first_position);
    expect(result.current.keyword).toBe(`${categories[0]} `);
  });
});
