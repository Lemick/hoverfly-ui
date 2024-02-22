export const simulationWithContentType = {
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
              matcher: 'exact',
              value: ''
            }
          ]
        },
        response: {
          status: 200,
          body: 'Hello World',
          headers: {
            'content-Length': ['11']
          },
          encodedBody: false
        }
      }
    ]
  }
};
