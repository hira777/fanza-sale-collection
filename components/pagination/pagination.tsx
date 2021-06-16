import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

export type PaginationProps = {
  page: number;
  count: number;
  pagerCount: number;
  onChange: (value: number) => void;
};

export function Pagination({ page: _page, count, pagerCount, onChange }: PaginationProps) {
  const { paginationNumbers, page, setPage, prevMoreExists, nextMoreExists } = usePaging({
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

function usePaging({
  page: _page,
  pageCount,
  pagerCount = 5,
}: {
  // 現在のページ番号
  page: number;
  // ページ数
  pageCount: number;
  // 表示するボタンの数
  pagerCount?: number;
}) {
  const [page, setPage] = React.useState(_page);
  const prevMoreExists = page > 1;
  const nextMoreExists = pageCount > page;
  const paginationNumbers = [];

  if (prevMoreExists && !nextMoreExists) {
    const startPage = pageCount > pagerCount ? pageCount - pagerCount + 1 : 1;
    for (let paginationNumber = startPage; paginationNumber < pageCount + 1; paginationNumber++) {
      paginationNumbers.push(paginationNumber);
    }
  } else if (!prevMoreExists && nextMoreExists) {
    const maxCount = pagerCount > pageCount ? pageCount : pagerCount;
    for (let paginationNumber = 1; paginationNumber < maxCount + 1; paginationNumber++) {
      paginationNumbers.push(paginationNumber);
    }
  } else if (prevMoreExists && nextMoreExists) {
    const offset = Math.floor(pagerCount / 2);
    let startPage = page - offset;
    let endPage = page + offset;
    if (startPage === 0) {
      startPage = 1;
      endPage += 1;
    } else if (endPage > pageCount) {
      const overCount = endPage - pageCount;
      startPage -= overCount;
      endPage -= overCount;
    }
    for (let paginationNumber = startPage; paginationNumber <= endPage; paginationNumber++) {
      paginationNumbers.push(paginationNumber);
    }
  } else {
    for (let paginationNumber = 1; paginationNumber <= pageCount; paginationNumber++) {
      paginationNumbers.push(paginationNumber);
    }
  }

  return { paginationNumbers, page, setPage, prevMoreExists, nextMoreExists };
}
