export const CATEGORIES = process.env.NEXT_PUBLIC_SALE_CATEGORIES.split(',');
export const CATEGORIES_LABEL = process.env.NEXT_PUBLIC_SALE_CATEGORIES.split(
  ','
).map(category => ({
  value: category,
  text: category,
}));
