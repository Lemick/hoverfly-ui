import React from 'react';
import { Form } from 'react-bootstrap';
import { FieldMatcher } from '../../../types/hoverfly';

type Props = {
  fieldMatcher?: FieldMatcher;
  onSubmit: (fieldMatcher: FieldMatcher) => void;
};

const FieldMatcherForm: React.FC<Props> = ({
  fieldMatcher = { matcher: '', value: '', config: {} },
  onSubmit
}) => {
  const handleMatcherChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const newFieldMatcher = { ...fieldMatcher, [name]: value };
    onSubmit(newFieldMatcher);
    event.target.focus();
  };

  const handleConfigChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newConfig = { ...fieldMatcher.config, [name]: checked };
    const newFieldMatcher = { ...fieldMatcher, config: newConfig };
    onSubmit(newFieldMatcher);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>Matcher:</Form.Label>
        <Form.Control
          type="text"
          name="matcher"
          value={fieldMatcher.matcher}
          onChange={handleMatcherChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Value:</Form.Label>
        <Form.Control
          type="text"
          name="value"
          value={fieldMatcher.value}
          onChange={handleMatcherChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Config:</Form.Label>
        <div className="d-flex justify-content-between">
          <Form.Check
            type="checkbox"
            label="Ignore Unknown"
            name="ignoreUnknown"
            checked={fieldMatcher.config?.ignoreUnknown}
            onChange={handleConfigChange}
          />
          <Form.Check
            type="checkbox"
            label="Ignore Order"
            name="ignoreOrder"
            checked={fieldMatcher.config?.ignoreOrder}
            onChange={handleConfigChange}
          />
          <Form.Check
            type="checkbox"
            label="Ignore Occurrences"
            name="ignoreOccurrences"
            checked={fieldMatcher.config?.ignoreOccurrences}
            onChange={handleConfigChange}
          />
        </div>
      </Form.Group>
    </Form>
  );
};

export default FieldMatcherForm;
