import React from 'react';
import { Response } from '../../types/hoverfly';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

type Props = {
  response?: Response;
  onSubmit: (response: Response) => void;
};

const ResponseMatcherForm = ({ response = {}, onSubmit }: Props) => {
  return (
    <form className="response-matcher-form">
      <Tab.Container>
        <fieldset>
          <legend>Response</legend>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="status">Status</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="body">Body</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="encodedBody">Encoded Body</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fixedDelay">Fixed Delay</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="headers">Headers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="logNormalDelay">Log Normal Delay</Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="body">
              <div className="form-group">
                <label className="form-label">
                  Body:
                  <textarea
                    className="form-control"
                    value={response.body}
                    onChange={(e) => onSubmit({ ...response, body: e.target.value })}
                  />
                </label>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="encodedBody">
              <div className="form-group">
                <label className="form-label">
                  Encoded Body:
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={response.encodedBody || false}
                    onChange={(e) => onSubmit({ ...response, encodedBody: e.target.checked })}
                  />
                </label>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="fixedDelay">
              <div className="form-group">
                <label className="form-label">
                  Fixed Delay:
                  <input
                    type="number"
                    className="form-control"
                    value={response.fixedDelay}
                    onChange={(e) =>
                      onSubmit({ ...response, fixedDelay: parseInt(e.target.value) })
                    }
                  />
                </label>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="headers">
              <div className="form-group">
                <label className="form-label">
                  Headers:
                  <textarea
                    className="form-control"
                    value={JSON.stringify(response.headers)}
                    onChange={(e) => onSubmit({ ...response, headers: JSON.parse(e.target.value) })}
                  />
                </label>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="logNormalDelay">
              <div className="form-group">
                <label className="form-label">
                  Log Normal Delay:
                  <input
                    type="text"
                    className="form-control"
                    value={JSON.stringify(response.logNormalDelay)}
                    onChange={(e) =>
                      onSubmit({ ...response, logNormalDelay: JSON.parse(e.target.value) })
                    }
                  />
                </label>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="status">
              <div className="form-group">
                <label className="form-label">
                  Status:
                  <input
                    type="number"
                    className="form-control"
                    value={response.status}
                    onChange={(e) => onSubmit({ ...response, status: parseInt(e.target.value) })}
                  />
                </label>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </fieldset>
      </Tab.Container>
    </form>
  );
};

export default ResponseMatcherForm;
