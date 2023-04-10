import React, { useState } from 'react';
import { FieldMatcher, MatcherConfig } from '../../types/hoverfly';

type Props = {
  fieldMatcher?: FieldMatcher;
  onSubmit: (fieldMatcher: FieldMatcher) => void;
};

const FieldMatcherForm: React.FC<Props> = ({ fieldMatcher, onSubmit }) => {
  const [matcher, setMatcher] = useState<string>(fieldMatcher?.matcher || '');
  const [value, setValue] = useState<any>(fieldMatcher?.value || '');
  const [config, setConfig] = useState<MatcherConfig>(fieldMatcher?.config || {});

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ matcher, value, config });
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Field Matcher</legend>
        <label>
          Matcher:
          <input type="text" value={matcher} onChange={(e) => setMatcher(e.target.value)} />
        </label>
        <label>
          Value:
          <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </label>
        <label>
          Config:
          <div>
            <label>
              Ignore Unknown:
              <input
                type="checkbox"
                checked={config?.ignoreUnknown}
                onChange={(e) => setConfig({ ...config, ignoreUnknown: e.target.checked })}
              />
            </label>
            <label>
              Ignore Order:
              <input
                type="checkbox"
                checked={config?.ignoreOrder}
                onChange={(e) => setConfig({ ...config, ignoreOrder: e.target.checked })}
              />
            </label>
            <label>
              Ignore Occurrences:
              <input
                type="checkbox"
                checked={config?.ignoreOccurrences}
                onChange={(e) => setConfig({ ...config, ignoreOccurrences: e.target.checked })}
              />
            </label>
          </div>
        </label>
      </fieldset>
      <button type="submit">{fieldMatcher ? 'Save' : 'Create'}</button>
    </form>
  );
};

export default FieldMatcherForm;
