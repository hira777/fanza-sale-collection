import { useState, useEffect, useRef } from 'react';
import { useDebounce } from 'react-use';
import { itemListService } from '../services/itemList';

type UseItems = {
  category: string;
};

export default function useItems({ category: initialCategory }: UseItems) {
  const [items, setItems] = useState([]);
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
      setItems(data.items);
    };

    fetchData();
  };

  useDebounce(search, 500, [inputValue]);
  useEffect(search, [category]);

  return { items, setCategory, setInputValue };
}
