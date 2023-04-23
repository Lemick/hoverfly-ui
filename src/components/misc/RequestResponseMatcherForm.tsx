import React from 'react';
import { Request, RequestResponsePair, Response } from '../../types/hoverfly';
import RequestMatcherForm from './RequestMatcherForm';
import ResponseMatcherForm from './ResponseMatcherForm';

function removeEmptyArrays(obj: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => !Array.isArray(value) || value.length > 0)
  );
}

type Props = {
  pair: RequestResponsePair;
  onChange: (pair: RequestResponsePair) => void;
};

const RequestResponseMatcherForm = ({ pair, onChange }: Props) => {
  function onRequestChange(request: Request) {
    const newRequest = removeEmptyArrays(request);
    onChange({ ...pair, request: newRequest });
  }

  function onResponseChange(request: Response) {
    const newRequest = removeEmptyArrays(request);
    onChange({ ...pair, request: newRequest });
  }

  return (
    <form>
      <RequestMatcherForm request={pair.request || {}} onChange={onRequestChange} />

      <ResponseMatcherForm response={pair.response || {}} onChange={onResponseChange} />
    </form>
  );
};

export default RequestResponseMatcherForm;
