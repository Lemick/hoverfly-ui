import { HoverflySimulation, Request } from '../types/hoverfly';

export function getRequestHeader(request: Request) {
  const method = (request?.method?.length && request.method[0].value) || '';
  const scheme = (request?.scheme?.length && request.scheme[0].value) || '';
  const destination = (request?.destination?.length && request.destination[0].value) || '';
  const path = (request?.path?.length && request.path[0].value) || '';

  return `${method} ${scheme} ${destination} ${path}`.trim();
}

export function initHoverflySimulation(initRequestResponsePair: boolean): HoverflySimulation {
  return {
    meta: {
      schemaVersion: 'v5.2',
      hoverflyVersion: 'v1.6.0',
      timeExported: new Date().toISOString()
    },
    data: { pairs: initRequestResponsePair ? [{ request: {}, response: { status: 200 } }] : [] }
  };
}
