import React from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';
import './FieldMatcherListForm.scss';

type Props = {
  fieldMatchers?: FieldMatcher[];
  onSubmit: (fieldMatchers: FieldMatcher[]) => void;
};

const FieldMatcherListForm: React.FC<Props> = ({ fieldMatchers = [], onSubmit }) => {
  const handleAdd = () => {
    onSubmit([...fieldMatchers, { matcher: '', value: '' }]);
  };

  const handleUpdate = (index: number, fieldMatcher: FieldMatcher) => {
    const newMatchers = [...fieldMatchers];
    newMatchers[index] = fieldMatcher;
    onSubmit(newMatchers);
  };

  const handleDelete = (index: number) => {
    const newMatchers = [...fieldMatchers];
    newMatchers.splice(index, 1);
    onSubmit(newMatchers);
  };

  return (
    <form className="field-matcher-list-form">
      <fieldset>
        <legend>Field Matcher List</legend>
        {fieldMatchers &&
          fieldMatchers.map((fieldMatcher, index) => (
            <div key={Math.random()} className="field-matcher-list-form__field-matcher">
              <FieldMatcherForm
                fieldMatcher={fieldMatcher}
                onSubmit={(newFieldMatcher: FieldMatcher) => handleUpdate(index, newFieldMatcher)}
              />
              <button type="button" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          ))}
        <button type="button" onClick={handleAdd} className="field-matcher-list-form__add-button">
          Add Field Matcher
        </button>
      </fieldset>
    </form>
  );
};

export default FieldMatcherListForm;
