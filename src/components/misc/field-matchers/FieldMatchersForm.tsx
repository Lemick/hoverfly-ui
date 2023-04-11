import React from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import './FieldMatchersForm.scss';

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
  };

  const handleConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newConfig = { ...fieldMatcher.config, [name]: checked };
    const newFieldMatcher = { ...fieldMatcher, config: newConfig };
    onSubmit(newFieldMatcher);
  };

  return (
    <form>
      <fieldset>
        <legend>Field Matcher</legend>
        <div className="form-group">
          <label className="form-label" htmlFor="matcher-input">
            Matcher:
          </label>
          <input
            className="form-input"
            type="text"
            name="matcher"
            id="matcher-input"
            value={fieldMatcher.matcher}
            onChange={handleMatcherChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="value-input">
            Value:
          </label>
          <input
            className="form-input"
            type="text"
            name="value"
            id="value-input"
            value={fieldMatcher.value}
            onChange={handleMatcherChange}
          />
        </div>
        <div className="form-group">
          <label className="form-label">Config:</label>
          <div className="form-checkbox-group">
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="ignoreUnknown"
                checked={fieldMatcher.config?.ignoreUnknown}
                onChange={handleConfigChange}
              />
              <span className="form-checkbox-label">Ignore Unknown</span>
            </label>
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="ignoreOrder"
                checked={fieldMatcher.config?.ignoreOrder}
                onChange={handleConfigChange}
              />
              <span className="form-checkbox-label">Ignore Order</span>
            </label>
            <label className="form-checkbox">
              <input
                type="checkbox"
                name="ignoreOccurrences"
                checked={fieldMatcher.config?.ignoreOccurrences}
                onChange={handleConfigChange}
              />
              <span className="form-checkbox-label">Ignore Occurrences</span>
            </label>
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default FieldMatcherForm;
