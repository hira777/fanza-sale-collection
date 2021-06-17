import { renderHook, act } from '@testing-library/react-hooks';

import { usePagination } from './usePagination';

describe('usePagination', () => {
  test('page Props を更新する度に usePagination 内の page が更新される', async () => {
    const props = { page: 1, pageCount: 4, itemsShown: 3 as 3 };
    const { result, rerender } = renderHook(() => usePagination(props));
    expect(result.current.page).toBe(1);
    act(() => {
      result.current.setPage(2);
    });
    expect(result.current.page).toBe(2);
    props.page = 5;
    rerender();
    expect(result.current.page).toBe(5);
  });

  describe('表示するボタンの数が3つの時に正常に動作する', () => {
    test('合計ページ数が表示するボタンの数より多い時にページ番号を変更しても正常に動作する', async () => {
      const props = { page: 1, pageCount: 4, itemsShown: 3 } as const;
      const { result } = renderHook(() => usePagination(props));
      act(() => {
        result.current.setPage(2);
      });
      expect(result.current.paginationNumbers).toEqual([1, 2, 3]);
      act(() => {
        result.current.setPage(props.pageCount - 1);
      });
      expect(result.current.paginationNumbers).toEqual([2, 3, 4]);
    });
  });

  describe('表示するボタンの数が5つの時に正常に動作する', () => {
    test('合計ページ数が表示するボタンの数より少ない時にページ番号を変更しても正常に動作する', async () => {
      const props = { page: 1, pageCount: 4, itemsShown: 5 } as const;
      const { result } = renderHook(() => usePagination(props));
      act(() => {
        result.current.setPage(2);
      });
      expect(result.current.paginationNumbers).toEqual([1, 2, 3, 4]);
      act(() => {
        result.current.setPage(props.pageCount - 1);
      });
      expect(result.current.paginationNumbers).toEqual([1, 2, 3, 4]);
    });
  });

  describe('表示するボタンの数が7つの時に正常に動作する', () => {
    test('合計ページ数が表示するボタンの数より少ない時にページ番号を変更しても正常に動作する', async () => {
      const props = { page: 1, pageCount: 6, itemsShown: 7 } as const;
      const { result } = renderHook(() => usePagination(props));
      act(() => {
        result.current.setPage(2);
      });
      expect(result.current.paginationNumbers).toEqual([1, 2, 3, 4, 5, 6]);
      act(() => {
        result.current.setPage(props.pageCount - 1);
      });
      expect(result.current.paginationNumbers).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('合計ページ数が表示するボタンの数と同じ時にページ番号を変更しても正常に動作する', async () => {
      const props = { page: 1, pageCount: 7, itemsShown: 7 } as const;
      const { result } = renderHook(() => usePagination(props));
      act(() => {
        result.current.setPage(2);
      });
      expect(result.current.paginationNumbers).toEqual([1, 2, 3, 4, 5, 6, 7]);
      act(() => {
        result.current.setPage(props.pageCount - 1);
      });
      expect(result.current.paginationNumbers).toEqual([1, 2, 3, 4, 5, 6, 7]);
    });
  });
});
