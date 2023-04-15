import React, { useState } from 'react';
import RequestResponseMatcherForm from './RequestResponseMatcherForm';
import { RequestResponsePair } from '../../types/hoverfly';
import { Accordion, Button, Card } from 'react-bootstrap';

type Props = {
  requestResponsePairs: RequestResponsePair[];
  onSubmit: (requestResponsePairs: RequestResponsePair[]) => void;
};

const RequestResponsePairListForm: React.FC<Props> = ({ requestResponsePairs, onSubmit }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
      <Accordion>
        {requestResponsePairs.map((pair, index) => (
          <Card key={index}>
            <Card.Header
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              aria-controls={`pair-${index}`}
              aria-expanded={activeIndex === index}>
              <div className="d-flex justify-content-between align-items-center">
                <div className="col-4"></div>
                <div className="col-4">
                  <span>{index}</span>
                </div>
                <div className="col-4 d-flex justify-content-end">
                  <Button variant="danger" type="button" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey={`pair-${index}`} in={activeIndex === index}>
              <Card.Body>
                <div className="uk-margin-bottom">
                  <RequestResponseMatcherForm
                    pair={pair}
                    onSubmit={(newPair) => handleUpdate(index, newPair)}
                  />
                </div>
                <div className="uk-flex uk-flex-right"></div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
      <div className="uk-flex uk-flex-right">
        <Button
          variant="primary"
          type="button"
          onClick={() => onSubmit([...requestResponsePairs, { request: {}, response: {} }])}>
          Add Request Response Pair
        </Button>
      </div>
    </form>
  );
};

export default RequestResponsePairListForm;
