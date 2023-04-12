import React from 'react';
import { Response } from '../../types/hoverfly';

type Props = {
  response?: Response;
  onSubmit: (response: Response) => void;
};

const ResponseMatcherForm = ({ response = {}, onSubmit }: Props) => {
  return (
    <form className="uk-form-stacked">
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">Response</legend>
        <div className="uk-margin">
          <label className="uk-form-label">
            Body:
            <textarea
              className="uk-textarea"
              value={response.body}
              onChange={(e) => onSubmit({ ...response, body: e.target.value })}
            />
          </label>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">
            Encoded Body:
            <input
              type="checkbox"
              className="uk-checkbox"
              checked={response.encodedBody || false}
              onChange={(e) => onSubmit({ ...response, encodedBody: e.target.checked })}
            />
          </label>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">
            Fixed Delay:
            <input
              type="number"
              className="uk-input"
              value={response.fixedDelay}
              onChange={(e) => onSubmit({ ...response, fixedDelay: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">
            Headers:
            <textarea
              className="uk-textarea"
              value={JSON.stringify(response.headers)}
              onChange={(e) => onSubmit({ ...response, headers: JSON.parse(e.target.value) })}
            />
          </label>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">
            Log Normal Delay:
            <input
              type="text"
              className="uk-input"
              value={JSON.stringify(response.logNormalDelay)}
              onChange={(e) =>
                onSubmit({ ...response, logNormalDelay: JSON.parse(e.target.value) })
              }
            />
          </label>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">
            Status:
            <input
              type="number"
              className="uk-input"
              value={response.status}
              onChange={(e) => onSubmit({ ...response, status: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">
            Templated:
            <input
              type="checkbox"
              className="uk-checkbox"
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
