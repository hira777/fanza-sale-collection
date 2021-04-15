import http from 'http';
import fetch from 'isomorphic-unfetch';
import listen from 'test-listen';
import { apiResolver } from 'next/dist/next-server/server/api-utils';
import handler from './ItemList';

describe('itemList API', () => {
  let server;
  let url;

  // apiResolver の引数に渡すオブジェクト（型エラーが発生しないようにするため）
  const apiPreviewPropsMock = {
    previewModeId: 'id',
    previewModeEncryptionKey: 'key',
    previewModeSigningKey: 'key',
  };

  afterEach((done) => {
    server.close(done);
  });

  test('GET メソッド以外でリクエストしたら 405 を返す', async () => {
    server = http.createServer((req, res) =>
      apiResolver(req, res, undefined, handler, apiPreviewPropsMock, true)
    );
    url = await listen(server);
    const response = await fetch(url, { method: 'POST' });
    expect(response.status).toBe(405);
  });

  test('不正な API ID でリクエストしたら 400 を返す', async () => {
    server = http.createServer((req, res) =>
      apiResolver(req, res, { api_id: '' }, handler, apiPreviewPropsMock, true)
    );
    url = await listen(server);

    const response = await fetch(url);

    expect(response.status).toBe(400);
  });

  test('DMM APIにリクエストしてレスポンスを返す', async () => {
    server = http.createServer((req, res) =>
      apiResolver(req, res, { hits: 1 }, handler, apiPreviewPropsMock, true)
    );
    url = await listen(server);

    const response = await fetch(url);
    const jsonResult = await response.json();

    expect(response.status).toBe(200);
    expect(jsonResult).toEqual({
      first_position: 1,
      items: expect.any(Array),
      result_count: 1,
      status: 200,
      total_count: expect.any(Number),
    });
  });
});
