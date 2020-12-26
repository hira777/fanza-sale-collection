import Head from 'next/head';
import { GetStaticProps } from 'next';
import { itemListService } from '../services/itemList';
import { Items as ItemList } from '../types/api/';
import styles from '../styles/Home.module.css';

export default function Home({ items }: { items: ItemList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fanza Sale Collection</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <ul>
          {items.map(({ product_id, title }) => (
            <li key={product_id}>{title}</li>
          ))}
        </ul>
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
