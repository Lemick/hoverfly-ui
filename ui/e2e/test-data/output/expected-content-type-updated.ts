import { expect } from '@playwright/test';

export const expectContentTypeUpdated = {
  meta: expect.objectContaining({
    schemaVersion: 'v5',
    hoverflyVersion: 'v1.6.0',
    timeExported: expect.stringMatching(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
  }),
  data: expect.objectContaining({
    pairs: [
      {
        request: {
          method: [
            {
              matcher: 'exact',
              value: ''
            }
          ]
        },
        response: {
          status: 200,
          body: 'Hello World, how is it going ?',
          headers: {
            'content-Length': ['30']
          },
          encodedBody: false
        }
      }
    ]
  })
};
