import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { itemListService } from '../services/itemList';
import { ItemListResponseResult } from '../types/api';
import { useItemList } from '../hooks/useItemList';
import { Header, FormData } from '../components/header/';
import { ItemList } from '../components/item-list/';
import { Pagination } from '../components/pagination/';
import { ResultStats } from '../components/result-stats/';
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
  const onSubmit = (data: FormData) => {
    setCategory(data.category);
    setInputValue(data.keyword);
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
      <Header
        onSubmit={onSubmit}
        options={CATEGORIES.map((category) => ({ label: category, value: category }))}
      />
      <main className="mt-5 max-w-screen-lg w-23/25 md:w-full m-auto">
        <ResultStats keyword={keyword} response={response} />
        <div className="mt-4">
          <ItemList items={response.items} />
        </div>
        <div className="my-5 md:my-10">
          <Pagination
            page={response.first_position}
            count={Math.floor(response.total_count / pageSize) + 1}
            itemsShown={5}
            onChange={onChange}
          />
        </div>
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
