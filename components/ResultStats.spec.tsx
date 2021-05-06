import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { ResultStats, ResultStatsProps } from './ResultStats';
import { getItems } from '../mocks/items';

afterEach(cleanup);

describe('ResultStats', () => {
  const props: ResultStatsProps = {
    keyword: '期間限定',
    response: {
      status: 200,
      result_count: 100,
      total_count: 1000,
      first_position: 1,
      items: getItems(),
    },
  };

  test('検索中のキーワードがレンダリングされる', () => {
    render(<ResultStats {...props} />);
    const resultStatsText = screen.getByTestId('result-stats-text');
    expect(resultStatsText).toBeInTheDocument();
    expect(resultStatsText).toHaveTextContent(`"${props.keyword}"の検索結果`);
  });

  test('検索結果の情報がレンダリングされる', () => {
    render(<ResultStats {...props} />);
    const resultStatsNumber = screen.getByTestId('result-stats-number');
    expect(resultStatsNumber).toBeInTheDocument();
    expect(resultStatsNumber).toHaveTextContent(
      `${props.response.total_count}タイトル中 ${props.response.first_position}～${props.response.result_count}タイトル`
    );
  });
});
