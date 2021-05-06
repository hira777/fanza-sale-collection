import axios from 'axios';
import {
  ItemListOptionalRequestParameters as Request,
  ItemListResponseResult as Response,
} from '../types/api';

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}api/ItemList`,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

function get(params?: { keyword?: Request['keyword']; offset?: Request['offset'] }) {
  return client.get<Response>('/', {
    params,
  });
}

export const itemListService = {
  get,
};
