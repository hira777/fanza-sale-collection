import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { ItemList, ItemListProps } from './item-list';
import { getItems } from '../../mocks/items';

afterEach(cleanup);

describe('ItemList', () => {
  const props: ItemListProps = {
    items: getItems(),
  };

  test('リストアイテムがレンダリングされる', () => {
    render(<ItemList {...props} />);
    expect(screen.getAllByTestId('item-list-item').length).toBe(10);
  });
});
