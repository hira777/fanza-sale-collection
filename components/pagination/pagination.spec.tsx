import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination, PaginationProps } from './';

describe('Pagination', () => {
  test('レンダリングされる', () => {
    const props: PaginationProps = {
      page: 1,
      count: 10,
      pagerCount: 5,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getAllByTestId('pagination-number').length).toBe(props.pagerCount);
  });

  test('指定したページ番号に aria-current が付与される', () => {
    const props: PaginationProps = {
      page: 3,
      count: 5,
      pagerCount: 5,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    expect(screen.getAllByTestId('pagination-number')[2]).toHaveAttribute('aria-current', 'true');
  });

  test('別のページ番号がクリックされた時にonChangeを実行する', () => {
    const props: PaginationProps = {
      page: 1,
      count: 10,
      pagerCount: 5,
      onChange: jest.fn(),
    };
    render(<Pagination {...props} />);
    userEvent.click(screen.getAllByTestId('pagination-number')[0]);
    userEvent.click(screen.getAllByTestId('pagination-number')[1]);
    expect(props.onChange).toHaveBeenCalledWith(2);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });
});
