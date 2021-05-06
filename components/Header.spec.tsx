import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { Header, HeaderProps } from './Header';
import { getCategories } from '../mocks/categories';

afterEach(cleanup);

describe('Header', () => {
  const categories = getCategories();
  const props: HeaderProps = {
    categories,
    onChangeCategory: () => {},
    onSubmit: () => {},
  };

  test('ヘッダーがレンダリングされる', () => {
    render(<Header {...props} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
    // 見出し
    expect(screen.getByText('FANZA Sale Collection')).toBeInTheDocument();
    // メニュー
    expect(screen.getByText(categories[0])).toBeInTheDocument();
    // 入力欄
    expect(screen.getByPlaceholderText('キーワードから探す')).toBeInTheDocument();
  });
});
