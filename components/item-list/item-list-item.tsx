import { ItemInfo } from '../../types/api';

export type ItemListItemProps = {
  item: ItemInfo;
};

export function ItemListItem({ item }: ItemListItemProps) {
  const price = formatPrice(item.prices.price);

  return (
    <div
      className="transition p-1 md:p-0 w-2/6 md:w-147 md:-mt-px md:-ml-px md:border md:border-gray-200 md:hover:bg-gray-100"
      data-testid="item-list-item"
    >
      <a className="block" href={item.URL} target="_blank" rel="noopener noreferrer">
        <img
          className="w-full md:w-4/5 mx-auto mt-0 md:mt-4"
          src={item.imageURL.small}
          alt={item.title}
        />
        <div className="px-2 md:px-3 py-2 md:py-3">
          <p className="text-gray-700 text-xs line-clamp-2">{item.title}</p>
          <p className="text-red-500 text-xs font-bold mt-1">{price}</p>
        </div>
      </a>
    </div>
  );
}

function formatWithComma(number: number): string {
  return number.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');
}

function formatPrice(price: ItemInfo['prices']['price']) {
  const newPrice = parseInt(price.replace('~', ''), 0);
  return `${formatWithComma(newPrice)}円~`;
}
