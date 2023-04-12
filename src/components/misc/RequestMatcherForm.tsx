import React, { useState } from 'react';
import { Request } from '../../types/hoverfly';
import FieldMatcherListForm from './field-matchers/FieldMatcherListForm';
import RecordStringFieldMatcherListForm from './field-matchers/RecordStringFieldMatcherListForm';
import './RequestMatcherForm.scss';

type Props = {
  request: Request;
  onSubmit: (request: Request) => void;
};

const RequestMatcherForm = ({ request, onSubmit }: Props) => {
  const [selectedField, setSelectedField] = useState('');

  const handleFieldClick = (fieldName: string) => {
    setSelectedField(fieldName === selectedField ? '' : fieldName);
  };

  const renderArrow = (fieldName: string) => {
    if (selectedField === fieldName) {
      return <span>&#9660;</span>; // down arrow
    }
    return <span>&#9654;</span>; // right arrow
  };

  return (
    <form className="request-matcher-form">
      <fieldset>
        <legend>Request</legend>
        <div className="field-group">
          <label className="field-label" onClick={() => handleFieldClick('body')}>
            Body:
            {renderArrow('body')}
          </label>
          <div className={`field-content ${selectedField === 'body' ? 'expanded' : ''}`}>
            <FieldMatcherListForm
              fieldMatchers={request.body}
              onSubmit={(fieldMatchers) => onSubmit({ ...request, body: fieldMatchers })}
            />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label" onClick={() => handleFieldClick('destination')}>
            Destination:
            {renderArrow('destination')}
          </label>
          <div className={`field-content ${selectedField === 'destination' ? 'expanded' : ''}`}>
            <FieldMatcherListForm
              fieldMatchers={request.destination}
              onSubmit={(fieldMatchers) => onSubmit({ ...request, destination: fieldMatchers })}
            />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label" onClick={() => handleFieldClick('headers')}>
            Headers:
            {renderArrow('headers')}
          </label>
          <div className={`field-content ${selectedField === 'headers' ? 'expanded' : ''}`}>
            <RecordStringFieldMatcherListForm
              entries={request.headers}
              onSubmit={(entries) => {
                onSubmit({ ...request, headers: entries });
              }}
            />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label" onClick={() => handleFieldClick('path')}>
            Path:
            {renderArrow('path')}
          </label>
          <div className={`field-content ${selectedField === 'path' ? 'expanded' : ''}`}>
            <FieldMatcherListForm
              fieldMatchers={request.path}
              onSubmit={(fieldMatchers) => {
                onSubmit({ ...request, path: fieldMatchers });
              }}
            />
          </div>
        </div>
        <div className="field-group">
          <label className="field-label" onClick={() => handleFieldClick('query')}>
            Query:
            {renderArrow('query')}
          </label>
          <div className={`field-content ${selectedField === 'query' ? 'expanded' : ''}`}>
            <RecordStringFieldMatcherListForm
              entries={request.query}
              onSubmit={(entries) => {
                onSubmit({ ...request, query: entries });
              }}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default RequestMatcherForm;
