import React, { useState } from 'react';
import RequestResponseMatcherForm from './RequestResponseMatcherForm';
import { RequestResponsePair } from '../../types/hoverfly';

type Props = {
  requestResponsePairs: RequestResponsePair[];
  onSubmit: (requestResponsePairs: RequestResponsePair[]) => void;
};

const RequestResponsePairListForm: React.FC<Props> = ({ requestResponsePairs, onSubmit }) => {
  const [pairs, setPairs] = useState<RequestResponsePair[]>(requestResponsePairs);

  const handleUpdate = (index: number, requestResponsePair: RequestResponsePair) => {
    const newPairs = [...pairs];
    newPairs[index] = requestResponsePair;
    setPairs(newPairs);
  };

  const handleDelete = (index: number) => {
    const newPairs = [...pairs];
    newPairs.splice(index, 1);
    setPairs(newPairs);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(pairs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Request Response Pair List</legend>
        {pairs.map((pair, index) => (
          <div key={index}>
            <RequestResponseMatcherForm
              pair={pair}
              onSubmit={(newPair) => handleUpdate(index, newPair)}
            />
            v
            <button type="button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
        <button type="button" onClick={() => setPairs([...pairs, { request: {}, response: {} }])}>
          Add Request Response Pair
        </button>
      </fieldset>
      <button type="submit">Save</button>
    </form>
  );
};

export default RequestResponsePairListForm;
