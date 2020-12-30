import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useState, useMemo, useEffect, ChangeEvent } from 'react';
import { useDebounce } from 'react-use';
import Container from '@material-ui/core/Container';
import { itemListService } from '../services/itemList';
import { Items } from '../types/api/';
import { Header } from '../components/Header';
import { ItemList } from '../components/ItemList';
import { ItemListItem } from '../components/ItemListItem';
import { CATEGORIES_OF_SEARCH as CATEGORIES } from '../constants/categoriesOfSearch';

export default function Home({ initialItems }: { initialItems: Items }) {
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
    () => (
      <ItemList>
        {items.map(item => (
          <ItemListItem key={item.product_id} item={item} />
        ))}
      </ItemList>
    ),
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
    <div>
      <Head>
        <title>Fanza Sale Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header inputValue={inputValue} onChangeInput={onChange} />
      <main>
        {select}
        <Container fixed maxWidth="md">
          {itemList}
        </Container>
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
