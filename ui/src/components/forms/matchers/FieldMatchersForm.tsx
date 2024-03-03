import React from 'react';
import { FieldMatcher } from '@/types/hoverfly';
import { Checkbox } from '@/components/ui/Checkbox';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { TrashIcon, GearIcon } from '@radix-ui/react-icons';
import { FormControl } from '@/components/utilities/FormControl';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

type Props = {
  id: string;
  fieldMatcher: FieldMatcher;
  onChange: (fieldMatcher: FieldMatcher) => void;
  onDeleteRequest: () => void;
  valuePlaceholder?: string;
};

const FieldMatcherForm = ({
  id,
  fieldMatcher = { matcher: 'exact', value: '' },
  onChange,
  onDeleteRequest,
  valuePlaceholder
}: Props) => {
  const handleMatcherChange = (name: string, value: string) => {
    const newFieldMatcher = { ...fieldMatcher, [name]: value };
    onChange(newFieldMatcher);
  };

  const handleConfigChange = (name: string, checked: boolean) => {
    const newConfig = { ...fieldMatcher.config, [name]: checked };
    const atLeastOneTrueValue = Object.values(newConfig).some((v) => v);

    const newFieldMatcher = {
      ...fieldMatcher,
      config: atLeastOneTrueValue ? newConfig : undefined
    };
    onChange(newFieldMatcher);
  };

  const generateDomId = (suffix: string) => `${id}_${suffix}`;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-3 items-end">
        <FormControl direction="column">
          <Label htmlFor={generateDomId('select-matcher')}>Matcher</Label>
          <Select
            name="matcher"
            value={fieldMatcher.matcher}
            onValueChange={(value: string) => handleMatcherChange('matcher', value)}>
            <SelectTrigger
              id={generateDomId('select-matcher')}
              className="w-[180px]"
              data-testid="select-matcher">
              <SelectValue placeholder="matcher" />
            </SelectTrigger>
            <SelectContent data-testid="select-matcher-options">
              <SelectItem value="exact">Exact</SelectItem>
              <SelectItem value="glob">Glob</SelectItem>
              <SelectItem value="regex">Regex</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="jsonPartial">JSON Partial</SelectItem>
              <SelectItem value="jsonPath">JSON Path</SelectItem>
              <SelectItem value="xml">XML</SelectItem>
              <SelectItem value="xpath">XPath</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>

        <FormControl direction="column" className="w-full">
          <Label htmlFor={generateDomId('matcher-value')}>Value</Label>
          <Input
            id={generateDomId('matcher-value')}
            type="text"
            name="value"
            placeholder={valuePlaceholder}
            value={fieldMatcher.value}
            onChange={(e) => handleMatcherChange('value', e.target.value)}
          />
        </FormControl>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" aria-label="Advanced options">
              <GearIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-50 p-4">
            <div className="flex flex-col gap-5">
              <p className="font-medium leading-none">Advanced options</p>

              <div className="flex flex-col items-start gap-3">
                <FormControl direction="row">
                  <Checkbox
                    id={generateDomId('ignoreUnknown')}
                    name="ignoreUnknown"
                    checked={!!fieldMatcher.config?.ignoreUnknown}
                    onCheckedChange={(checked) => handleConfigChange('ignoreUnknown', !!checked)}
                  />
                  <Label htmlFor={generateDomId('ignoreUnknown')}>Ignore Unknown</Label>
                </FormControl>
                <FormControl direction="row">
                  <Checkbox
                    id={generateDomId('ignoreOrder')}
                    name="ignoreOrder"
                    checked={!!fieldMatcher.config?.ignoreOrder}
                    onCheckedChange={(checked) => handleConfigChange('ignoreOrder', !!checked)}
                  />
                  <Label htmlFor={generateDomId('ignoreOrder')}>Ignore Order</Label>
                </FormControl>
                <FormControl direction="row">
                  <Checkbox
                    id={generateDomId('ignoreOccurrences')}
                    name="ignoreOccurrences"
                    checked={!!fieldMatcher.config?.ignoreOccurrences}
                    onCheckedChange={(checked) =>
                      handleConfigChange('ignoreOccurrences', !!checked)
                    }
                  />
                  <Label htmlFor={generateDomId('ignoreOccurrences')}>Ignore Occurrences</Label>
                </FormControl>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button variant="destructive" onClick={onDeleteRequest}>
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default FieldMatcherForm;
