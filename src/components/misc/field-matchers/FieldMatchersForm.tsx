import React from 'react';
import { FieldMatcher } from '../../../types/hoverfly';

type Props = {
  fieldMatcher?: FieldMatcher;
  onSubmit: (fieldMatcher: FieldMatcher) => void;
};

const FieldMatcherForm: React.FC<Props> = ({
  fieldMatcher = { matcher: '', value: '', config: {} },
  onSubmit
}) => {
  const handleMatcherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFieldMatcher = { ...fieldMatcher, [name]: value };
    onSubmit(newFieldMatcher);
    event.target.focus();
  };

  const handleConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newConfig = { ...fieldMatcher.config, [name]: checked };
    const newFieldMatcher = { ...fieldMatcher, config: newConfig };
    onSubmit(newFieldMatcher);
  };

  return (
    <form className="uk-form-stacked">
      <fieldset className="uk-fieldset">
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="matcher-input">
            Matcher:
          </label>
          <div className="uk-form-controls">
            <input
              className="uk-input"
              type="text"
              name="matcher"
              id="matcher-input"
              value={fieldMatcher.matcher}
              onChange={handleMatcherChange}
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label" htmlFor="value-input">
            Value:
          </label>
          <div className="uk-form-controls">
            <input
              className="uk-input"
              type="text"
              name="value"
              id="value-input"
              value={fieldMatcher.value}
              onChange={handleMatcherChange}
            />
          </div>
        </div>
        <div className="uk-margin">
          <label className="uk-form-label">Config:</label>
          <div className="uk-form-controls uk-flex uk-flex-between">
            <label className="uk-flex uk-flex-middle">
              <input
                className="uk-checkbox"
                type="checkbox"
                name="ignoreUnknown"
                checked={fieldMatcher.config?.ignoreUnknown}
                onChange={handleConfigChange}
              />
              <span>Ignore Unknown</span>
            </label>
            <label className="uk-flex uk-flex-middle">
              <input
                className="uk-checkbox"
                type="checkbox"
                name="ignoreOrder"
                checked={fieldMatcher.config?.ignoreOrder}
                onChange={handleConfigChange}
              />
              <span>Ignore Order</span>
            </label>
            <label className="uk-flex uk-flex-middle">
              <input
                className="uk-checkbox"
                type="checkbox"
                name="ignoreOccurrences"
                checked={fieldMatcher.config?.ignoreOccurrences}
                onChange={handleConfigChange}
              />
              <span>Ignore Occurrences</span>
            </label>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default FieldMatcherForm;
