import { Request, RequestResponsePair, Response } from '../types/hoverfly';

export function getPairDisplayName(pair: RequestResponsePair) {
  const request = pair.request;

  const method = (request?.method?.length && request.method[0].value) || '';
  const scheme = (request?.scheme?.length && request.scheme[0].value) || '';
  const destination = (request?.destination?.length && request.destination[0].value) || '';
  const path = (request?.path?.length && request.path[0].value) || '';
  const responseSummary = pair.response?.status ? `➡️ ${pair.response.status}` : '';

  return `${method} ${scheme} ${destination} ${path} ${responseSummary}`.trim();
}
