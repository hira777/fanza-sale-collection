import { useState, useEffect, useRef } from 'react';
import { ItemListResponseResultField } from '../types/api/';
import { itemListService } from '../services/itemList';

type UseItems = {
  response: ItemListResponseResultField;
  category: string;
  offset?: number;
};

export type ItemListResponse = {
  resultCount: ItemListResponseResultField['result_count'];
  totalCount: ItemListResponseResultField['total_count'];
  firstPosition: ItemListResponseResultField['first_position'];
  items: ItemListResponseResultField['items'];
};

export function useItemList({
  response: initialResponse,
  category: initialCategory,
  offset: initialOffset = 1,
}: UseItems) {
  const [response, setResponse] = useState<ItemListResponse>({
    resultCount: initialResponse.result_count,
    totalCount: initialResponse.total_count,
    firstPosition: initialResponse.first_position,
    items: initialResponse.items,
  });
  const [category, setCategory] = useState(initialCategory);
  const [inputValue, setInputValue] = useState('');
  const [offset, setOffset] = useState(initialOffset);
  const keyword = useRef(`${category} ${inputValue}`);
  const offsetRef = useRef(offset);
  const search = () => {
    const newKeyword = `${category} ${inputValue}`;

    if (keyword.current === newKeyword && offsetRef.current === offset) {
      return;
    }

    if (keyword.current !== newKeyword) {
      keyword.current = newKeyword;
      offsetRef.current = 1;
      setOffset(1);
    } else if (offsetRef.current !== offset) {
      offsetRef.current = offset;
    }

    const fetchData = async () => {
      const { data } = await itemListService.get({
        keyword: keyword.current,
        offset: offsetRef.current,
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

  useEffect(search, [inputValue]);
  useEffect(search, [category]);
  useEffect(search, [offset]);

  return { response, keyword: keyword.current, setCategory, setInputValue, setOffset };
}
