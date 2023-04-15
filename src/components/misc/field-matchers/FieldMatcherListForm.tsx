import React from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';

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
    <Form className="mt-1">
      <fieldset>
        <legend>Matchers</legend>
        {fieldMatchers.map((fieldMatcher, index) => (
          <Card key={index} className="mb-3">
            <Button variant="danger" className="float-right" onClick={() => handleDelete(index)}>
              Remove
            </Button>
            <Card.Body style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '20px' }}>
              <FieldMatcherForm
                fieldMatcher={fieldMatcher}
                onSubmit={(newFieldMatcher: FieldMatcher) => handleUpdate(index, newFieldMatcher)}
              />
            </Card.Body>
          </Card>
        ))}
        <Button variant="secondary" className="mt-3" onClick={handleAdd}>
          Add Field Matcher
        </Button>
      </fieldset>
    </Form>
  );
};

export default FieldMatcherListForm;
