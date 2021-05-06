import React from 'react';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';

import { HeaderInput, HeaderInputProps } from './HeaderInput';

afterEach(cleanup);

describe('HeaderInput', () => {
  const mockSubmit = jest.fn();
  const props: HeaderInputProps = {
    onSubmit: mockSubmit,
  };

  test('ヘッダーの入力欄がレンダリングされる', () => {
    render(<HeaderInput {...props} />);
    expect(screen.getByPlaceholderText('キーワードから探す')).toBeInTheDocument();
  });

  test('入力欄にテキスト入力すると、入力したテキストがレンダリングされる', () => {
    render(<HeaderInput {...props} />);
    const input = screen.getByPlaceholderText('キーワードから探す') as HTMLInputElement;
    fireEvent.change(input, { target: { value: '111' } });
    expect(input.value).toBe('111');
  });

  test('サブミットをすると入力欄に入力したテキストがonSubmitに渡されて実行される', () => {
    render(<HeaderInput {...props} />);
    const input = screen.getByPlaceholderText('キーワードから探す');
    fireEvent.change(input, { target: { value: '111' } });
    const submitButton = screen.getByLabelText('search');
    fireEvent.click(submitButton);
    expect(mockSubmit).toHaveBeenCalledTimes(1);
    expect(mockSubmit).toHaveBeenNthCalledWith(1, '111');
  });
});
