import React, { useState } from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';

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
    <form>
      {Object.entries(entries).map(([entryKey, matchers]) => (
        <fieldset key={entryKey}>
          <legend>{entryKey}</legend>
          {matchers.map((fieldMatcher, index) => (
            <div key={Math.random()}>
              <FieldMatcherForm
                fieldMatcher={fieldMatcher}
                onSubmit={(newFieldMatcher: FieldMatcher) =>
                  handleUpdateFieldMatcher(entryKey, index, newFieldMatcher)
                }
              />
              <button type="button" onClick={() => handleDeleteFieldMatcher(entryKey, index)}>
                Delete
              </button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddFieldMatcher(entryKey)}>
            Add Field Matcher
          </button>
        </fieldset>
      ))}
      <div>
        <label htmlFor="new-entry-input">New Entry Key:</label>
        <input
          id="new-entry-input"
          type="text"
          value={newEntryKey}
          onChange={(e) => setNewEntryKey(e.target.value)}
        />
        <button type="button" onClick={handleAddEntry}>
          Add Entry
        </button>
      </div>
    </form>
  );
};

export default RecordStringFieldMatcherListForm;
