import React, { useMemo } from 'react';
import Container from '@material-ui/core/Container';

import { ItemListResponse } from '../hooks/useItemList';
import { Header } from '../components/Header';
import { HeaderInput, HeaderInputProps } from '../components/HeaderInput';
import { HeaderMenu, HeaderMenuProps } from '../components/HeaderMenu';
import { HeaderTitle } from '../components/HeaderTitle';
import { ItemList } from '../components/ItemList';
import { ItemListItem } from '../components/ItemListItem';
import { ResultStats } from '../components/ResultStats';

export type TopProps = {
  response: ItemListResponse;
  keyword: string;
  categories: HeaderMenuProps['categories'];
  onChangeCategory: HeaderMenuProps['onChangeCategory'];
  onChangeInput: HeaderInputProps['onChangeInput'];
};

export function Top({ response, keyword, categories, onChangeCategory, onChangeInput }: TopProps) {
  const itemList = useMemo(
    () => (
      <ItemList>
        {response.items.map(item => (
          <ItemListItem key={item.product_id} item={item} />
        ))}
      </ItemList>
    ),
    [response.items]
  );

  return (
    <>
      <Header
        title={<HeaderTitle />}
        menu={<HeaderMenu categories={categories} onChangeCategory={onChangeCategory} />}
        input={<HeaderInput onChangeInput={onChangeInput} />}
      />
      <main style={{ marginTop: 20 }}>
        <Container fixed maxWidth="md">
          <ResultStats keyword={keyword} response={response} />
          <div style={{ marginTop: 10 }}>{itemList}</div>
        </Container>
      </main>
    </>
  );
}
