import { useMemo } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import { itemListService } from '../services/itemList';
import { ItemListResponseResultField } from '../types/api/';
import { useItemList } from '../hooks/useItemList';
import { ItemList } from '../components/ItemList';
import { ItemListItem } from '../components/ItemListItem';
import { ResultStats } from '../components/ResultStats';
import { Header } from '../components/Header';
import { CATEGORIES } from '../constants/categoriesOfSearch';

export type HomeProps = {
  initialResponse: ItemListResponseResultField;
};

export default function Home({ initialResponse }: HomeProps) {
  const { response, keyword, setCategory, setInputValue } = useItemList({
    response: initialResponse,
    category: CATEGORIES[0],
  });
  const onSubmit = (value: string) => {
    setInputValue(value);
  };
  const onChangeCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };
  const itemList = useMemo(
    () => (
      <ItemList>
        {response.items.map((item) => (
          <ItemListItem key={item.product_id} item={item} />
        ))}
      </ItemList>
    ),
    [response.items]
  );

  return (
    <div>
      <Head>
        <title>Fanza Sale Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header categories={CATEGORIES} onChangeCategory={onChangeCategory} onSubmit={onSubmit} />
      <main style={{ marginTop: 20 }}>
        <Container fixed maxWidth="md">
          <ResultStats keyword={keyword} response={response} />
          <div style={{ marginTop: 10 }}>{itemList}</div>
        </Container>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await itemListService.get({
    keyword: CATEGORIES[0],
  });

  return {
    props: {
      initialResponse: data,
    },
  };
};
