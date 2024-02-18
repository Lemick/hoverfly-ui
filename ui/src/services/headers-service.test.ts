import { updateContentLengthAccordingToBodyAltNameTODO } from './headers-service';
import { ResponseHeaders } from '../types/hoverfly';

describe('updateContentLengthAccordingToBody', () => {
  it.each([
    ['do nothing on empty headers', undefined, undefined],
    [
      'do nothing when no Content-Length header',
      { 'Other-Header': ['value'] },
      { 'Other-Header': ['value'] }
    ],
    [
      'do nothing when headers are malformed (not an array)',
      { 'content-Length': '0' },
      { 'content-Length': '0' }
    ],
    ['do nothing when headers array is empty', { 'content-Length': [] }, { 'content-Length': [] }],
    [
      'update Content-Length header',
      { 'Other-header': 'Value', 'content-Length': ['0'] },
      { 'Other-header': 'Value', 'content-Length': ['13'] }
    ]
  ])('should %s', (_, headers, expected) => {
    expect(
      updateContentLengthAccordingToBodyAltNameTODO('Hello, world!', headers as ResponseHeaders)
    ).toEqual(expected);
  });
});
