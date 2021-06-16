import React from 'react';
import { render, screen } from '@testing-library/react';

import { ResultStats, ResultStatsProps } from './';
import { getItems } from '../../mocks/items';

describe('ResultStats', () => {
  test('レンダリングされる', () => {
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
    render(<ResultStats {...props} />);
    expect(screen.getByTestId('result-stats')).toMatchInlineSnapshot(`
      <div
        data-testid="result-stats"
      >
        <p>
          <span
            class="font-bold"
          >
            期間限定
          </span>
           の検索結果
        </p>
        <p
          class="text-sm"
        >
          1000
          タイトル中 
          1
          ～
          100
          タイトル
        </p>
      </div>
    `);
  });

  test('検索結果が0件の時に正常にレンダリングされる', () => {
    const props: ResultStatsProps = {
      keyword: '期間限定',
      response: {
        status: 200,
        result_count: 100,
        total_count: 0,
        first_position: 1,
        items: getItems(),
      },
    };
    render(<ResultStats {...props} />);
    expect(screen.getByTestId('result-stats')).toMatchInlineSnapshot(`
      <div
        data-testid="result-stats"
      >
        <p>
          <span
            class="font-bold"
          >
            期間限定
          </span>
           の検索結果
        </p>
        <p
          class="text-sm"
        >
          該当する商品が見つかりません。検索条件を変えて、再度お試しください。
        </p>
      </div>
    `);
  });
});
