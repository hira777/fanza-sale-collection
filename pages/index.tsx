import Head from 'next/head';
import { GetStaticProps } from 'next';
import { itemListService } from '../services/itemList';
import { Items } from '../types/api/';
import useItems from '../hooks/useItems';
import { Top } from '../screens/Top';
import { CATEGORIES } from '../constants/categoriesOfSearch';

export default function Home({ initialItems }: { initialItems: Items }) {
  const { items, setCategory, setInputValue } = useItems({
    category: CATEGORIES[0],
  });
  const onChangeInput = (value: string) => {
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
        items={items.length > 0 ? items : initialItems}
        categories={CATEGORIES}
        onChangeCategory={onChangeCategory}
        onChangeInput={onChangeInput}
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await itemListService.get({
    keyword: CATEGORIES[0],
  });

  return {
    props: {
      initialItems: data.items,
    },
  };
};
