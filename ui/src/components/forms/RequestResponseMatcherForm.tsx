import { removeEmptyValues } from '@/services/json-service';
import type { Request, RequestResponsePair, Response } from '@/types/hoverfly';
import React from 'react';
import RequestMatcherForm from './RequestMatcherForm';
import ResponseMatcherForm from './ResponseMatcherForm';

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
    <div className="flex flex-col gap-6">
      <RequestMatcherForm
        request={pair.request || {}}
        onChange={onRequestChange}
      />
      <ResponseMatcherForm
        response={pair.response || {}}
        onChange={onResponseChange}
      />
    </div>
  );
};

export default RequestResponseMatcherForm;
