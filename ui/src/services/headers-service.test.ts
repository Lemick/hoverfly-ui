import { updateContentLengthAccordingToBody } from './headers-service';
import { ResponseHeaders } from '../types/hoverfly';

describe('updateContentLengthAccordingToBody', () => {
  it.each([
    ['empty headers', '', undefined, undefined],
    [
      'no Content-Length header',
      'Lorem ipsum dolor sit amet',
      { 'Other-Header': ['value'] },
      { 'Other-Header': ['value'] }
    ],
    [
      'update Content-Length header',
      'Hello, world!',
      { 'Other-header': 'Value', 'content-Length': ['0'] },
      { 'Other-header': 'Value', 'content-Length': ['13'] }
    ]
  ])('should %s', (_, body, headers, expected) => {
    expect(updateContentLengthAccordingToBody(body, headers as ResponseHeaders)).toEqual(expected);
  });
});
