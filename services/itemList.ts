import axios from 'axios';
import { ItemListResponseResultField } from '../types/api';

const client = axios.create({
  baseURL: 'http://localhost:3000/api/ItemList',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

function get() {
  return client.get<ItemListResponseResultField>('/');
}

export const itemListService = {
  get,
};
