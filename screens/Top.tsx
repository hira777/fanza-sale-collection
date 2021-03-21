import React, { useMemo } from 'react';
import Container from '@material-ui/core/Container';

import { Header } from '../components/Header';
import { HeaderInput, HeaderInputProps } from '../components/HeaderInput';
import { HeaderMenu, HeaderMenuProps } from '../components/HeaderMenu';
import { HeaderTitle } from '../components/HeaderTitle';
import { ItemList } from '../components/ItemList';
import { ItemListItem, ItemListItemProps } from '../components/ItemListItem';

export type TopProps = {
  items: ItemListItemProps['item'][];
  categories: HeaderMenuProps['categories'];
  onChangeCategory: HeaderMenuProps['onChangeCategory'];
  onChangeInput: HeaderInputProps['onChangeInput'];
};

export function Top({
  items,
  categories,
  onChangeCategory,
  onChangeInput,
}: TopProps) {
  const itemList = useMemo(
    () => (
      <ItemList>
        {items.map(item => (
          <ItemListItem key={item.product_id} item={item} />
        ))}
      </ItemList>
    ),
    [items]
  );

  return (
    <>
      <Header
        title={<HeaderTitle />}
        menu={
          <HeaderMenu
            categories={categories}
            onChangeCategory={onChangeCategory}
          />
        }
        input={<HeaderInput onChangeInput={onChangeInput} />}
      />
      <main style={{ marginTop: 30 }}>
        <Container fixed maxWidth="md">
          {itemList}
        </Container>
      </main>
    </>
  );
}
