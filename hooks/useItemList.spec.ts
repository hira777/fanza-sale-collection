import { renderHook, act } from '@testing-library/react-hooks';

import { getItems } from '../mock/items';
import { getCategories } from '../mock/categories';
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
  const response = getResponse(items);
  const spyItemListService = jest.spyOn(itemListService, 'get');
  modkedItemListService.get.mockResolvedValue(response);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('空の商品リストを返す', async () => {
    const { result } = renderHook(() => useItemList({ category: categories[0] }));

    expect(spyItemListService).toHaveBeenCalledTimes(0);
    expect(result.current.items).toEqual([]);
  });

  test('カテゴリを変更すると、API にリクエストして商品リストを返す', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({ category: categories[0] })
    );

    act(() => {
      result.current.setCategory(categories[1]);
    });

    await waitForNextUpdate({});
    expect(spyItemListService).toHaveBeenCalledTimes(1);
    expect(spyItemListService).toHaveBeenCalledWith({
      keyword: `${categories[1]} `,
    });
    expect(result.current.items).toEqual(items);
  });

  test('入力値を変更してから500ms後、API にリクエストして商品リストを返す', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useItemList({ category: categories[0] })
    );

    act(() => {
      result.current.setInputValue('AAA');
    });

    await waitForNextUpdate();
    expect(spyItemListService).toHaveBeenCalledTimes(1);
    expect(spyItemListService).toHaveBeenCalledWith({
      keyword: `${categories[0]} AAA`,
    });
    expect(result.current.items).toEqual(items);
  });

  test('入力値を変更してから500ms以内だと、まだ API にリクエストしていない', async () => {
    const { result } = renderHook(() => useItemList({ category: categories[0] }));

    act(() => {
      result.current.setInputValue('AAA');
    });

    expect(spyItemListService).toHaveBeenCalledTimes(0);
  });
});
