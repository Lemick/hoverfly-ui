import React, { useState } from 'react';
import RequestResponseMatcherForm from './RequestResponseMatcherForm';
import { RequestResponsePair } from '../../types/hoverfly';
import { Accordion, Button, Card } from 'react-bootstrap';
import { getRequestHeader } from '../../services/request-matcher-service';
import { TrashFill, Files } from 'react-bootstrap-icons';
import TooltipDecorator from '../utilities/TooltipDecorator';

type Props = {
  requestResponsePairs: RequestResponsePair[];
  onChange: (requestResponsePairs: RequestResponsePair[]) => void;
  onOpenPair: (index: number) => void;
};

const RequestResponsePairListForm = ({ requestResponsePairs, onChange, onOpenPair }: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  const onUpdate = (index: number, requestResponsePair: RequestResponsePair) => {
    const newPairs = [...requestResponsePairs];
    newPairs[index] = requestResponsePair;
    onChange(newPairs);
  };

  const onDuplicate = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    const newPairs = [...requestResponsePairs];
    newPairs.splice(index, 0, { ...newPairs[index] });
    onChange(newPairs);
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => {
    e.stopPropagation();

    if (activeIndex && indexToRemove < activeIndex) {
      setActiveIndex(activeIndex - 1);
    }

    const newPairs = [...requestResponsePairs];
    newPairs.splice(indexToRemove, 1);
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

  function onAddRequestResponsePair() {
    const newPair = {
      request: {},
      response: { status: 200 }
    };
    onChange([...requestResponsePairs, newPair]);
  }

  return (
    <div>
      <h3 className="text-center mb-3">Simulations</h3>
      <Accordion>
        {requestResponsePairs.map((pair, index) => (
          <Card key={index}>
            <Card.Header
              onClick={() => onClickHeader(index)}
              aria-controls={`pair-${index}`}
              aria-expanded={activeIndex === index}
            >
              <div className="d-flex justify-content-between align-items-center cursor-pointer">
                <div className="col fw-semibold">
                  <span>
                    {index} - {getRequestHeader(pair.request)} →️&nbsp;
                    <ResponseStatusHeader status={pair.response?.status} />
                  </span>
                </div>
                <div className="d-flex gap-2 justify-content-end">
                  <TooltipDecorator tooltipText="Duplicate">
                    <Button
                      variant="outline-secondary"
                      type="button"
                      onClick={(e) => onDuplicate(e, index)}
                    >
                      <Files />
                    </Button>
                  </TooltipDecorator>

                  <TooltipDecorator tooltipText="Delete">
                    <Button
                      variant="outline-danger"
                      type="button"
                      onClick={(e) => onDelete(e, index)}
                    >
                      <TrashFill />
                    </Button>
                  </TooltipDecorator>
                </div>
              </div>
            </Card.Header>
            <Accordion.Collapse
              eventKey={`pair-${index}`}
              in={activeIndex === index}
              mountOnEnter={true}
              unmountOnExit={true}
            >
              <Card.Body>
                <div>
                  <RequestResponseMatcherForm
                    pair={pair}
                    onChange={(newPair) => onUpdate(index, newPair)}
                  />
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

      <div className="row mx-0 mt-4">
        <Button variant="outline-success" onClick={onAddRequestResponsePair}>
          Add request/response pair
        </Button>
      </div>
    </div>
  );
};

export default RequestResponsePairListForm;

const ResponseStatusHeader = ({ status }: { status?: number }) => {
  if (!status) {
    return null;
  }

  function getColorForHTTPCode(httpCode: number) {
    if (httpCode >= 100 && httpCode < 200) {
      return 'text-info';
    } else if (httpCode >= 200 && httpCode < 300) {
      return 'text-success';
    } else if (httpCode >= 300 && httpCode < 400) {
      return 'text-primary';
    } else if (httpCode >= 400 && httpCode < 500) {
      return 'text-warning';
    } else if (httpCode >= 500 && httpCode < 600) {
      return 'text-danger';
    } else {
      return 'text-dark';
    }
  }

  return <span className={getColorForHTTPCode(status)}>{status}</span>;
};
