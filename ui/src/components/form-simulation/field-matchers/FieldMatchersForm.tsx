import React from 'react';
import { Form } from 'react-bootstrap';
import { FieldMatcher } from '../../../types/hoverfly';

type Props = {
  id: string;
  fieldMatcher: FieldMatcher;
  onChange: (fieldMatcher: FieldMatcher) => void;
  valuePlaceholder?: string;
};

const FieldMatcherForm = ({
  id,
  fieldMatcher = { matcher: 'exact', value: '' },
  onChange,
  valuePlaceholder
}: Props) => {
  const handleMatcherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFieldMatcher = { ...fieldMatcher, [name]: value };
    onChange(newFieldMatcher);
  };

  const handleConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newConfig = { ...fieldMatcher.config, [name]: checked };
    const atLeastOneTrueValue = Object.values(newConfig).some((v) => v);

    const newFieldMatcher = {
      ...fieldMatcher,
      config: atLeastOneTrueValue ? newConfig : undefined
    };
    onChange(newFieldMatcher);
  };

  const generateDomId = (suffix: string) => `${id}_${suffix}`;

  return (
    <div>
      <div className="row">
        <Form.Group className="col-md-2">
          <Form.Label>Matcher:</Form.Label>
          <Form.Control
            data-testid="select-matcher"
            as="select"
            name="matcher"
            value={fieldMatcher.matcher}
            onChange={handleMatcherChange}>
            <option value="exact">Exact</option>
            <option value="glob">Glob</option>
            <option value="regex">Regex</option>
            <option value="json">JSON</option>
            <option value="jsonPartial">JSON Partial</option>
            <option value="jsonPath">JSON Path</option>
            <option value="xml">XML</option>
            <option value="xpath">XPath</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className="col">
          <Form.Label>Value:</Form.Label>
          <Form.Control
            data-testid="matcher-input-value"
            type="text"
            name="value"
            placeholder={valuePlaceholder}
            value={fieldMatcher.value}
            onChange={handleMatcherChange}
          />
        </Form.Group>
      </div>

      <Form.Group className="mt-3">
        <div className="d-flex justify-content-between">
          <Form.Check
            className="d-flex align-items-center gap-1"
            id={generateDomId('ignoreUnknown')}
            type="checkbox"
            label={
              <Form.Check.Label htmlFor={generateDomId('ignoreUnknown')}>
                Ignore Unknown
              </Form.Check.Label>
            }
            name="ignoreUnknown"
            checked={fieldMatcher.config?.ignoreUnknown}
            onChange={handleConfigChange}
          />
          <Form.Check
            className="d-flex align-items-center gap-1"
            id={generateDomId('ignoreOrder')}
            type="checkbox"
            label={
              <Form.Check.Label htmlFor={generateDomId('ignoreOrder')}>
                Ignore Order
              </Form.Check.Label>
            }
            name="ignoreOrder"
            checked={fieldMatcher.config?.ignoreOrder}
            onChange={handleConfigChange}
          />
          <Form.Check
            className="d-flex align-items-center gap-1"
            id={generateDomId('ignoreOccurrences')}
            type="checkbox"
            label={
              <Form.Check.Label htmlFor={generateDomId('ignoreOccurrences')}>
                Ignore Occurrences
              </Form.Check.Label>
            }
            name="ignoreOccurrences"
            checked={fieldMatcher.config?.ignoreOccurrences}
            onChange={handleConfigChange}
          />
        </div>
      </Form.Group>
    </div>
  );
};

export default FieldMatcherForm;
