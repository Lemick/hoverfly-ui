import React from 'react';
import { Form } from 'react-bootstrap';

type Props = {
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  name?: string;
  dataTestId?: string;
  className?: string;
};

export default function SelectHttpStatus({
  name,
  value,
  onChange,
  id,
  dataTestId,
  className
}: Props) {
  return (
    <Form.Select
      id={id}
      data-testid={dataTestId}
      className={className}
      name={name}
      value={value}
      onChange={onChange}>
      <option value="100">100 Continue</option>
      <option value="101">101 Switching Protocols</option>
      <option value="200">200 OK</option>
      <option value="201">201 Created</option>
      <option value="202">202 Accepted</option>
      <option value="203">203 Non-Authoritative Information</option>
      <option value="204">204 No Content</option>
      <option value="205">205 Reset Content</option>
      <option value="206">206 Partial Content</option>
      <option value="300">300 Multiple Choices</option>
      <option value="301">301 Moved Permanently</option>
      <option value="302">302 Found</option>
      <option value="303">303 See Other</option>
      <option value="304">304 Not Modified</option>
      <option value="305">305 Use Proxy</option>
      <option value="307">307 Temporary Redirect</option>
      <option value="400">400 Bad Request</option>
      <option value="401">401 Unauthorized</option>
      <option value="402">402 Payment Required</option>
      <option value="403">403 Forbidden</option>
      <option value="404">404 Not Found</option>
      <option value="405">405 Method Not Allowed</option>
      <option value="406">406 Not Acceptable</option>
      <option value="407">407 Proxy Authentication Required</option>
      <option value="408">408 Request Timeout</option>
      <option value="409">409 Conflict</option>
      <option value="410">410 Gone</option>
      <option value="411">411 Length Required</option>
      <option value="412">412 Precondition Failed</option>
      <option value="413">413 Request Entity Too Large</option>
      <option value="414">414 Request-URI Too Long</option>
      <option value="415">415 Unsupported Media Type</option>
      <option value="416">416 Requested Range Not Satisfiable</option>
      <option value="417">417 Expectation Failed</option>
      <option value="500">500 Internal Server Error</option>
      <option value="501">501 Not Implemented</option>
      <option value="502">502 Bad Gateway</option>
      <option value="503">503 Service Unavailable</option>
      <option value="504">504 Gateway Timeout</option>
      <option value="505">505 HTTP Version Not Supported</option>
    </Form.Select>
  );
}
