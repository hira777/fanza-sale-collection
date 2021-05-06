import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { ItemList, ItemListProps } from './ItemList';
import { getItems } from '../mocks/items';

afterEach(cleanup);

describe('ItemList', () => {
  const props: ItemListProps = {
    items: getItems(),
  };

  test('リストがレンダリングされる', () => {
    render(<ItemList {...props} />);
    const listItems = screen.getAllByTestId('item-list-item');
    expect(listItems.length).toBe(10);
  });
});
