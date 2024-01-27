import React, { ReactElement, useState } from 'react';
import { Collapse } from 'react-bootstrap';
import { ChevronDown } from 'react-bootstrap-icons';

type Props = {
  children: ReactElement;
  visibleByDefault: boolean;
};

export default function ArrowCollapse({ children, visibleByDefault = false }: Props) {
  const [isVisible, setIsVisible] = useState(visibleByDefault);

  return (
    <div className="text-center">
      {!isVisible && (
        <span>
          <ChevronDown className="cursor-pointer w-100" onClick={() => setIsVisible(!isVisible)} />
        </span>
      )}

      <Collapse in={isVisible}>
        <div className="mt-2">{children}</div>
      </Collapse>
    </div>
  );
}
