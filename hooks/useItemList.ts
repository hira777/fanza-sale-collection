import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'react-use';
import { ItemListResponseResultField } from '../types/api/';
import { itemListService } from '../services/itemList';

type UseItems = {
  response: ItemListResponseResultField;
  category: string;
};

export type ItemListResponse = {
  resultCount: ItemListResponseResultField['result_count'];
  totalCount: ItemListResponseResultField['total_count'];
  firstPosition: ItemListResponseResultField['first_position'];
  items: ItemListResponseResultField['items'];
};

export function useItemList({ response: initialResponse, category: initialCategory }: UseItems) {
  const [response, setResponse] = useState<ItemListResponse>({
    resultCount: initialResponse.result_count,
    totalCount: initialResponse.total_count,
    firstPosition: initialResponse.first_position,
    items: initialResponse.items,
  });
  const [category, setCategory] = useState(initialCategory);
  const [inputValue, setInputValue] = useState('');
  const keyword = useRef(`${category} ${inputValue}`);
  const search = () => {
    const newKeyword = `${category} ${inputValue}`;

    if (keyword.current === newKeyword) {
      return;
    }

    keyword.current = newKeyword;

    const fetchData = async () => {
      const { data } = await itemListService.get({
        keyword: keyword.current,
      });
      setResponse({
        ...response,
        items: data.items,
        resultCount: data.result_count,
        totalCount: data.total_count,
        firstPosition: data.first_position,
      });
    };

    fetchData();
  };

  useDebounce(search, 500, [inputValue]);
  useEffect(search, [category]);

  return { response, keyword: keyword.current, setCategory, setInputValue };
}
