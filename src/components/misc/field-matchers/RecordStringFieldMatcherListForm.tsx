import React, { useState } from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';
import 'uikit/dist/css/uikit.min.css';

type Props = {
  entries?: Record<string, FieldMatcher[]>;
  onSubmit: (entries: Record<string, FieldMatcher[]>) => void;
};

const RecordStringFieldMatcherListForm: React.FC<Props> = ({ entries = {}, onSubmit }) => {
  const [newEntryKey, setNewEntryKey] = useState('');

  const handleAddEntry = () => {
    onSubmit({ ...entries, [newEntryKey]: [] });
    setNewEntryKey('');
  };

  const handleAddFieldMatcher = (entryKey: string) => {
    const newMatchers = entries[entryKey] ? [...entries[entryKey]] : [];
    onSubmit({ ...entries, [entryKey]: [...newMatchers, { matcher: '', value: '' }] });
  };

  const handleUpdateFieldMatcher = (
    entryKey: string,
    index: number,
    fieldMatcher: FieldMatcher
  ) => {
    const newMatchers = [...entries[entryKey]];
    newMatchers[index] = fieldMatcher;
    onSubmit({ ...entries, [entryKey]: newMatchers });
  };

  const handleDeleteFieldMatcher = (entryKey: string, index: number) => {
    const newMatchers = [...entries[entryKey]];
    newMatchers.splice(index, 1);
    onSubmit({ ...entries, [entryKey]: newMatchers });
  };

  return (
    <div className="uk-card uk-card-default uk-card-body uk-margin-bottom">
      <h3 className="uk-card-title">Field Matchers</h3>
      <div className="uk-margin-bottom">
        <div className="uk-grid-small uk-flex-middle">
          <div className="uk-width-auto">
            <label className="uk-form-label" htmlFor="new-entry-input">
              New Entry Key:
            </label>
          </div>
          <div className="uk-width-expand">
            <div className="uk-inline">
              <input
                className="uk-input"
                id="new-entry-input"
                type="text"
                placeholder="Enter a new key"
                value={newEntryKey}
                onChange={(e) => setNewEntryKey(e.target.value)}
              />
            </div>
          </div>
          <div className="uk-width-auto">
            <button
              className="uk-button uk-button-primary"
              type="button"
              onClick={handleAddEntry}
              disabled={!newEntryKey}>
              Add Entry
            </button>
          </div>
        </div>
      </div>
      {Object.entries(entries).map(([entryKey, matchers]) => (
        <fieldset key={entryKey}>
          <legend className="uk-legend">{entryKey}</legend>
          <div className="uk-grid-small">
            <div className="uk-width-expand">
              {matchers.map((fieldMatcher, index) => (
                <div
                  key={Math.random()}
                  style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}
                  className="uk-card uk-card-body uk-card-small uk-margin-bottom">
                  <FieldMatcherForm
                    fieldMatcher={fieldMatcher}
                    onSubmit={(newFieldMatcher: FieldMatcher) =>
                      handleUpdateFieldMatcher(entryKey, index, newFieldMatcher)
                    }
                  />
                  <button
                    className="uk-button uk-button-danger uk-margin-top"
                    type="button"
                    onClick={() => handleDeleteFieldMatcher(entryKey, index)}>
                    Delete
                  </button>
                </div>
              ))}
              <div className="uk-card uk-card-body uk-card-small uk-margin-bottom">
                <button
                  className="uk-button uk-button-default"
                  type="button"
                  onClick={() => handleAddFieldMatcher(entryKey)}>
                  Add Field Matcher
                </button>
              </div>
            </div>
          </div>
        </fieldset>
      ))}
    </div>
  );
};

export default RecordStringFieldMatcherListForm;
