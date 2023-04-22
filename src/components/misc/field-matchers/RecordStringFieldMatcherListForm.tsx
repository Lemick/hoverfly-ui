import React, { useState } from 'react';
import { FieldMatcher } from '../../../types/hoverfly';
import { Button, Card, Form, InputGroup } from 'react-bootstrap';
import FieldMatcherListForm from './FieldMatcherListForm';
import { TrashFill } from 'react-bootstrap-icons';

type Props = {
  entries?: Record<string, FieldMatcher[]>;
  onChange: (entries: Record<string, FieldMatcher[]>) => void;
};

const RecordStringFieldMatcherListForm: React.FC<Props> = ({ entries = {}, onChange }) => {
  const [newEntryKey, setNewEntryKey] = useState('');
  const [showAddEntryControl, setShowAddEntryControl] = useState(false);

  const handleAddEntry = () => {
    onChange({ ...entries, [newEntryKey]: [] });
    setNewEntryKey('');
    setShowAddEntryControl(false);
  };

  const handleUpdateFieldMatchers = (entryKey: string, fieldMatchers: FieldMatcher[]) => {
    onChange({ ...entries, [entryKey]: fieldMatchers });
  };

  const handleDeleteEntry = (entryKey: string) => {
    const newEntries = { ...entries };
    delete newEntries[entryKey];
    onChange(newEntries);
  };

  return (
    <Card className="my-3">
      <Card.Body>
        {showAddEntryControl ? (
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
        ) : (
          <Button
            variant="outline-success"
            onClick={() => setShowAddEntryControl(true)}
            className="mb-3">
            Add
          </Button>
        )}
        {Object.entries(entries).map(([entryKey, matchers]) => (
          <fieldset key={entryKey}>
            <div className="row align-items-center">
              <span className="h4 w-auto inline">{entryKey}</span>
              <Button
                variant="outline-danger"
                onClick={() => handleDeleteEntry(entryKey)}
                className="w-auto">
                <TrashFill />
              </Button>
            </div>

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
