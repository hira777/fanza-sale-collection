import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useState, useMemo, ChangeEvent } from 'react';
import { useDebounce } from 'react-use';
import { itemListService } from '../services/itemList';
import { Items as ItemList } from '../types/api/';
import styles from '../styles/Home.module.css';

export default function Home({ initialItems }: { initialItems: ItemList }) {
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState('');
  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value);
  };
  const itemList = useMemo(
    () =>
      items.map(({ product_id, title }) => <li key={product_id}>{title}</li>),
    [items]
  );

  useDebounce(
    () => {
      const fetchData = async () => {
        const { data } = await itemListService.get({
          keyword: `％OFF ${inputValue}`,
        });
        setItems(data.items);
      };

      fetchData();
    },
    500,
    [inputValue]
  );

  return (
    <div className={styles.container}>
      <Head>
        <title>Fanza Sale Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
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
    keyword: '％OFF',
  });

  return {
    props: {
      initialItems: data.items,
    },
  };
};
