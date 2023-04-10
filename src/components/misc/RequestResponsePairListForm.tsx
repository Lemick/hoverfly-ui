import React from 'react';
import RequestResponseMatcherForm from './RequestResponseMatcherForm';
import { RequestResponsePair } from '../../types/hoverfly';

type Props = {
  requestResponsePairs: RequestResponsePair[];
  onSubmit: (requestResponsePairs: RequestResponsePair[]) => void;
};

const RequestResponsePairListForm: React.FC<Props> = ({ requestResponsePairs, onSubmit }) => {
  const handleUpdate = (index: number, requestResponsePair: RequestResponsePair) => {
    const newPairs = [...requestResponsePairs];
    newPairs[index] = requestResponsePair;
    console.log('update pair', requestResponsePair);
    onSubmit(newPairs);
  };

  const handleDelete = (index: number) => {
    const newPairs = [...requestResponsePairs];
    newPairs.splice(index, 1);
    onSubmit(newPairs);
  };

  return (
    <form>
      <fieldset>
        <legend>Request Response Pair List</legend>
        {requestResponsePairs.map((pair, index) => (
          <div key={index}>
            <RequestResponseMatcherForm
              pair={pair}
              onSubmit={(newPair) => handleUpdate(index, newPair)}
            />
            <button type="button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onSubmit([...requestResponsePairs, { request: {}, response: {} }])}>
          Add Request Response Pair
        </button>
      </fieldset>
    </form>
  );
};

export default RequestResponsePairListForm;
