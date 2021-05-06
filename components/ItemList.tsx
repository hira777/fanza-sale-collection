import { useMemo } from 'react';
import Grid from '@material-ui/core/Grid';

import { ItemListItem } from './ItemListItem';
import { Items } from '../types/api';

export type ItemListProps = {
  items: Items;
};

export function ItemList({ items }: ItemListProps) {
  const itemList = useMemo(
    () => items.map((item) => <ItemListItem key={item.product_id} item={item} />),
    [items]
  );

  return (
    <Grid item xs={12} data-testid="item-list">
      <Grid container justify="flex-start" spacing={0}>
        {itemList}
      </Grid>
    </Grid>
  );
}
