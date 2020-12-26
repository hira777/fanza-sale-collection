// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.dmm.com/affiliate/v3/',
  params: {
    api_id: process.env.API_ID,
    affiliate_id: process.env.AFFILIATE_ID,
    site: 'FANZA',
    service: 'digital',
    floor: 'videoa',
    hits: 100,
    output: 'json',
  },
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await client.get('/ItemList');
    res.json(response.data.result);
  } catch (error) {
    console.error(error);
  }
};
