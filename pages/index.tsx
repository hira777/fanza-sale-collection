import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { itemListService } from '../services/itemList';
import { ItemListResponseResultField } from '../types/api/';
import { useItemList } from '../hooks/useItemList';
import { Top } from '../screens/Top';
import { Header } from '../components/Header';
import { CATEGORIES } from '../constants/categoriesOfSearch';

export default function Home({
  initialResponse,
}: {
  initialResponse: ItemListResponseResultField;
}) {
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

  return (
    <div>
      <Head>
        <title>Fanza Sale Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Top
        response={response}
        keyword={keyword}
        header={
          <Header categories={CATEGORIES} onChangeCategory={onChangeCategory} onSubmit={onSubmit} />
        }
      />
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
