const ALL = '％OFF';

export const CATEGORIES_OF_SEARCH = {
  ALL,
};

export const CATEGORIES_LABEL = [
  { value: CATEGORIES_OF_SEARCH.ALL, text: 'すべて' },
].concat(
  process.env.NEXT_PUBLIC_SALE_CATEGORIES.split(',').map(category => ({
    value: category,
    text: category,
  }))
);
