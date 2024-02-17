import React from 'react';
import { Button } from '@/components/ui/Button';

type Props = {
  onClick: () => void;
};

export default function InvalidSimulation({ onClick = () => {} }: Props) {
  return (
    <div className="text-center mt-5">
      <h5>No valid data pairs</h5>
      <Button className="mt-2" variant="secondary" onClick={onClick}>
        Reset simulation
      </Button>
    </div>
  );
}
