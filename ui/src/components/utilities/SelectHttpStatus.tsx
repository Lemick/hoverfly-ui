import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import React from 'react';

type Props = {
  code?: string;
  onChange: (code: string) => void;
  id?: string;
  name?: string;
  dataTestId?: string;
};

export default function SelectHttpStatus({
  id,
  name,
  code,
  onChange,
  dataTestId,
}: Props) {
  return (
    <Select
      data-testid={dataTestId}
      name={name}
      value={code}
      onValueChange={onChange}
    >
      <SelectTrigger id={id} className="w-full">
        <SelectValue placeholder="matcher" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="100">100 Continue</SelectItem>
        <SelectItem value="101">101 Switching Protocols</SelectItem>
        <SelectItem value="200">200 OK</SelectItem>
        <SelectItem value="201">201 Created</SelectItem>
        <SelectItem value="202">202 Accepted</SelectItem>
        <SelectItem value="203">203 Non-Authoritative Information</SelectItem>
        <SelectItem value="204">204 No Content</SelectItem>
        <SelectItem value="205">205 Reset Content</SelectItem>
        <SelectItem value="206">206 Partial Content</SelectItem>
        <SelectItem value="300">300 Multiple Choices</SelectItem>
        <SelectItem value="301">301 Moved Permanently</SelectItem>
        <SelectItem value="302">302 Found</SelectItem>
        <SelectItem value="303">303 See Other</SelectItem>
        <SelectItem value="304">304 Not Modified</SelectItem>
        <SelectItem value="305">305 Use Proxy</SelectItem>
        <SelectItem value="307">307 Temporary Redirect</SelectItem>
        <SelectItem value="400">400 Bad Request</SelectItem>
        <SelectItem value="401">401 Unauthorized</SelectItem>
        <SelectItem value="402">402 Payment Required</SelectItem>
        <SelectItem value="403">403 Forbidden</SelectItem>
        <SelectItem value="404">404 Not Found</SelectItem>
        <SelectItem value="405">405 Method Not Allowed</SelectItem>
        <SelectItem value="406">406 Not Acceptable</SelectItem>
        <SelectItem value="407">407 Proxy Authentication Required</SelectItem>
        <SelectItem value="408">408 Request Timeout</SelectItem>
        <SelectItem value="409">409 Conflict</SelectItem>
        <SelectItem value="410">410 Gone</SelectItem>
        <SelectItem value="411">411 Length Required</SelectItem>
        <SelectItem value="412">412 Precondition Failed</SelectItem>
        <SelectItem value="413">413 Request Entity Too Large</SelectItem>
        <SelectItem value="414">414 Request-URI Too Long</SelectItem>
        <SelectItem value="415">415 Unsupported Media Type</SelectItem>
        <SelectItem value="416">416 Requested Range Not Satisfiable</SelectItem>
        <SelectItem value="417">417 Expectation Failed</SelectItem>
        <SelectItem value="500">500 Internal Server Error</SelectItem>
        <SelectItem value="501">501 Not Implemented</SelectItem>
        <SelectItem value="502">502 Bad Gateway</SelectItem>
        <SelectItem value="503">503 Service Unavailable</SelectItem>
        <SelectItem value="504">504 Gateway Timeout</SelectItem>
        <SelectItem value="505">505 HTTP Version Not Supported</SelectItem>
      </SelectContent>
    </Select>
  );
}
