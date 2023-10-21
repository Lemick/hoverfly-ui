import { expect } from '@playwright/test';

export default {
  meta: expect.objectContaining({
    schemaVersion: 'v5',
    hoverflyVersion: 'v1.6.0',
    timeExported: '2023-04-10T12:00:00Z'
  }),
  data: expect.objectContaining({
    pairs: [
      expect.objectContaining({
        request: expect.objectContaining({
          method: [expect.objectContaining({ matcher: 'glob', value: 'GET' })],
          scheme: [expect.objectContaining({ matcher: 'glob', value: 'http' })],
          destination: [expect.objectContaining({ matcher: 'glob', value: 'mock.api.com' })],
          path: [
            expect.objectContaining({ matcher: 'glob', value: 'path1' }),
            expect.objectContaining({ matcher: 'exact', value: 'path2' })
          ],
          query: expect.objectContaining({
            param1: [expect.objectContaining({ matcher: 'glob', value: 'value1' })],
            param2: [
              expect.objectContaining({ matcher: 'exact', value: 'value2' }),
              expect.objectContaining({ matcher: 'exact', value: 'value3' })
            ]
          }),
          headers: expect.objectContaining({
            header1: [
              expect.objectContaining({
                matcher: 'exact',
                value: 'valueheader1',
                config: expect.objectContaining({
                  ignoreUnknown: true,
                  ignoreOrder: true,
                  ignoreOccurrences: true
                })
              })
            ]
          }),
          body: [
            expect.objectContaining({ matcher: 'jsonPartial', value: '{ "field1": "value1" }' })
          ]
        }),
        response: expect.objectContaining({
          status: 204,
          body: '{\n  "response": "body"\n}'
        })
      })
    ]
  })
};
