import Typography from '@material-ui/core/Typography';

import { ItemListResponse } from '../hooks/useItemList';

export type ResultStatsProps = {
  keyword: string;
  response: ItemListResponse;
};

export function ResultStats({ keyword, response }: ResultStatsProps) {
  const { resultCount, totalCount, firstPosition } = response;
  return (
    <>
      <Typography variant="subtitle1" variantMapping={{ subtitle1: 'p' }}>
        <span style={{ fontWeight: 'bold' }}>"{keyword}"</span>の検索結果
      </Typography>
      <Typography variant="subtitle2" variantMapping={{ subtitle2: 'p' }}>
        {totalCount}タイトル中 {firstPosition}～{firstPosition + resultCount - 1}タイトル
      </Typography>
    </>
  );
}
