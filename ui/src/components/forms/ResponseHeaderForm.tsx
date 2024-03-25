import { FormControl } from '@/components/utilities/FormControl';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import React, { KeyboardEventHandler, useRef, useState } from 'react';
import { PopoverClose } from '@radix-ui/react-popover';

type Props = {
  initialHeaderName?: string;
  initialHeaderValues?: string[];
  onSubmit: (name: string, values: string[]) => void;
};

export default function ResponseHeaderForm({
  initialHeaderName = '',
  initialHeaderValues = [],
  onSubmit
}: Props) {
  const [headerName, setHeaderName] = useState(initialHeaderName);
  const [headerValues, setHeaderValues] = useState(initialHeaderValues.join('&'));
  const canSubmit = headerName && headerValues;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const submit = () => onSubmit(headerName, headerValues.split('&'));

  const keyPressedEnterHandler: KeyboardEventHandler = (e) => {
    if (e.key === 'Enter' && canSubmit) {
      buttonRef.current?.click();
    }
  };

  return (
    <div className="flex flex-col items-start gap-6">
      <FormControl direction="row" className="items-center gap-4">
        <Label htmlFor="headerName">Name</Label>
        <Input
          id="headerName"
          type="text"
          className="w-auto"
          aria-label="Header name"
          value={headerName}
          onKeyDown={keyPressedEnterHandler}
          onChange={(event) => setHeaderName(event.target.value)}
        />
      </FormControl>
      <FormControl direction="row" className="items-center gap-4">
        <Label htmlFor="headerValue">Value</Label>
        <Input
          id="headerValue"
          type="text"
          className="w-auto"
          aria-label="Header value"
          value={headerValues}
          onKeyDown={keyPressedEnterHandler}
          onChange={(e) => setHeaderValues(e.target.value)}
        />
      </FormControl>

      <div className="w-full flex flex-row justify-end">
        <PopoverClose disabled={!canSubmit}>
          <Button disabled={!canSubmit} onClick={submit} ref={buttonRef}>
            Submit
          </Button>
        </PopoverClose>
      </div>
    </div>
  );
}
