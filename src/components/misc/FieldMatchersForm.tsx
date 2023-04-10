import React from 'react';
import { FieldMatcher } from '../../types/hoverfly';

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
        <label>
          Matcher:
          <input
            type="text"
            name="matcher"
            value={fieldMatcher.matcher}
            onChange={handleMatcherChange}
          />
        </label>
        <label>
          Value:
          <input
            type="text"
            name="value"
            value={fieldMatcher.value}
            onChange={handleMatcherChange}
          />
        </label>
        <label>
          Config:
          <div>
            <label>
              Ignore Unknown:
              <input
                type="checkbox"
                name="ignoreUnknown"
                checked={fieldMatcher.config?.ignoreUnknown}
                onChange={handleConfigChange}
              />
            </label>
            <label>
              Ignore Order:
              <input
                type="checkbox"
                name="ignoreOrder"
                checked={fieldMatcher.config?.ignoreOrder}
                onChange={handleConfigChange}
              />
            </label>
            <label>
              Ignore Occurrences:
              <input
                type="checkbox"
                name="ignoreOccurrences"
                checked={fieldMatcher.config?.ignoreOccurrences}
                onChange={handleConfigChange}
              />
            </label>
          </div>
        </label>
      </fieldset>
    </form>
  );
};

export default FieldMatcherForm;
