import React from 'react';
import { Request } from '../../types/hoverfly';
import FieldMatcherListForm from './field-matchers/FieldMatcherListForm';
import RecordStringFieldMatcherListForm from './field-matchers/RecordStringFieldMatcherListForm';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import { Badge } from 'react-bootstrap';

type Props = {
  request: Request;
  onChange: (request: Request) => void;
};

const CountMatcherBadge = ({ elements }: { elements?: unknown[] | object }) => {
  if (!elements) {
    return null;
  }

  const elementsCount = Array.isArray(elements) ? elements.length : Object.keys(elements).length;
  return (
    <Badge pill={true} bg={elementsCount > 0 ? 'success' : 'secondary'}>
      {elementsCount}
    </Badge>
  );
};

const RequestMatcherForm = ({ request, onChange }: Props) => {
  return (
    <div className="mb-3">
      <Tab.Container defaultActiveKey="first">
        <fieldset>
          <legend>Request</legend>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="method">
                Method &#8239;
                <CountMatcherBadge elements={request.method} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="scheme">
                Scheme &#8239;
                <CountMatcherBadge elements={request.scheme} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="destination">
                Destination &#8239; <CountMatcherBadge elements={request.destination} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="path">
                Path &#8239;
                <CountMatcherBadge elements={request.path} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="queryParams">
                Query Params &#8239;
                <CountMatcherBadge elements={request.query} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="headers">
                Headers &#8239;
                <CountMatcherBadge elements={request.headers} />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="body">
                Body &#8239;
                <CountMatcherBadge elements={request.body} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="method" data-testid="tab-content-method">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.method}
                  type="method"
                  onChange={(fieldMatchers) => onChange({ ...request, method: fieldMatchers })}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="body" data-testid="tab-content-body">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.body}
                  type="body"
                  onChange={(fieldMatchers) => onChange({ ...request, body: fieldMatchers })}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="destination" data-testid="tab-content-destination">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.destination}
                  type="destination"
                  onChange={(fieldMatchers) => onChange({ ...request, destination: fieldMatchers })}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="headers" data-testid="tab-content-headers">
              <div>
                <RecordStringFieldMatcherListForm
                  entries={request.headers}
                  type="header"
                  onChange={(entries) => {
                    onChange({ ...request, headers: entries });
                  }}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="path" data-testid="tab-content-path">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.path}
                  type="method"
                  onChange={(fieldMatchers) => {
                    onChange({ ...request, path: fieldMatchers });
                  }}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="queryParams" data-testid="tab-content-query">
              <div>
                <RecordStringFieldMatcherListForm
                  entries={request.query}
                  type="query"
                  onChange={(entries) => {
                    onChange({ ...request, query: entries });
                  }}
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="scheme" data-testid="tab-content-scheme">
              <div>
                <FieldMatcherListForm
                  fieldMatchers={request.scheme}
                  type="scheme"
                  onChange={(fieldMatchers) => {
                    onChange({ ...request, scheme: fieldMatchers });
                  }}
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </fieldset>
      </Tab.Container>
    </div>
  );
};

export default RequestMatcherForm;
