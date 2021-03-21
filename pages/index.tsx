import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useState, useEffect } from 'react';
import { useDebounce } from 'react-use';
import { itemListService } from '../services/itemList';
import { Items } from '../types/api/';
import { Top } from '../screens/Top';
import { CATEGORIES } from '../constants/categoriesOfSearch';

export default function Home({ initialItems }: { initialItems: Items }) {
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const onChangeInput = (value: string) => {
    setInputValue(value);
  };
  const onChangeCategory = (selectedCategory: string) => {
    setCategory(selectedCategory);
  };

  useDebounce(
    () => {
      const fetchData = async () => {
        const { data } = await itemListService.get({
          keyword: `${category} ${inputValue}`,
        });
        setItems(data.items);
      };

      fetchData();
    },
    500,
    [inputValue]
  );

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await itemListService.get({
        keyword: `${category} ${inputValue}`,
      });
      setItems(data.items);
    };

    fetchData();
  }, [category]);

  return (
    <div>
      <Head>
        <title>Fanza Sale Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Top
        items={items}
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
