import { ItemListResponseResult } from '../../types/api/';

export type ResultStatsProps = {
  keyword: string;
  response: ItemListResponseResult;
};

export function ResultStats({ keyword, response }: ResultStatsProps) {
  const { result_count, total_count, first_position } = response;
  return (
    <div data-testid="result-stats">
      <p>
        <span className="font-bold">{keyword}</span> の検索結果
      </p>
      <p className="text-sm">
        {total_count > 0 ? (
          <>
            {total_count}タイトル中 {first_position}～{first_position + result_count - 1}タイトル
          </>
        ) : (
          <>該当する商品が見つかりません。検索条件を変えて、再度お試しください。</>
        )}
      </p>
    </div>
  );
}
