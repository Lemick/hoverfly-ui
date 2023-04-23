import React from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form } from 'react-bootstrap';
import { TrashFill } from 'react-bootstrap-icons';

type Props = {
  fieldMatchers?: FieldMatcher[];
  type: string;
  onChange: (fieldMatchers: FieldMatcher[]) => void;
};

const FieldMatcherListForm = ({ fieldMatchers = [], type, onChange }: Props) => {
  const handleAdd = () => {
    onChange([...fieldMatchers, { matcher: 'exact', value: '' }]);
  };

  const handleUpdate = (index: number, fieldMatcher: FieldMatcher) => {
    const newMatchers = [...fieldMatchers];
    newMatchers[index] = fieldMatcher;
    onChange(newMatchers);
  };

  const handleDelete = (index: number) => {
    const newMatchers = [...fieldMatchers];
    newMatchers.splice(index, 1);
    onChange(newMatchers);
  };

  return (
    <Form className="mt-3">
      <fieldset>
        {fieldMatchers.map((fieldMatcher, index) => (
          <Card key={index} className="mb-3 mx-1 position-relative">
            <div className="position-absolute" style={{ right: '0px' }}>
              <Button variant="outline-danger" onClick={() => handleDelete(index)} className="w-5">
                <TrashFill />
              </Button>
            </div>

            <Card.Body>
              <FieldMatcherForm
                fieldMatcher={fieldMatcher}
                onChange={(newFieldMatcher: FieldMatcher) => handleUpdate(index, newFieldMatcher)}
              />
            </Card.Body>
          </Card>
        ))}
        <div className="row mx-1">
          <Button variant="outline-success" onClick={handleAdd}>
            Add {type} field matcher
          </Button>
        </div>
      </fieldset>
    </Form>
  );
};

export default FieldMatcherListForm;
