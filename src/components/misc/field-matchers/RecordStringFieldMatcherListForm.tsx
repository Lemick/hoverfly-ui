import React, { useState } from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import FieldMatcherListForm from './FieldMatcherListForm';

type Props = {
  entries?: Record<string, FieldMatcher[]>;
  onChange: (entries: Record<string, FieldMatcher[]>) => void;
};

const RecordStringFieldMatcherListForm: React.FC<Props> = ({ entries = {}, onChange }) => {
  const [newEntryKey, setNewEntryKey] = useState('');

  const handleAddEntry = () => {
    onChange({ ...entries, [newEntryKey]: [] });
    setNewEntryKey('');
  };

  const handleAddFieldMatcher = (entryKey: string) => {
    const newMatchers = entries[entryKey] ? [...entries[entryKey]] : [];
    onChange({ ...entries, [entryKey]: [...newMatchers, { matcher: 'exact', value: '' }] });
  };

  const handleUpdateFieldMatchers = (entryKey: string, fieldMatchers: FieldMatcher[]) => {
    onChange({ ...entries, [entryKey]: fieldMatchers });
  };

  const handleDeleteFieldMatcher = (entryKey: string, index: number) => {
    const newMatchers = [...entries[entryKey]];
    newMatchers.splice(index, 1);
    onChange({ ...entries, [entryKey]: newMatchers });
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
              <FieldMatcherListForm
                fieldMatchers={matchers}
                onChange={(fieldMatchers) => handleUpdateFieldMatchers(entryKey, fieldMatchers)}
              />
            </div>
          </fieldset>
        ))}
      </Card.Body>
    </Card>
  );
};

export default RecordStringFieldMatcherListForm;
