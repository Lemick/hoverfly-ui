export default {
  meta: {
    schemaVersion: 'v5',
    hoverflyVersion: 'v1.6.0',
    timeExported: '2023-04-10T12:00:00Z'
  },
  data: {
    pairs: [
      {
        request: {
          method: [
            {
              matcher: 'glob',
              value: 'GET'
            }
          ],
          scheme: [
            {
              matcher: 'glob',
              value: 'http'
            }
          ],
          destination: [
            {
              matcher: 'glob',
              value: 'mock.api.com'
            }
          ],
          path: [
            {
              matcher: 'glob',
              value: 'path1'
            },
            {
              matcher: 'exact',
              value: 'path2'
            }
          ],
          query: {
            param2: [
              {
                matcher: 'exact',
                value: 'value2'
              },
              {
                matcher: 'exact',
                value: 'value3'
              }
            ],
            param1: [
              {
                matcher: 'glob',
                value: 'value1'
              }
            ]
          },
          headers: {
            header1: [
              {
                matcher: 'exact',
                value: 'valueheader1',
                config: {
                  ignoreUnknown: true,
                  ignoreOrder: true,
                  ignoreOccurrences: true
                }
              }
            ]
          },
          body: [
            {
              matcher: 'jsonPartial',
              value: '{ "field1": "value1" }'
            }
          ]
        },
        response: {
          status: 204,
          body: '{\n  "response": "body"\n}',
          encodedBody: true,
          fixedDelay: 500,
          headers: {
            'Content-Type': ['application/json'],
            'Cache-control': ['max-age=604800', 'must-revalidate']
          }
        }
      }
    ]
  }
};
