import React, { useState } from 'react';
import RequestResponseMatcherForm from './RequestResponseMatcherForm';
import { RequestResponsePair } from '../../types/hoverfly';
import { Accordion, Button, Card } from 'react-bootstrap';
import { getPairDisplayName } from '../../services/request-matcher-service';
import { TrashFill } from 'react-bootstrap-icons';

type Props = {
  requestResponsePairs: RequestResponsePair[];
  onChange: (requestResponsePairs: RequestResponsePair[]) => void;
};

const RequestResponsePairListForm: React.FC<Props> = ({ requestResponsePairs, onChange }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleUpdate = (index: number, requestResponsePair: RequestResponsePair) => {
    const newPairs = [...requestResponsePairs];
    newPairs[index] = requestResponsePair;
    onChange(newPairs);
  };

  const handleDelete = (index: number) => {
    const newPairs = [...requestResponsePairs];
    newPairs.splice(index, 1);
    onChange(newPairs);
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
              <div className="d-flex justify-content-between align-items-center cursor-pointer">
                <div className="col fw-semibold">
                  <span>
                    {index} - {getPairDisplayName(pair.request)}
                  </span>
                </div>
                <div className="col-1 d-flex justify-content-end">
                  <Button
                    variant="outline-danger"
                    type="button"
                    onClick={() => handleDelete(index)}>
                    <TrashFill />
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Accordion.Collapse
              eventKey={`pair-${index}`}
              in={activeIndex === index}
              mountOnEnter={true}
              unmountOnExit={true}>
              <Card.Body>
                <div className="uk-margin-bottom">
                  <RequestResponseMatcherForm
                    pair={pair}
                    onChange={(newPair) => handleUpdate(index, newPair)}
                  />
                </div>
                <div className="uk-flex uk-flex-right"></div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

      <div className="row mx-0 mt-4">
        <Button
          variant="outline-success"
          onClick={() => onChange([...requestResponsePairs, { request: {}, response: {} }])}>
          Add Request Response Pair
        </Button>
      </div>
    </form>
  );
};

export default RequestResponsePairListForm;
