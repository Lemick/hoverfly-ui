import { Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import SimulationPairListForm from './form-simulation/RequestResponsePairListForm';
import React, { useState } from 'react';
import { RequestResponsePair } from '../types/hoverfly';
import { Card } from 'react-bootstrap';
import SimulationPairForm from './form-simulation/RequestResponseMatcherForm';

type Props = {
  requestResponsePairs: RequestResponsePair[];
  onChange: (requestResponsePairs: RequestResponsePair[]) => void;
  onPairOpened: (index: number) => void;
};

export default function SimulationFormRouter({
  requestResponsePairs,
  onChange,
  onPairOpened
}: Props) {
  return (
    <Routes>
      <Route
        index
        path="/"
        element={
          <RouterWrapperSimulationPairListForm
            requestResponsePairs={requestResponsePairs}
            onChange={onChange}
            onPairOpened={onPairOpened}
          />
        }
      />
      <Route
        path="/pair/:index"
        element={
          <RouterWrapperSimulationPairForm
            requestResponsePairs={requestResponsePairs}
            onChange={onChange}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

const RouterWrapperSimulationPairListForm = ({
  requestResponsePairs,
  onChange,
  onPairOpened
}: Props) => {
  const navigate = useNavigate();

  const onOpenPair = (index: number) => {
    navigate(`/pair/${index}`);
    onPairOpened(index);
  };

  return (
    <SimulationPairListForm
      requestResponsePairs={requestResponsePairs}
      onChange={onChange}
      onOpenPair={onOpenPair}
    />
  );
};

const RouterWrapperSimulationPairForm = ({
  requestResponsePairs,
  onChange
}: Omit<Props, 'onPairOpened'>) => {
  const { index } = useParams();

  if (!index || !requestResponsePairs[+index]) {
    return null;
  }

  const onUpdate = (index: number, requestResponsePair: RequestResponsePair) => {
    const newPairs = [...requestResponsePairs];
    newPairs[index] = requestResponsePair;
    onChange(newPairs);
  };

  return (
    <Card.Body>
      <div>
        <SimulationPairForm
          pair={requestResponsePairs[+index]}
          onChange={(newPair) => onUpdate(+index, newPair)}
        />
      </div>
    </Card.Body>
  );
};
