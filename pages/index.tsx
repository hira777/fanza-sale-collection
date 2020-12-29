import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useState, useMemo, ChangeEvent } from 'react';
import { useDebounce } from 'react-use';
import { Items as ItemList } from '../types/api/';
import styles from '../styles/Home.module.css';

import axios from 'axios';

export default function Home({ initialItems }: { initialItems: ItemList }) {
  const [allItems] = useState(initialItems);
  const [items, setItems] = useState(initialItems);
  const [inputValue, setInputValue] = useState('');
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const itemList = useMemo(
    () =>
      items.map(({ product_id, title, URL, imageURL }) => (
        <li key={product_id}>
          {/* <img src={imageURL.list} /> */}
          <a href={URL}>{title}</a>
        </li>
      )),
    [items]
  );

  useDebounce(
    () => {
      setItems(allItems.filter(({ title }) => title.includes(inputValue)));
    },
    200,
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
  const response = await axios.get('http://localhost:3000/items.json');

  return {
    props: {
      initialItems: response.data.all,
    },
  };
};
