import Typography from '@material-ui/core/Typography';

import { ItemListResponseResult } from '../types/api/';

export type ResultStatsProps = {
  keyword: string;
  response: ItemListResponseResult;
};

export function ResultStats({ keyword, response }: ResultStatsProps) {
  const { result_count, total_count, first_position } = response;
  return (
    <>
      <Typography
        variant="subtitle1"
        variantMapping={{ subtitle1: 'p' }}
        data-testid="result-stats-text"
      >
        <span style={{ fontWeight: 'bold' }}>"{keyword}"</span>の検索結果
      </Typography>
      <Typography
        variant="subtitle2"
        variantMapping={{ subtitle2: 'p' }}
        data-testid="result-stats-number"
      >
        {total_count}タイトル中 {first_position}～{first_position + result_count - 1}タイトル
      </Typography>
    </>
  );
}
