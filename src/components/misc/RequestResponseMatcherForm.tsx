import React from 'react';
import { RequestResponsePair } from '../../types/hoverfly';
import RequestMatcherForm from './RequestMatcherForm';
import ResponseMatcherForm from './ResponseMatcherForm';

type Props = {
  pair?: RequestResponsePair;
  onSubmit: (pair: RequestResponsePair) => void;
};

const RequestResponseMatcherForm = ({ pair, onSubmit }: Props) => {
  return (
    <form>
      {pair?.request && (
        <RequestMatcherForm
          request={pair.request}
          onSubmit={(request) => onSubmit({ ...pair, request })}
        />
      )}

      {pair?.response && (
        <ResponseMatcherForm
          response={pair.response}
          onSubmit={(response) => onSubmit({ ...pair, response })}
        />
      )}
    </form>
  );
};

export default RequestResponseMatcherForm;
