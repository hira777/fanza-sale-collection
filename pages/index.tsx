import Head from 'next/head';
import { GetStaticProps } from 'next';
import { itemListService } from '../services/itemList';
import { Items } from '../types/api/';
import { ItemList } from '../components/ItemList';
import { ItemListItem } from '../components/ItemListItem';

export default function Home({ items }: { items: Items }) {
  return (
    <div>
      <Head>
        <title>Fanza Sale Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ItemList>
          {items.map(item => (
            <ItemListItem key={item.product_id} item={item} />
          ))}
        </ItemList>
      </main>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await itemListService.get();

  return {
    props: {
      items: data.items,
    },
  };
};
