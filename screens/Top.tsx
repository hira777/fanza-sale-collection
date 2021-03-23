import React, { useMemo, ReactNode } from 'react';
import Container from '@material-ui/core/Container';

import { ItemListResponse } from '../hooks/useItemList';
import { ItemList } from '../components/ItemList';
import { ItemListItem } from '../components/ItemListItem';
import { ResultStats } from '../components/ResultStats';

export type TopProps = {
  header: ReactNode;
  response: ItemListResponse;
  keyword: string;
};

export function Top({ header, response, keyword }: TopProps) {
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
      {header}
      <main style={{ marginTop: 20 }}>
        <Container fixed maxWidth="md">
          <ResultStats keyword={keyword} response={response} />
          <div style={{ marginTop: 10 }}>{itemList}</div>
        </Container>
      </main>
    </>
  );
}
