import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination, PaginationProps } from './';

describe('Pagination', () => {
  test('レンダリングされる', () => {
    const props: PaginationProps = {
      page: 1,
      count: 10,
      itemsShown: 5,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.getAllByTestId('pagination-number').length).toBe(props.itemsShown);
  });

  test('指定したページ番号に aria-current が付与される', () => {
    const props: PaginationProps = {
      page: 3,
      count: 5,
      itemsShown: 5,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    expect(screen.getAllByTestId('pagination-number')[2]).toHaveAttribute('aria-current', 'true');
  });

  test('別のページ番号がクリックされた時にonChangeを実行する', () => {
    const props: PaginationProps = {
      page: 1,
      count: 10,
      itemsShown: 5,
      onChange: jest.fn(),
    };
    render(<Pagination {...props} />);
    userEvent.click(screen.getAllByTestId('pagination-number')[0]);
    userEvent.click(screen.getAllByTestId('pagination-number')[1]);
    expect(props.onChange).toHaveBeenCalledWith(2);
    expect(props.onChange).toHaveBeenCalledTimes(1);
  });

  test('別のページ番号がクリックされた時にページ番号が正しく再描画される その1', () => {
    const props: PaginationProps = {
      page: 1,
      count: 4,
      itemsShown: 5,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    userEvent.click(screen.getAllByTestId('pagination-number')[1]);
    expect(screen.getAllByTestId('pagination-number').length).toBe(4);
    expect(screen.getAllByTestId('pagination-number').map((el) => el.textContent)).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);

    userEvent.click(screen.getAllByTestId('pagination-number')[2]);
    expect(screen.getAllByTestId('pagination-number').length).toBe(4);
    expect(screen.getAllByTestId('pagination-number').map((el) => el.textContent)).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
  });

  test('別のページ番号がクリックされた時にページ番号が正しく再描画される その2', () => {
    const props: PaginationProps = {
      page: 1,
      count: 6,
      itemsShown: 7,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    userEvent.click(screen.getAllByTestId('pagination-number')[1]);
    expect(screen.getAllByTestId('pagination-number').length).toBe(6);
    expect(screen.getAllByTestId('pagination-number').map((el) => el.textContent)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]);

    userEvent.click(screen.getAllByTestId('pagination-number')[4]);
    expect(screen.getAllByTestId('pagination-number').length).toBe(6);
    expect(screen.getAllByTestId('pagination-number').map((el) => el.textContent)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
    ]);
  });

  test('別のページ番号がクリックされた時にページ番号が正しく再描画される その3', () => {
    const props: PaginationProps = {
      page: 1,
      count: 7,
      itemsShown: 7,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    userEvent.click(screen.getAllByTestId('pagination-number')[1]);
    expect(screen.getAllByTestId('pagination-number').length).toBe(7);
    expect(screen.getAllByTestId('pagination-number').map((el) => el.textContent)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
    ]);

    userEvent.click(screen.getAllByTestId('pagination-number')[6]);
    expect(screen.getAllByTestId('pagination-number').length).toBe(7);
    expect(screen.getAllByTestId('pagination-number').map((el) => el.textContent)).toEqual([
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
    ]);
  });

  test('別のページ番号がクリックされた時にページ番号が正しく再描画される その4', () => {
    const props: PaginationProps = {
      page: 1,
      count: 4,
      itemsShown: 3,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    userEvent.click(screen.getAllByTestId('pagination-number')[1]);
    expect(screen.getAllByTestId('pagination-number').length).toBe(3);
    expect(screen.getAllByTestId('pagination-number').map((el) => el.textContent)).toEqual([
      '1',
      '2',
      '3',
    ]);

    userEvent.click(screen.getAllByTestId('pagination-number')[2]);
    expect(screen.getAllByTestId('pagination-number').length).toBe(3);
    expect(screen.getAllByTestId('pagination-number').map((el) => el.textContent)).toEqual([
      '2',
      '3',
      '4',
    ]);
  });
});
