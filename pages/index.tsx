import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import { itemListService } from '../services/itemList';
import { ItemListResponseResult } from '../types/api/';
import { useItemList } from '../hooks/useItemList';
import { Header } from '../components/Header';
import { ItemList } from '../components/ItemList';
import { Pagination } from '../components/Pagination';
import { ResultStats } from '../components/ResultStats';
import { CATEGORIES } from '../constants/categoriesOfSearch';

export type HomeProps = {
  initialResponse: ItemListResponseResult;
};

export default function Home({ initialResponse }: HomeProps) {
  const { response, keyword, setCategory, setInputValue, setOffset } = useItemList({
    response: initialResponse,
    category: CATEGORIES[0],
  });
  const pageSize = 100;
  const onSubmit = (value: string) => {
    setInputValue(value);
  };
  const onChangeCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };
  const onChange = (offset: number) => {
    setOffset(offset * pageSize - pageSize + 1);
  };

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
          <div style={{ marginTop: 10 }}>
            <ItemList items={response.items} />
          </div>
          <Box display="flex" justifyContent="center" mt={3} mb={3}>
            <Pagination
              page={response.first_position}
              count={Math.floor(response.total_count / pageSize) + 1}
              onChange={onChange}
            />
          </Box>
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
