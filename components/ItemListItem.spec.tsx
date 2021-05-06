import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { ItemListItem, ItemListItemProps, formatPrice } from './ItemListItem';
import { getItems } from '../mocks/items';

afterEach(cleanup);

describe('ItemListItem', () => {
  const item = getItems()[0];
  const props: ItemListItemProps = {
    item,
  };

  test('商品情報がレンダリングされる', () => {
    render(<ItemListItem {...props} />);
    expect(screen.getByTestId('item-list-item')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent(item.title);
    expect(screen.getByTestId('item-list-item-price')).toHaveTextContent(
      formatPrice(item.prices.price)
    );
  });
});
