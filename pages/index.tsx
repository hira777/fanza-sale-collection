import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { useDebounce } from 'react-use';
import { itemListService } from '../services/itemList';
import { Items as ItemList } from '../types/api/';
import styles from '../styles/Home.module.css';
import { CATEGORIES_OF_SEARCH as CATEGORIES } from '../constants/categoriesOfSearch';

export default function Home({ initialItems }: { initialItems: ItemList }) {
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState(CATEGORIES.ALL);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const onChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
  };
  const categories = [{ value: CATEGORIES.ALL, text: 'すべて' }].concat(
    process.env.NEXT_PUBLIC_SALE_CATEGORIES.split(',').map(category => ({
      value: category,
      text: category,
    }))
  );
  const select = useMemo(() => {
    return (
      <select onChange={onChangeSelect} defaultValue={category}>
        {categories.map(({ value, text }) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    );
  }, [categories]);
  const itemList = useMemo(
    () =>
      items.map(({ product_id, title }) => <li key={product_id}>{title}</li>),
    [items]
  );

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
    <div className={styles.container}>
      <Head>
        <title>Fanza Sale Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {select}
        <input
          type="text"
          aria-label="keyword"
          placeholder="キーワードから探す"
          value={inputValue}
          onChange={onChange}
        />
        <ul>{itemList}</ul>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await itemListService.get({
    keyword: CATEGORIES.ALL,
  });

  return {
    props: {
      initialItems: data.items,
    },
  };
};
