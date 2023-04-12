import React from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';
import 'uikit/dist/css/uikit.min.css';

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
    <form className="uk-form-horizontal uk-margin-large-top">
      <fieldset className="uk-fieldset">
        <legend className="uk-legend">Matchers</legend>
        {fieldMatchers.map((fieldMatcher, index) => (
          <div
            key={Math.random()}
            className="uk-card uk-card-default uk-margin-bottom uk-position-relative">
            <button
              type="button"
              className="uk-close uk-align-right uk-button-danger"
              onClick={() => handleDelete(index)}>
              Remove
            </button>
            <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
              <FieldMatcherForm
                fieldMatcher={fieldMatcher}
                onSubmit={(newFieldMatcher: FieldMatcher) => handleUpdate(index, newFieldMatcher)}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          className="uk-button uk-button-default uk-margin-top"
          onClick={handleAdd}>
          Add Field Matcher
        </button>
      </fieldset>
    </form>
  );
};

export default FieldMatcherListForm;
