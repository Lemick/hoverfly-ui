import React from 'react';
import { Response } from '../../types/hoverfly';

type Props = {
  response?: Response;
  onSubmit: (response: Response) => void;
};

const ResponseMatcherForm = ({ response = {}, onSubmit }: Props) => {
  return (
    <form>
      <fieldset>
        <legend>Response</legend>
        <label>
          Body:
          <textarea
            value={response.body}
            onChange={(e) => onSubmit({ ...response, body: e.target.value })}
          />
        </label>
        <label>
          Body File:
          <input
            type="text"
            value={response.bodyFile}
            onChange={(e) => onSubmit({ ...response, bodyFile: e.target.value })}
          />
        </label>
        <label>
          Encoded Body:
          <input
            type="checkbox"
            checked={response.encodedBody || false}
            onChange={(e) => onSubmit({ ...response, encodedBody: e.target.checked })}
          />
        </label>
        <label>
          Fixed Delay:
          <input
            type="number"
            value={response.fixedDelay}
            onChange={(e) => onSubmit({ ...response, fixedDelay: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Headers:
          <textarea
            value={JSON.stringify(response.headers)}
            onChange={(e) => onSubmit({ ...response, headers: JSON.parse(e.target.value) })}
          />
        </label>
        <label>
          Log Normal Delay:
          <input
            type="text"
            value={JSON.stringify(response.logNormalDelay)}
            onChange={(e) => onSubmit({ ...response, logNormalDelay: JSON.parse(e.target.value) })}
          />
        </label>
        <label>
          Removes State:
          <textarea
            value={JSON.stringify(response.removesState)}
            onChange={(e) => onSubmit({ ...response, removesState: JSON.parse(e.target.value) })}
          />
        </label>
        <label>
          Status:
          <input
            type="number"
            value={response.status}
            onChange={(e) => onSubmit({ ...response, status: parseInt(e.target.value) })}
          />
        </label>
        <label>
          Templated:
          <input
            type="checkbox"
            checked={response.templated || false}
            onChange={(e) => onSubmit({ ...response, templated: e.target.checked })}
          />
        </label>
        <label>
          Transitions State:
          <textarea
            value={JSON.stringify(response.transitionsState)}
            onChange={(e) =>
              onSubmit({ ...response, transitionsState: JSON.parse(e.target.value) })
            }
          />
        </label>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResponseMatcherForm;
