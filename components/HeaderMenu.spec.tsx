import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import { HeaderMenu, HeaderMenuProps } from './HeaderMenu';
import { getCategories } from '../mocks/categories';

afterEach(cleanup);

describe('HeaderMenu', () => {
  const categories = getCategories();
  const props: HeaderMenuProps = {
    categories,
    onChangeCategory: () => {},
  };

  test('ヘッダーのメニューがレンダリングされる', () => {
    render(<HeaderMenu {...props} />);
    expect(screen.getByText(categories[0])).toBeInTheDocument();
  });

  test('メニューをクリックするとメニュー一覧が表示される', () => {
    render(<HeaderMenu {...props} />);
    const menuButton = screen.getByText(categories[0]);
    fireEvent.click(menuButton);

    // role="presentation" は Material-UI の Menu がレンダリングする要素。
    // そのため、HeaderMenu.tsx を見ても、この role が存在するかどうかはわからない（レンダリングされるかわからない）。
    // レンダリングされるまで存在がわからない要素を getByRole で取得してテストするのはイケてない気もする。
    const menu = screen.getByRole('presentation');
    expect(menu).toHaveAttribute('id', 'category-menu');

    const menuItems = screen.getAllByRole('menuitem');
    expect(menuItems.length).toBe(categories.length);
  });
});
