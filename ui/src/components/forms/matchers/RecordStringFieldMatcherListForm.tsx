import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import type { FieldMatcher } from '@/types/hoverfly';
import { Cross1Icon, PlusIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import FieldMatcherListForm from './FieldMatcherListForm';

type Props = {
  entries?: Record<string, FieldMatcher[]>;
  type: string;
  onChange: (entries: Record<string, FieldMatcher[]>) => void;
  valuePlaceholder?: string;
};

const RecordStringFieldMatcherListForm = ({
  entries = {},
  type,
  onChange,
  valuePlaceholder,
}: Props) => {
  const [newEntryKey, setNewEntryKey] = useState('');

  const handleAddEntry = () => {
    if (!newEntryKey || entries[newEntryKey]) {
      return;
    }

    onChange({ [newEntryKey]: [], ...entries });
    setNewEntryKey('');
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
    <Card>
      <CardContent className="p-4 flex flex-col gap-0">
        <div className="flex flex-row gap-2 mb-4">
          <Input
            type="text"
            placeholder={`Enter the name of the new ${type}`}
            value={newEntryKey}
            onKeyDown={(e) => (e.key === 'Enter' ? handleAddEntry() : undefined)}
            onChange={(e) => setNewEntryKey(e.target.value)}
          />
          <Button
            className="flex gap-2"
            variant="default"
            onClick={handleAddEntry}
            disabled={!newEntryKey}
          >
            <PlusIcon /> Add
          </Button>
        </div>
        {Object.entries(entries).map(([entryKey, matchers]) => (
          <fieldset key={entryKey}>
            <div className="flex flex-row items-center">
              <span className="w-auto fw-bold inline text-lg">{entryKey}</span>
              <Button
                variant="ghost"
                onClick={() => handleDeleteEntry(entryKey)}
                className="w-auto"
              >
                <Cross1Icon />
              </Button>
            </div>
            <div>
              <FieldMatcherListForm
                fieldMatchers={matchers}
                type={`${type} '${entryKey}'`}
                onChange={(fieldMatchers) => handleUpdateFieldMatchers(entryKey, fieldMatchers)}
                valuePlaceholder={valuePlaceholder}
              />
            </div>
          </fieldset>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecordStringFieldMatcherListForm;
