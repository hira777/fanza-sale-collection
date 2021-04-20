import { useState, useEffect, useRef } from 'react';

import { ItemListResponseResult } from '../types/api/';
import { itemListService } from '../services/itemList';

type UseItems = {
  response: ItemListResponseResult;
  category: string;
  offset?: number;
};

export function useItemList({
  response: initialResponse,
  category: initialCategory,
  offset: initialOffset = 1,
}: UseItems) {
  const [response, setResponse] = useState(initialResponse);
  const [category, setCategory] = useState(initialCategory);
  const [inputValue, setInputValue] = useState('');
  const [offset, setOffset] = useState(initialOffset);
  const keyword = useRef(category);
  const offsetRef = useRef(offset);
  const search = () => {
    const newKeyword = inputValue ? `${category} ${inputValue}` : category;

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
      setResponse(data);
    };

    fetchData();
  };

  useEffect(search, [inputValue]);
  useEffect(search, [category]);
  useEffect(search, [offset]);

  return { response, keyword: keyword.current, setCategory, setInputValue, setOffset };
}
