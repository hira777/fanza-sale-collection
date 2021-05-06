import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { HeaderTitle } from './HeaderTitle';

afterEach(cleanup);

describe('HeaderTitle', () => {
  test('ヘッダーの見出しがレンダリングされる', () => {
    render(<HeaderTitle />);
    expect(screen.getByText('FANZA Sale Collection')).toBeInTheDocument();
  });
});
