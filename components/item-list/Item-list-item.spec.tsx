import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { ItemListItem, ItemListItemProps } from './item-list-item';
import { getItems } from '../../mocks/items';

afterEach(cleanup);

describe('ItemListItem', () => {
  const item = getItems()[0];
  const props: ItemListItemProps = {
    item,
  };

  test('レンダリングされる', () => {
    render(<ItemListItem {...props} />);
    expect(screen.getByTestId('item-list-item')).toMatchInlineSnapshot(`
      <div
        class="transition p-1 md:p-0 w-2/6 md:w-147 md:-mt-px md:-ml-px md:border md:border-gray-200 md:hover:bg-gray-100"
        data-testid="item-list-item"
      >
        <a
          class="block"
          href="https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=mimk00078/"
          rel="noopener noreferrer"
          target="_blank"
        >
          <img
            alt="1000円カットのおネエさんにスいてもらう本。実写版 原作 越山弱衰 累計売上6万部越えエロ度120％の肉感コミックを実写化！"
            class="w-full md:w-4/5 mx-auto mt-0 md:mt-4"
            src="https://dummyimage.com/147x200/000/fff"
          />
          <div
            class="px-2 md:px-3 py-2 md:py-3"
          >
            <p
              class="text-gray-700 text-xs line-clamp-2"
            >
              1000円カットのおネエさんにスいてもらう本。実写版 原作 越山弱衰 累計売上6万部越えエロ度120％の肉感コミックを実写化！
            </p>
            <p
              class="text-red-500 text-xs font-bold mt-1"
            >
              350円~
            </p>
          </div>
        </a>
      </div>
    `);
  });
});
