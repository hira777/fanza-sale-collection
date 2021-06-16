import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Header, HeaderProps } from './header';
import { getCategories } from '../../mocks/categories';

describe('Header', () => {
  const categories = getCategories();
  const options = categories.map((category) => ({ label: category, value: category }));
  const onSubmit = jest.fn();
  const props: HeaderProps = {
    options,
    onSubmit,
  };

  beforeEach(() => {
    onSubmit.mockClear();
  });

  test('レンダリングされる', () => {
    render(<Header {...props} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    // 見出し
    expect(screen.getByText('FANZA Sales')).toBeInTheDocument();
    // フォーム要素
    expect(screen.getByRole('combobox', { name: /カテゴリ選択/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /キーワード入力/i })).toBeInTheDocument();
  });

  test('フォームデータを送信する', () => {
    render(<Header {...props} />);

    const category = categories[1];
    const keyword = 'AAA';

    // セレクトボックスでカテゴリを選択する
    userEvent.selectOptions(screen.getByRole('combobox', { name: /カテゴリ選択/i }), [category]);
    expect(onSubmit).toHaveBeenCalledWith({
      category,
      keyword: '',
    });

    // 入力欄にキーワードを入力する
    userEvent.type(screen.getByRole('textbox', { name: /キーワード入力/i }), keyword);
    // 検索ボタンをクリック
    userEvent.click(screen.getByRole('button', { name: /検索/i }));
    expect(onSubmit).toHaveBeenCalledWith({
      category,
      keyword,
    });

    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});
