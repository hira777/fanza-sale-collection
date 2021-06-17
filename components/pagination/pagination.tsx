import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export type PaginationProps = {
  page: number;
  count: number;
  pagerCount: 3 | 5 | 7;
  onChange: (value: number) => void;
};

export function Pagination({ page: _page, count, pagerCount, onChange }: PaginationProps) {
  const { paginationNumbers, page, setPage, prevMoreExists, nextMoreExists } = usePagination({
    page: _page,
    pageCount: count,
    pagerCount,
  });
  const onClick = (event: React.MouseEvent<HTMLAnchorElement>, paginationNumber: number) => {
    event.preventDefault();
    if (page === paginationNumber) {
      return;
    }
    setPage(paginationNumber);
    onChange(paginationNumber);
  };
  const onClickPrevious = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const newPage = page - 1;
    setPage(newPage);
    onChange(newPage);
  };
  const onClickNext = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const newPage = page + 1;
    setPage(newPage);
    onChange(newPage);
  };

  return (
    <div className="bg-white flex items-center justify-between" data-testid="pagination">
      <div className="flex-1 flex items-center justify-between">
        <div className={`${!prevMoreExists && 'invisible'}`}>
          <a
            href="#"
            className={`relative flex items-center justify-center w-40 h-40 rounded-l border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100`}
            data-testid="pagination-previous"
            aria-hidden={!prevMoreExists}
            onClick={onClickPrevious}
          >
            <span className="sr-only">前へ</span>
            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
        <div className="relative z-0 inline-flex -space-x-px" aria-label="Pagination">
          {paginationNumbers.map((paginationNumber) => (
            <a
              href="#"
              aria-current={paginationNumber == page ? 'true' : undefined}
              className={`relative flex items-center justify-center w-40 h-40 border border-gray-300 text-sm font-medium${
                paginationNumber == page ? ' bg-gray-200 z-10 cursor-default' : ' hover:bg-gray-100'
              }`}
              data-testid="pagination-number"
              key={paginationNumber}
              onClick={(event) => {
                onClick(event, paginationNumber);
              }}
            >
              {paginationNumber}
            </a>
          ))}
        </div>
        <div className={`${!nextMoreExists && 'invisible'}`}>
          <a
            href="#"
            className="relative flex items-center justify-center w-40 h-40 rounded-r border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-100"
            data-testid="pagination-next"
            aria-hidden={!nextMoreExists}
            onClick={onClickNext}
          >
            <span className="sr-only">次へ</span>
            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

type UsePaginationProps = {
  // 現在のページ番号
  page: number;
  // 合計ページ数
  pageCount: number;
  // 表示するボタンの数
  pagerCount?: 3 | 5 | 7;
};

function usePagination({ page: pageProp, pageCount, pagerCount = 5 }: UsePaginationProps) {
  const [page, setPage] = React.useState(pageProp);
  const prevMoreExists = page > 1;
  const nextMoreExists = pageCount > page;
  const range = (start, end) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };
  let paginationNumbers = [];

  if (prevMoreExists && !nextMoreExists) {
    const startPage = pageCount > pagerCount ? pageCount - pagerCount + 1 : 1;
    paginationNumbers = range(startPage, pageCount);
  } else if (!prevMoreExists && nextMoreExists) {
    const maxCount = pagerCount > pageCount ? pageCount : pagerCount;
    paginationNumbers = range(1, maxCount);
  } else if (prevMoreExists && nextMoreExists) {
    const offset = Math.floor(pagerCount / 2);
    const start = page - offset;
    const belowCount = start <= 0 ? -start + 1 : 0;
    const end = page + offset + belowCount;
    const overCount = pageCount - end < 0 ? -(pageCount - end) : 0;
    const startPage = start - overCount > 0 ? start - overCount : 1;
    const endPage = overCount > 0 ? end - overCount : end;

    paginationNumbers = range(startPage, endPage);
  } else {
    paginationNumbers = range(1, pageCount);
  }

  return { paginationNumbers, page, setPage, prevMoreExists, nextMoreExists };
}
