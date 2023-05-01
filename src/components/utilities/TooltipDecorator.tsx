import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface TooltipDecoratorProps {
  tooltipText: string;
  placement?: 'top' | 'right' | 'bottom' | 'left';
  children: JSX.Element;
}

const TooltipDecorator = ({ tooltipText, placement = 'top', children }: TooltipDecoratorProps) => {
  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      {tooltipText}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement={placement} delay={{ show: 200, hide: 200 }} overlay={renderTooltip}>
      {children}
    </OverlayTrigger>
  );
};

export default TooltipDecorator;
