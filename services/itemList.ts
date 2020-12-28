import axios from 'axios';
import {
  ItemListOptionalRequestParameters as Request,
  ItemListResponseResultField as Response,
} from '../types/api';

const client = axios.create({
  baseURL: 'http://localhost:3000/api/ItemList',
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

function get(params?: {
  keyword?: Request['keyword'];
  offset?: Request['offset'];
}) {
  return client.get<Response>('/', {
    params,
  });
}

export const itemListService = {
  get,
};
