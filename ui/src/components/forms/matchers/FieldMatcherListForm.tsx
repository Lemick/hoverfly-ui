import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { FieldMatcher } from '@/types/hoverfly';
import { PlusIcon } from '@radix-ui/react-icons';
import React, { useMemo } from 'react';
import FieldMatcherForm from './FieldMatchersForm';

type Props = {
  fieldMatchers?: FieldMatcher[];
  type: string;
  valuePlaceholder?: string;
  onChange: (fieldMatchers: FieldMatcher[]) => void;
  forceFullEditor?: boolean;
};

const FieldMatcherListForm = ({
  fieldMatchers = [],
  type,
  onChange,
  valuePlaceholder,
  forceFullEditor = false,
}: Props) => {
  const id = useMemo(() => Math.random(), []);

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
    <div className="flex flex-col gap-3">
      {fieldMatchers.map((fieldMatcher, index) => (
        <Card className="p-4" key={index}>
          <FieldMatcherForm
            id={`${id}_idx${index}`}
            fieldMatcher={fieldMatcher}
            onChange={(newFieldMatcher: FieldMatcher) => handleUpdate(index, newFieldMatcher)}
            onDeleteRequest={() => handleDelete(index)}
            valuePlaceholder={valuePlaceholder}
            forceFullEditor={forceFullEditor}
          />
        </Card>
      ))}
      <div className="w-full flex flex-row justify-center" data-testid="add-matcher-button">
        {fieldMatchers?.length === 0 ? (
          <Button className="w-[400px] mt-6 mb-6" variant="secondary" onClick={handleAdd}>
            <span>{`Add first field matcher for ${type}`}</span>
          </Button>
        ) : (
          <Button className="w-[150px] h-8" variant="ghost" onClick={handleAdd}>
            <PlusIcon height={18} width={18} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FieldMatcherListForm;
