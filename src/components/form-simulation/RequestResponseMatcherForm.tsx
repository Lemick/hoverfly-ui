import React from 'react';
import { Request, RequestResponsePair, Response } from '../../types/hoverfly';
import RequestMatcherForm from './RequestMatcherForm';
import ResponseMatcherForm from './ResponseMatcherForm';
import { removeEmptyValues } from '../../services/json-service';

type Props = {
  pair: RequestResponsePair;
  onChange: (pair: RequestResponsePair) => void;
};

const RequestResponseMatcherForm = ({ pair, onChange }: Props) => {
  function onRequestChange(request: Request) {
    const newRequest = removeEmptyValues(request);
    onChange({ ...pair, request: newRequest });
  }

  function onResponseChange(response: Response) {
    onChange({ ...pair, response });
  }

  return (
    <form>
      <RequestMatcherForm request={pair.request || {}} onChange={onRequestChange} />

      <ResponseMatcherForm response={pair.response || {}} onChange={onResponseChange} />
    </form>
  );
};

export default RequestResponseMatcherForm;
