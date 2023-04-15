import React from 'react';
import { Request } from '../../types/hoverfly';
import FieldMatcherListForm from './field-matchers/FieldMatcherListForm';
import RecordStringFieldMatcherListForm from './field-matchers/RecordStringFieldMatcherListForm';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

type Props = {
  request: Request;
  onSubmit: (request: Request) => void;
};

const RequestMatcherForm = ({ request, onSubmit }: Props) => {
  return (
    <form className="request-matcher-form">
      <Tab.Container defaultActiveKey="first">
        <fieldset>
          <legend>Request</legend>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="scheme">Scheme</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="destination">Destination</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="path">Path</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="queryParams">Query Params</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="headers">Headers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="body">Body</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="body">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.body}
                  onSubmit={(fieldMatchers) => onSubmit({ ...request, body: fieldMatchers })}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="destination">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.destination}
                  onSubmit={(fieldMatchers) => onSubmit({ ...request, destination: fieldMatchers })}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="headers">
              <div>
                <RecordStringFieldMatcherListForm
                  entries={request.headers}
                  onSubmit={(entries) => {
                    onSubmit({ ...request, headers: entries });
                  }}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="path">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.path}
                  onSubmit={(fieldMatchers) => {
                    onSubmit({ ...request, path: fieldMatchers });
                  }}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="queryParams">
              <div>
                <RecordStringFieldMatcherListForm
                  entries={request.query}
                  onSubmit={(entries) => {
                    onSubmit({ ...request, query: entries });
                  }}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="scheme">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.scheme}
                  onSubmit={(fieldMatchers) => {
                    onSubmit({ ...request, scheme: fieldMatchers });
                  }}
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </fieldset>
      </Tab.Container>
    </form>
  );
};

export default RequestMatcherForm;
