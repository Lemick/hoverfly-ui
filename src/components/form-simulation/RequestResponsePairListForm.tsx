import React, { useState } from 'react';
import RequestResponseMatcherForm from './RequestResponseMatcherForm';
import { RequestResponsePair } from '../../types/hoverfly';
import { Accordion, Button, Card } from 'react-bootstrap';
import { getPairDisplayName } from '../../services/request-matcher-service';
import { TrashFill } from 'react-bootstrap-icons';

type Props = {
  requestResponsePairs: RequestResponsePair[];
  onChange: (requestResponsePairs: RequestResponsePair[]) => void;
  onOpenPair: (index: number) => void;
};

const RequestResponsePairListForm = ({ requestResponsePairs, onChange, onOpenPair }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>();

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

  const onClickHeader = (index: number) => {
    if (activeIndex !== index) {
      setActiveIndex(index);
      onOpenPair(index);
    } else {
      setActiveIndex(undefined);
    }
  };

  return (
    <form>
      <legend className="text-center mb-3">Simulations</legend>
      <Accordion>
        {requestResponsePairs.map((pair, index) => (
          <Card key={index}>
            <Card.Header
              onClick={() => onClickHeader(index)}
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
                <div>
                  <RequestResponseMatcherForm
                    pair={pair}
                    onChange={(newPair) => handleUpdate(index, newPair)}
                  />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

      <div className="row mx-0 mt-4">
        <Button
          variant="outline-success"
          onClick={() => onChange([...requestResponsePairs, { request: {}, response: {} }])}>
          Add request/response pair
        </Button>
      </div>
    </form>
  );
};

export default RequestResponsePairListForm;
