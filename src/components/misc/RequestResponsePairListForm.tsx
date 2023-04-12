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
    onSubmit(newPairs);
  };

  const handleDelete = (index: number) => {
    const newPairs = [...requestResponsePairs];
    newPairs.splice(index, 1);
    onSubmit(newPairs);
  };

  return (
    <form className="uk-form-stacked">
      <legend className="uk-legend">Request Response Pair List</legend>
      {requestResponsePairs.map((pair, index) => (
        <div className="uk-card uk-card-default uk-card-body uk-margin-bottom" key={index}>
          <div className="uk-margin-bottom">
            <RequestResponseMatcherForm
              pair={pair}
              onSubmit={(newPair) => handleUpdate(index, newPair)}
            />
          </div>
          <div className="uk-flex uk-flex-right">
            <button
              className="uk-button uk-button-danger"
              type="button"
              onClick={() => handleDelete(index)}>
              Delete
            </button>
          </div>
        </div>
      ))}
      <div className="uk-flex uk-flex-right">
        <button
          className="uk-button uk-button-primary"
          type="button"
          onClick={() => onSubmit([...requestResponsePairs, { request: {}, response: {} }])}>
          Add Request Response Pair
        </button>
      </div>
    </form>
  );
};

export default RequestResponsePairListForm;
