import { ResponseHeaders } from '../types/hoverfly';

export const byteLengthUtf8 = (str: string) => new Blob([str]).size;

// TODO remove
export const updateContentLengthAccordingToBody = (
  body: string,
  headers: ResponseHeaders | undefined
): ResponseHeaders | undefined => {
  if (!headers) {
    return undefined;
  }

  const contentLengthKey = Object.keys(headers).find(
    (key) => key.toLowerCase() === 'content-length'
  );
  if (
    !contentLengthKey ||
    !Array.isArray(headers[contentLengthKey]) ||
    headers[contentLengthKey].length == 0
  ) {
    return headers;
  }

  const updatedHeaders = { ...headers };
  updatedHeaders[contentLengthKey][0] = String(byteLengthUtf8(body)); // Assume that response is UTF-8 encoded, that may not be the case, may be more precise by using Encoding header
  return updatedHeaders;
};
