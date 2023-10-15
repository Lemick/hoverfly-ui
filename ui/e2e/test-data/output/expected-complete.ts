import { objectContaining } from 'expect';

export default {
  meta: objectContaining({
    schemaVersion: 'v5',
    hoverflyVersion: 'v1.6.0',
    timeExported: '2023-04-10T12:00:00Z'
  }),
  data: objectContaining({
    pairs: [
      objectContaining({
        request: objectContaining({
          method: [objectContaining({ matcher: 'glob', value: 'GET' })],
          scheme: [objectContaining({ matcher: 'glob', value: 'http' })],
          destination: [objectContaining({ matcher: 'glob', value: 'mock.api.com' })],
          path: [
            objectContaining({ matcher: 'glob', value: 'path1' }),
            objectContaining({ matcher: 'exact', value: 'path2' })
          ],
          query: objectContaining({
            param1: [objectContaining({ matcher: 'glob', value: 'value1' })],
            param2: [
              objectContaining({ matcher: 'exact', value: 'value2' }),
              objectContaining({ matcher: 'exact', value: 'value3' })
            ]
          }),
          headers: objectContaining({
            header1: [
              objectContaining({
                matcher: 'exact',
                value: 'valueheader1',
                config: objectContaining({
                  ignoreUnknown: true,
                  ignoreOrder: true,
                  ignoreOccurrences: true
                })
              })
            ]
          }),
          body: [objectContaining({ matcher: 'jsonPartial', value: '{ "field1": "value1" }' })]
        }),
        response: objectContaining({
          status: 200,
          body: '{ "response": "body" }'
        })
      })
    ]
  })
};
