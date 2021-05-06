// NOTE: コンポーネントは Material UI の Pagination を利用しているので、クリック時の挙動などが正常に
// 動作しているのかまではテストする必要はないのでは。と思っている。
// なのでコンポーネントがレンダリングされているかどうかさえテストすれば良いような気もしている。
import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import { Pagination, PaginationProps } from './Pagination';

afterEach(cleanup);

describe('Pagination', () => {
  // このコンポーネントではボタンとページ番号が li で描画される
  // Props で渡したページ番号の li が描画されているかチェックするためにボタンの数も含める必要がある
  const buttonCount = 2;

  test('ページ数が複数のページネーションがレンダリングされる', () => {
    const props: PaginationProps = {
      page: 1,
      count: 5,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(props.count + buttonCount);

    const buttons = screen.getAllByRole('button');
    const prevButtton = buttons[0];
    expect(prevButtton).toBeDisabled();
    const nextButtton = buttons[buttons.length - 1];
    expect(nextButtton).not.toBeDisabled();

    const page1 = buttons[1];
    expect(page1).toHaveClass('Mui-selected');
  });

  test('ページ数が１つのページネーションがレンダリングされる', () => {
    const props: PaginationProps = {
      page: 1,
      count: 1,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    const pagination = screen.getByTestId('pagination');
    expect(pagination).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems.length).toBe(props.count + buttonCount);

    const buttons = screen.getAllByRole('button');
    const prevButtton = buttons[0];
    expect(prevButtton).toBeDisabled();
    const nextButtton = buttons[buttons.length - 1];
    expect(nextButtton).toBeDisabled();

    const page1 = buttons[1];
    expect(page1).toHaveClass('Mui-selected');
  });

  test('ページ番号をクリックすると、クリックしたボタンが活性化する', async () => {
    const props: PaginationProps = {
      page: 1,
      count: 5,
      onChange: () => {},
    };
    render(<Pagination {...props} />);

    const buttons = screen.getAllByRole('button');
    const page2 = buttons[2];
    fireEvent.click(page2);

    const prevButtton = buttons[0];
    expect(prevButtton).not.toBeDisabled();
    const nextButtton = buttons[buttons.length - 1];
    expect(nextButtton).not.toBeDisabled();

    const page1 = buttons[1];
    expect(page1).not.toHaveClass('Mui-selected');
    expect(page2).toHaveClass('Mui-selected');
  });
});
