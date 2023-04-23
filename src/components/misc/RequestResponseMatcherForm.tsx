import React from 'react';
import { RequestResponsePair } from '../../types/hoverfly';
import RequestMatcherForm from './RequestMatcherForm';
import ResponseMatcherForm from './ResponseMatcherForm';

type Props = {
  pair: RequestResponsePair;
  onChange: (pair: RequestResponsePair) => void;
};

const RequestResponseMatcherForm = ({ pair, onChange }: Props) => {
  return (
    <form>
      <RequestMatcherForm
        request={pair.request || {}}
        onChange={(request) => onChange({ ...pair, request })}
      />

      <ResponseMatcherForm
        response={pair.response || {}}
        onChange={(response) => onChange({ ...pair, response })}
      />
    </form>
  );
};

export default RequestResponseMatcherForm;
