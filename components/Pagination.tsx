import { useState, ChangeEvent } from 'react';
import { default as MaterialPagination } from '@material-ui/lab/Pagination';

export type PaginationProps = {
  page: number;
  count: number;
  onChange: (value: number) => void;
};

export function Pagination({ page: initialPage, count, onChange: onChangePage }: PaginationProps) {
  const [page, setPage] = useState(initialPage);
  const onChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    onChangePage(value);
  };

  return (
    <MaterialPagination
      variant="outlined"
      shape="rounded"
      count={count}
      page={page}
      onChange={onChange}
      data-testid="pagination"
    />
  );
}
