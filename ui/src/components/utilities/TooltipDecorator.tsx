import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import React, { type ReactElement } from 'react';

interface TooltipDecoratorProps {
  tooltipText: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactElement;
}

const TooltipDecorator = ({
  tooltipText,
  placement = 'bottom',
  children,
}: TooltipDecoratorProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent side={placement}>{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipDecorator;
