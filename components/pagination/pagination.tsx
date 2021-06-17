import * as React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

import { usePagination } from './usePagination';

export type PaginationProps = {
  page: number;
  count: number;
  itemsShown?: 3 | 5 | 7;
  onChange: (value: number) => void;
};

export function Pagination({ page: _page, count, itemsShown = 5, onChange }: PaginationProps) {
  const { paginationNumbers, page, setPage, prevMoreExists, nextMoreExists } = usePagination({
    page: _page,
    pageCount: count,
    itemsShown,
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
