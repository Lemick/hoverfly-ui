import React, { useState } from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import FieldMatcherForm from './FieldMatchersForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';

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
    <Card className="my-3">
      <Card.Body>
        <Card.Title>Field Matchers</Card.Title>
        <Form.Group className="my-3">
          <Form.Label>New Entry Key:</Form.Label>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Enter a new key"
              value={newEntryKey}
              onChange={(e) => setNewEntryKey(e.target.value)}
            />
            <Button variant="primary" onClick={handleAddEntry} disabled={!newEntryKey}>
              Add Entry
            </Button>
          </InputGroup>
        </Form.Group>
        {Object.entries(entries).map(([entryKey, matchers]) => (
          <fieldset key={entryKey}>
            <legend>{entryKey}</legend>
            <div className="my-3">
              {matchers.map((fieldMatcher, index) => (
                <Card className="my-3" key={Math.random()}>
                  <Card.Body>
                    <FieldMatcherForm
                      fieldMatcher={fieldMatcher}
                      onSubmit={(newFieldMatcher: FieldMatcher) =>
                        handleUpdateFieldMatcher(entryKey, index, newFieldMatcher)
                      }
                    />
                    <Button
                      variant="danger"
                      className="my-3"
                      onClick={() => handleDeleteFieldMatcher(entryKey, index)}>
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))}
              <Card className="my-3">
                <Card.Body>
                  <Button variant="default" onClick={() => handleAddFieldMatcher(entryKey)}>
                    Add Field Matcher
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </fieldset>
        ))}
      </Card.Body>
    </Card>
  );
};

export default RecordStringFieldMatcherListForm;
