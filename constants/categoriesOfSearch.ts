const categories = process.env.NEXT_PUBLIC_SALE_CATEGORIES || '期間限定セール';
export const CATEGORIES = categories.split(',');
export const CATEGORIES_LABEL = categories.split(',').map((category) => ({
  value: category,
  text: category,
}));
