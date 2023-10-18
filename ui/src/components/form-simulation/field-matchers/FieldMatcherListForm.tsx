import React, { useMemo } from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card } from 'react-bootstrap';
import { Plus, TrashFill } from 'react-bootstrap-icons';
import cn from 'classnames';

type Props = {
  fieldMatchers?: FieldMatcher[];
  type: string;
  valuePlaceholder?: string;
  onChange: (fieldMatchers: FieldMatcher[]) => void;
};

const FieldMatcherListForm = ({ fieldMatchers = [], type, onChange, valuePlaceholder }: Props) => {
  const id = useMemo(() => crypto.randomUUID(), []);

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
    <div className="mt-3">
      {fieldMatchers.map((fieldMatcher, index) => (
        <Card
          key={index}
          className={cn({ 'mb-3': index < fieldMatchers.length - 1 }, 'mx-1 position-relative')}>
          <div className="position-absolute" style={{ right: '0px' }}>
            <Button variant="outline-danger" onClick={() => handleDelete(index)} className="w-5">
              <TrashFill />
            </Button>
          </div>

          <Card.Body>
            <FieldMatcherForm
              id={id}
              fieldMatcher={fieldMatcher}
              onChange={(newFieldMatcher: FieldMatcher) => handleUpdate(index, newFieldMatcher)}
              valuePlaceholder={valuePlaceholder}
            />
          </Card.Body>
        </Card>
      ))}
      <div
        className="mt-1 text-center cursor-pointer"
        onClick={handleAdd}
        data-testid="add-matcher-button">
        {fieldMatchers?.length === 0 ? (
          <Button className="w-100" variant="outline-success" onClick={handleAdd}>
            Add first field matcher for {type}
          </Button>
        ) : (
          <Plus size={20} />
        )}
      </div>
    </div>
  );
};

export default FieldMatcherListForm;
