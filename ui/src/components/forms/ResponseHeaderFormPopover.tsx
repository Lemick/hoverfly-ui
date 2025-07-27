import type { ReactNode } from 'react';
import ResponseHeaderForm from '@/components/forms/ResponseHeaderForm';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/Popover';

type Props = {
  children: ReactNode;
  onChange: (name: string, values: string[]) => void;
  initialHeaderName?: string;
  initialHeaderValues?: string[];
};

export default function ResponseHeaderFormPopover({
  children,
  onChange,
  initialHeaderName = '',
  initialHeaderValues = [],
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-120 p-4">
        <div className="flex flex-col gap-6">
          <p className="font-medium leading-none">Add header</p>
          <ResponseHeaderForm
            initialHeaderName={initialHeaderName}
            initialHeaderValues={initialHeaderValues}
            onSubmit={onChange}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
