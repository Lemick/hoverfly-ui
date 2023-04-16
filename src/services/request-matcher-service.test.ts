import { getPairDisplayName } from './request-matcher-service';

describe('getPairDisplayName', () => {
  it('returns the correct display name for a pair', () => {
    const request = {
      scheme: [{ value: 'https' }],
      destination: [{ value: 'example.com' }],
      path: [{ value: '/path/to/resource' }]
    };

    expect(getPairDisplayName(request)).toBe('https example.com /path/to/resource');
  });

  it('returns an empty string when the pair has no request data', () => {
    const request = {};

    expect(getPairDisplayName(request)).toBe('  ');
  });
});
