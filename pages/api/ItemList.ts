// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosError } from 'axios';
import { ItemListRequestParameters, ItemListResponse } from '../../types/api';

const params: ItemListRequestParameters = {
  api_id: process.env.API_ID,
  affiliate_id: process.env.AFFILIATE_ID,
  site: 'FANZA',
  service: 'digital',
  floor: 'videoa',
  hits: 100,
  output: 'json',
};

const client = axios.create({
  baseURL: 'https://api.dmm.com/affiliate/v3/',
  params: params,
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemListResponse['result'] | { error: string }>
) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const response = await client.get<ItemListResponse>('/ItemList', {
      params: { ...client.defaults.params, ...req.query },
    });
    res.json(response.data.result);
  } catch (error) {
    if ((error as AxiosError).isAxiosError) {
      const { response }: AxiosError = error;
      res.status(response.status).json({ error: response.statusText });
    }
  }
}
