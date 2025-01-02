import { cn } from '@/lib/utils';
import type { CSSProperties, ReactNode } from 'react';

export function FormControl({
  children,
  direction,
  className,
}: {
  children: ReactNode;
  direction: CSSProperties['flexDirection'];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex gap-2 items-start [&>*]:cursor-pointer',
        direction === 'column' ? 'flex-col' : 'flex-row',
        className,
      )}
    >
      {children}
    </div>
  );
}
