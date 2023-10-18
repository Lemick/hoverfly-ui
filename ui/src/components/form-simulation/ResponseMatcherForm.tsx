import React from 'react';
import { Response } from '../../types/hoverfly';
import ArrowCollapse from '../utilities/ArrowCollapse';
import ResponseBodyEditor from './ResponseBodyEditor';
import { Form } from 'react-bootstrap';
import SelectHttpStatus from '../utilities/SelectHttpStatus';

type Props = {
  response?: Response;
  onChange: (response: Response) => void;
};

const ResponseMatcherForm = ({ response = {}, onChange }: Props) => {
  return (
    <div data-testid="response-form">
      <legend>Response</legend>
      <fieldset className="d-flex flex-column gap-3">
        <Form.Group>
          <Form.Label htmlFor="status">Status:</Form.Label>
          <SelectHttpStatus
            id="status"
            dataTestId="response-status-select"
            className="form-control"
            value={`${response.status}`}
            onChange={(e) => onChange({ ...response, status: parseInt(e.target.value) })}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="body">Body:</Form.Label>
          <ResponseBodyEditor
            value={response?.body}
            onChange={(value) => onChange({ ...response, body: value })}
          />
        </Form.Group>
        <ArrowCollapse visibleByDefault={false}>
          <>
            <Form.Group>
              <Form.Label htmlFor="encodedBody">Encoded Body:</Form.Label>
              <input
                id="encodedBody"
                type="checkbox"
                className="form-check-input"
                checked={response.encodedBody || false}
                onChange={(e) => onChange({ ...response, encodedBody: e.target.checked })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="fixedDelay">Fixed Delay:</Form.Label>
              <input
                id="fixedDelay"
                type="number"
                className="form-control"
                value={response.fixedDelay}
                onChange={(e) => onChange({ ...response, fixedDelay: parseInt(e.target.value) })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="headers">Headers:</Form.Label>
              <textarea
                id="headers"
                className="form-control"
                value={JSON.stringify(response.headers)}
                onChange={(e) => onChange({ ...response, headers: JSON.parse(e.target.value) })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="logNormalDelay">Log Normal Delay:</Form.Label>
              <input
                id="logNormalDelay"
                type="text"
                className="form-control"
                value={JSON.stringify(response.logNormalDelay)}
                onChange={(e) =>
                  onChange({ ...response, logNormalDelay: JSON.parse(e.target.value) })
                }
              />
            </Form.Group>
          </>
        </ArrowCollapse>
      </fieldset>
    </div>
  );
};

export default ResponseMatcherForm;
