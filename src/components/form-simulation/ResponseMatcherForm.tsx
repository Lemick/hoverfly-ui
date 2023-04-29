import React, { useEffect, useRef } from 'react';
import { HoverflySimulation, Response } from '../../types/hoverfly';
import ArrowCollapse from '../utilities/ArrowCollapse';
import MonacoEditor, { OnMount } from '@monaco-editor/react';
import { prettify, stringify } from '../../services/json-service';
import defaultEditorContent from '../../example-mock.json';
import { editor } from 'monaco-editor';
import ResponseBodyEditor from './ResponseBodyEditor';

type Props = {
  response?: Response;
  onChange: (response: Response) => void;
};

const ResponseMatcherForm = ({ response = {}, onChange }: Props) => {
  return (
    <form className="response-matcher-form">
      <fieldset>
        <legend>Response</legend>
        <div className="form-group">
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            className="form-control"
            value={response.status}
            onChange={(e) => onChange({ ...response, status: parseInt(e.target.value) })}>
            <option value="200">200 OK</option>
            <option value="201">201 Created</option>
            <option value="204">204 No Content</option>
            <option value="400">400 Bad Request</option>
            <option value="401">401 Unauthorized</option>
            <option value="403">403 Forbidden</option>
            <option value="404">404 Not Found</option>
            <option value="500">500 Internal Server Error</option>
            <option value="502">502 Bad Gateway</option>
            <option value="503">503 Service Unavailable</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="body">Body:</label>
          <ResponseBodyEditor
            value={response?.body}
            onChange={(value) => onChange({ ...response, body: value })}
          />
        </div>
        <ArrowCollapse visibleByDefault={false}>
          <>
            <div className="form-group">
              <label htmlFor="encodedBody">Encoded Body:</label>
              <input
                id="encodedBody"
                type="checkbox"
                className="form-check-input"
                checked={response.encodedBody || false}
                onChange={(e) => onChange({ ...response, encodedBody: e.target.checked })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="fixedDelay">Fixed Delay:</label>
              <input
                id="fixedDelay"
                type="number"
                className="form-control"
                value={response.fixedDelay}
                onChange={(e) => onChange({ ...response, fixedDelay: parseInt(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="headers">Headers:</label>
              <textarea
                id="headers"
                className="form-control"
                value={JSON.stringify(response.headers)}
                onChange={(e) => onChange({ ...response, headers: JSON.parse(e.target.value) })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="logNormalDelay">Log Normal Delay:</label>
              <input
                id="logNormalDelay"
                type="text"
                className="form-control"
                value={JSON.stringify(response.logNormalDelay)}
                onChange={(e) =>
                  onChange({ ...response, logNormalDelay: JSON.parse(e.target.value) })
                }
              />
            </div>
          </>
        </ArrowCollapse>
      </fieldset>
    </form>
  );
};

export default ResponseMatcherForm;
