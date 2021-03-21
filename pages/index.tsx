import Head from 'next/head';
import { GetStaticProps } from 'next';
import { useState, useMemo, useEffect } from 'react';
import { useDebounce } from 'react-use';
import Container from '@material-ui/core/Container';
import { itemListService } from '../services/itemList';
import { Items } from '../types/api/';
import { Header } from '../components/Header';
import { HeaderInput } from '../components/HeaderInput';
import { HeaderMenu } from '../components/HeaderMenu';
import { HeaderTitle } from '../components/HeaderTitle';
import { ItemList } from '../components/ItemList';
import { ItemListItem } from '../components/ItemListItem';
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

      <Header
        title={<HeaderTitle />}
        menu={
          <HeaderMenu
            categories={CATEGORIES}
            onChangeCategory={onChangeCategory}
          />
        }
        input={<HeaderInput onChangeInput={onChangeInput} />}
      />
      <main style={{ marginTop: 30 }}>
        <Container fixed maxWidth="md">
          {itemList}
        </Container>
      </main>
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
