import React from 'react';
import { Response } from '../../types/hoverfly';
import './ResponseMatcherForm.scss';

type Props = {
  response?: Response;
  onSubmit: (response: Response) => void;
};

const ResponseMatcherForm = ({ response = {}, onSubmit }: Props) => {
  return (
    <form className="response-matcher-form">
      <fieldset>
        <legend>Response</legend>
        <div className="form-group">
          <label className="form-label">
            Body:
            <textarea
              className="form-control"
              value={response.body}
              onChange={(e) => onSubmit({ ...response, body: e.target.value })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Encoded Body:
            <input
              type="checkbox"
              className="form-control"
              checked={response.encodedBody || false}
              onChange={(e) => onSubmit({ ...response, encodedBody: e.target.checked })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Fixed Delay:
            <input
              type="number"
              className="form-control"
              value={response.fixedDelay}
              onChange={(e) => onSubmit({ ...response, fixedDelay: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Headers:
            <textarea
              className="form-control"
              value={JSON.stringify(response.headers)}
              onChange={(e) => onSubmit({ ...response, headers: JSON.parse(e.target.value) })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Log Normal Delay:
            <input
              type="text"
              className="form-control"
              value={JSON.stringify(response.logNormalDelay)}
              onChange={(e) =>
                onSubmit({ ...response, logNormalDelay: JSON.parse(e.target.value) })
              }
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Status:
            <input
              type="number"
              className="form-control"
              value={response.status}
              onChange={(e) => onSubmit({ ...response, status: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <div className="form-group">
          <label className="form-label">
            Templated:
            <input
              type="checkbox"
              className="form-control"
              checked={response.templated || false}
              onChange={(e) => onSubmit({ ...response, templated: e.target.checked })}
            />
          </label>
        </div>
      </fieldset>
    </form>
  );
};

export default ResponseMatcherForm;
