import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ComponentProps, type ComponentRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
);

const Label = forwardRef<
  ComponentRef<typeof LabelPrimitive.Root>,
  ComponentProps<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(function Label({ className, ...props }, ref) {
  return <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />;
});
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
