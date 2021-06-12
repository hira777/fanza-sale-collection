import * as React from 'react';

import { ItemListItem } from './item-list-item';
import { ItemInfo } from '../../types/api';

export type ItemListProps = {
  items: ItemInfo[];
};

export function ItemList({ items }: ItemListProps) {
  const itemList = React.useMemo(
    () => items.map((item) => <ItemListItem key={item.product_id} item={item} />),
    [items]
  );

  return <div className="flex flex-wrap w-full md:w-1280 m-auto">{itemList}</div>;
}
