import React from 'react';
import { Request, RequestResponsePair, Response } from '../../types/hoverfly';
import RequestMatcherForm from './RequestMatcherForm';
import ResponseMatcherForm from './ResponseMatcherForm';
import { removeEmptyValues } from '../../services/json-service';
import { Card } from 'react-bootstrap';
import { getRequestHeader } from '../../services/request-matcher-service';
import ResponseStatusHeader from '../utilities/SimulationPairHeader';

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
    <div className="d-flex flex-column gap-3">
      <div className="text-center h5">
        <ResponseStatusHeader pair={pair} />
      </div>
      <Card>
        <Card.Body>
          <Card.Title className="mb-3">Request</Card.Title>
          <RequestMatcherForm request={pair.request || {}} onChange={onRequestChange} />
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title className="mb-3">Response</Card.Title>
          <ResponseMatcherForm response={pair.response || {}} onChange={onResponseChange} />
        </Card.Body>
      </Card>
    </div>
  );
};

export default RequestResponseMatcherForm;
