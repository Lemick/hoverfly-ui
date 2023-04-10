import React, { useState } from 'react';
import { FieldMatcher } from '../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';

type Props = {
  fieldMatchers?: FieldMatcher[];
  onSubmit: (fieldMatchers: FieldMatcher[]) => void;
};

const FieldMatcherListForm: React.FC<Props> = ({ fieldMatchers = [], onSubmit }) => {
  const [matchers, setMatchers] = useState<FieldMatcher[]>(fieldMatchers);

  const handleAdd = () => {
    setMatchers([...matchers, { matcher: '', value: '' }]);
  };

  const handleUpdate = (index: number, fieldMatcher: FieldMatcher) => {
    const newMatchers = [...matchers];
    newMatchers[index] = fieldMatcher;
    setMatchers(newMatchers);
  };

  const handleDelete = (index: number) => {
    const newMatchers = [...matchers];
    newMatchers.splice(index, 1);
    setMatchers(newMatchers);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(matchers);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Field Matcher List</legend>
        {matchers &&
          matchers.map((fieldMatcher, index) => (
            <div key={index}>
              <FieldMatcherForm
                fieldMatcher={fieldMatcher}
                onSubmit={(newFieldMatcher: FieldMatcher) => handleUpdate(index, newFieldMatcher)}
              />
              <button type="button" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          ))}
        <button type="button" onClick={handleAdd}>
          Add Field Matcher
        </button>
      </fieldset>
      <button type="submit">Save</button>
    </form>
  );
};

export default FieldMatcherListForm;
