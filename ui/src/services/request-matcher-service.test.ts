import { Request } from '@/types/hoverfly';
import { getRequestHeader } from './request-matcher-service';

describe('getPairDisplayName', () => {
  it('returns the correct display name for a given request/response pair', () => {
    const request: Request = {
      method: [{ value: 'GET' }],
      scheme: [{ value: 'https' }],
      destination: [{ value: 'example.com' }],
      path: [{ value: '/' }]
    };
    const displayName = getRequestHeader(request);
    expect(displayName).toEqual('GET https example.com /');
  });

  it('handles missing request and response fields', () => {
    const request: Request = {};
    const displayName = getRequestHeader(request);
    expect(displayName).toEqual('');
  });
});
