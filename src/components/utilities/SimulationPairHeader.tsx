import React from 'react';
import { getRequestHeader } from '../../services/request-matcher-service';
import { RequestResponsePair } from '../../types/hoverfly';

const ResponseStatusHeader = ({ pair }: { pair: RequestResponsePair }) => {
  function getColorForHTTPCode(httpCode: number) {
    if (httpCode >= 100 && httpCode < 200) {
      return 'text-info';
    } else if (httpCode >= 200 && httpCode < 300) {
      return 'text-success';
    } else if (httpCode >= 300 && httpCode < 400) {
      return 'text-primary';
    } else if (httpCode >= 400 && httpCode < 500) {
      return 'text-warning';
    } else if (httpCode >= 500 && httpCode < 600) {
      return 'text-danger';
    } else {
      return 'text-dark';
    }
  }

  return (
    <span>
      {getRequestHeader(pair.request)} →️&nbsp;
      {pair.response.status ? (
        <span className={getColorForHTTPCode(pair.response.status)}>{pair.response.status}</span>
      ) : null}
    </span>
  );
};

export default ResponseStatusHeader;
