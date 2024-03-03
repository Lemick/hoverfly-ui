import { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function FormControl({
  children,
  direction,
  className
}: {
  children: ReactNode;
  direction: CSSProperties['flexDirection'];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-start [&>*]:cursor-pointer',
        direction === 'column' ? 'gap-2' : 'gap-4',
        direction === 'column' ? 'flex-col' : 'flex-row',
        className
      )}>
      {children}
    </div>
  );
}
