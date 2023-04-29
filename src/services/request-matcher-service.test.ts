import { RequestResponsePair } from '../types/hoverfly';
import { getPairDisplayName } from './request-matcher-service';

describe('getPairDisplayName', () => {
  it('returns the correct display name for a given request/response pair', () => {
    const pair: RequestResponsePair = {
      request: {
        method: [{ value: 'GET' }],
        scheme: [{ value: 'https' }],
        destination: [{ value: 'example.com' }],
        path: [{ value: '/' }]
      },
      response: {
        status: 200
      }
    };
    const displayName = getPairDisplayName(pair);
    expect(displayName).toEqual('GET https example.com / ➡️ 200');
  });

  it('handles missing request and response fields', () => {
    const pair: RequestResponsePair = {
      request: {},
      response: {}
    };
    const displayName = getPairDisplayName(pair);
    expect(displayName).toEqual('');
  });
});
