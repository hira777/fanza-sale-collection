import * as React from 'react';

type UsePaginationProps = {
  // 現在のページ番号
  page: number;
  // 合計ページ数
  pageCount: number;
  // 表示するボタンの数
  itemsShown: 3 | 5 | 7;
};

const range = (start, end) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

export function usePagination({ page: pageProp, pageCount, itemsShown }: UsePaginationProps) {
  const [page, setPage] = React.useState(pageProp);
  const prevMoreExists = page > 1;
  const nextMoreExists = pageCount > page;
  const paginationNumbers = getPaginationNumbers(page, pageCount, itemsShown);

  return { paginationNumbers, page, setPage, prevMoreExists, nextMoreExists };
}

function getPaginationNumbers(page: number, pageCount: number, itemsShown: number) {
  const prevMoreExists = page > 1;
  const nextMoreExists = pageCount > page;

  if (prevMoreExists && !nextMoreExists) {
    const startPage = pageCount > itemsShown ? pageCount - itemsShown + 1 : 1;
    return range(startPage, pageCount);
  } else if (!prevMoreExists && nextMoreExists) {
    const maxCount = itemsShown > pageCount ? pageCount : itemsShown;
    return range(1, maxCount);
  } else if (prevMoreExists && nextMoreExists) {
    const offset = Math.floor(itemsShown / 2);
    const start = page - offset;
    const belowCount = start <= 0 ? -start + 1 : 0;
    const end = page + offset + belowCount;
    const overCount = pageCount - end < 0 ? -(pageCount - end) : 0;
    const startPage = start - overCount > 0 ? start - overCount : 1;
    const endPage = overCount > 0 ? end - overCount : end;
    return range(startPage, endPage);
  } else {
    return range(1, pageCount);
  }
}
