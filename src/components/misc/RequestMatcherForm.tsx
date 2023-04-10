import React from 'react';
import { Request } from '../../types/hoverfly';
import FieldMatcherListForm from './FieldMatcherListForm';

type Props = {
  request: Request;
  onSubmit: (request: Request) => void;
};

const RequestMatcherForm = ({ request, onSubmit }: Props) => {
  console.log('request compo', request);
  return (
    <form>
      <fieldset>
        <legend>Request</legend>
        <label>
          Body:
          <FieldMatcherListForm
            fieldMatchers={request.body}
            onSubmit={(fieldMatchers) => onSubmit({ ...request, body: fieldMatchers })}
          />
        </label>
        <label>
          Destination:
          <FieldMatcherListForm
            fieldMatchers={request.destination}
            onSubmit={(fieldMatchers) => onSubmit({ ...request, destination: fieldMatchers })}
          />
        </label>
        <label>
          Headers:
          <textarea
            value={JSON.stringify(request.headers)}
            onSubmit={(fieldMatchers) => onSubmit({ ...request, headers: request.headers })}
          />
        </label>
        <label>
          Path:
          <FieldMatcherListForm
            fieldMatchers={request.path}
            onSubmit={(fieldMatchers) => {
              onSubmit({ ...request, path: fieldMatchers });
              console.log('update path', { ...request, path: fieldMatchers });
            }}
          />
        </label>
        <label>
          Query:
          <textarea
            value={JSON.stringify(request.query)}
            onSubmit={(fieldMatchers) => onSubmit({ ...request, query: request.query })}
          />
        </label>
        <label>
          Requires State:
          <textarea
            value={JSON.stringify(request.requiresState)}
            onSubmit={(fieldMatchers) =>
              onSubmit({ ...request, requiresState: request.requiresState })
            }
          />
        </label>
        <label>
          Scheme:
          <FieldMatcherListForm
            fieldMatchers={request.scheme}
            onSubmit={(fieldMatchers) => onSubmit({ ...request, scheme: fieldMatchers })}
          />
        </label>
      </fieldset>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RequestMatcherForm;
