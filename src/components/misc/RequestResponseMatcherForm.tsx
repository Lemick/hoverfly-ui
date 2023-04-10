import React, { useState } from 'react';
import { Request, RequestResponsePair, Response } from '../../types/hoverfly';
import FieldMatcherListForm from './FieldMatcherListForm';

type Props = {
  pair?: RequestResponsePair;
  onSubmit: (pair: RequestResponsePair) => void;
};

const RequestResponseMatcherForm = ({ pair, onSubmit }: Props) => {
  const [request, setRequest] = useState<Request>(pair?.request || {});
  const [response, setResponse] = useState<Response>(pair?.response || {});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ request, response });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Request</legend>
        <label>
          Body:
          <FieldMatcherListForm
            fieldMatchers={pair?.request.body}
            onSubmit={(fieldMatchers) => {}}
          />
        </label>
        <label>
          Destination:
          <FieldMatcherListForm
            fieldMatchers={pair?.request.destination}
            onSubmit={(fieldMatchers) => {}}
          />
        </label>
        <label>
          Headers:
          <textarea
            value={JSON.stringify(request.headers)}
            onChange={(e) => setRequest({ ...request, headers: JSON.parse(e.target.value) })}
          />
        </label>
        <label>
          Path:
          <FieldMatcherListForm
            fieldMatchers={pair?.request.path}
            onSubmit={(fieldMatchers) => {}}
          />
        </label>
        <label>
          Query:
          <textarea
            value={JSON.stringify(request.query)}
            onChange={(e) => setRequest({ ...request, query: JSON.parse(e.target.value) })}
          />
        </label>
        <label>
          Requires State:
          <textarea
            value={JSON.stringify(request.requiresState)}
            onChange={(e) => setRequest({ ...request, requiresState: JSON.parse(e.target.value) })}
          />
        </label>
        <label>
          Scheme:
          <FieldMatcherListForm
            fieldMatchers={pair?.request.scheme}
            onSubmit={(fieldMatchers) => {}}
          />
        </label>
      </fieldset>

      <fieldset>
        <legend>Response</legend>
        <label>
          Body:
          <textarea
            value={response.body}
            onChange={(e) => setResponse({ ...response, body: e.target.value })}
          />
        </label>
        <label>
          Body File:
          <input
            type="text"
            value={response.bodyFile}
            onChange={(e) => setResponse({ ...response, bodyFile: e.target.value })}
          />
        </label>
        <label>
          Encoded Body:
          <input
            type="checkbox"
            checked={response.encodedBody || false}
            onChange={(e) => setResponse({ ...response, encodedBody: e.target.checked })}
          />
        </label>
        <label>
          Fixed Delay:
          <input
            type="number"
            value={response.fixedDelay}
            onChange={(e) => setResponse({ ...response, fixedDelay: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Headers:
          <textarea
            value={JSON.stringify(response.headers)}
            onChange={(e) => setResponse({ ...response, headers: JSON.parse(e.target.value) })}
          />
        </label>
        <label>
          Log Normal Delay:
          <input
            type="text"
            value={JSON.stringify(response.logNormalDelay)}
            onChange={(e) =>
              setResponse({ ...response, logNormalDelay: JSON.parse(e.target.value) })
            }
          />
        </label>
        <label>
          Removes State:
          <textarea
            value={JSON.stringify(response.removesState)}
            onChange={(e) => setResponse({ ...response, removesState: JSON.parse(e.target.value) })}
          />
        </label>
        <label>
          Status:
          <input
            type="number"
            value={response.status}
            onChange={(e) => setResponse({ ...response, status: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Templated:
          <input
            type="checkbox"
            checked={response.templated || false}
            onChange={(e) => setResponse({ ...response, templated: e.target.checked })}
          />
        </label>
        <label>
          Transitions State:
          <textarea
            value={JSON.stringify(response.transitionsState)}
            onChange={(e) =>
              setResponse({ ...response, transitionsState: JSON.parse(e.target.value) })
            }
          />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RequestResponseMatcherForm;
