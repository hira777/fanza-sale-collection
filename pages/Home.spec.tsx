import React from 'react';
import { render, screen, within, cleanup } from '@testing-library/react';

import { default as Home, HomeProps } from './index';
import { CATEGORIES } from '../constants/categoriesOfSearch';
import { getItems } from '../mocks/items';

afterEach(cleanup);

describe('Home', () => {
  const items = getItems();
  const initialResponse = {
    status: 200,
    result_count: 100,
    total_count: 1000,
    first_position: 1,
    items: items,
  };
  const props: HomeProps = {
    initialResponse,
  };

  test('Header がレンダリングされる', () => {
    render(<Home {...props} />);
    expect(screen.getByTestId('header')).toBeInTheDocument();
  });

  test('ResultStats がレンダリングされる', () => {
    render(<Home {...props} />);
    const resultStatsText = screen.getByTestId('result-stats-text');
    const resultStatsNumber = screen.getByTestId('result-stats-number');
    expect(resultStatsText).toBeInTheDocument();
    expect(resultStatsText).toHaveTextContent(`"${CATEGORIES[0]}"の検索結果`);
    expect(resultStatsNumber).toBeInTheDocument();
    expect(resultStatsNumber).toHaveTextContent(
      `${initialResponse.total_count}タイトル中 ${initialResponse.first_position}～${initialResponse.result_count}タイトル`
    );
  });

  test('ItemList がレンダリングされる', () => {
    render(<Home {...props} />);
    const itemList = screen.getByTestId('item-list');
    const { getAllByTestId } = within(itemList);
    const listItems = getAllByTestId('item-list-item');
    expect(itemList).toBeInTheDocument();
    expect(listItems.length).toBe(10);
  });
});
