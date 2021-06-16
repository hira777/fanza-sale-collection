import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { default as Home, HomeProps } from './';
import { getItems } from '../mocks/items';

afterEach(cleanup);

describe('Home', () => {
  const items = getItems();
  const initialResponse = {
    status: 200,
    result_count: 100,
    total_count: 1000,
    first_position: 1,
    items: items,
  };
  const props: HomeProps = {
    initialResponse,
  };

  test('Header がレンダリングされる', () => {
    render(<Home {...props} />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  test('ResultStats がレンダリングされる', () => {
    render(<Home {...props} />);
    expect(screen.getByTestId('result-stats')).toBeInTheDocument();
  });

  test('ItemList がレンダリングされる', () => {
    render(<Home {...props} />);
    expect(screen.getAllByTestId('item-list-item').length).toBe(props.initialResponse.items.length);
  });
});
