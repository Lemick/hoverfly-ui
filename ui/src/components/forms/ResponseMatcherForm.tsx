import ResponseHeaderFormPopover from '@/components/forms/ResponseHeaderFormPopover';
import { Button } from '@/components/ui/Button';
import { Checkbox } from '@/components/ui/Checkbox';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/Popover';
import { TypographyH2 } from '@/components/ui/Typography';
import { FormControl } from '@/components/utilities/FormControl';
import { updateContentLengthAccordingToBody } from '@/services/headers-service';
import { minify, parseIntOrDefault, prettify } from '@/services/json-service';
import type { Response } from '@/types/hoverfly';
import {
  ClockIcon,
  Cross1Icon,
  MagicWandIcon,
  ZoomOutIcon,
} from '@radix-ui/react-icons';
import React from 'react';
import SelectHttpStatus from '../utilities/SelectHttpStatus';
import InlineMonacoEditor from './InlineMonacoEditor';

type Props = {
  response?: Response;
  onChange: (response: Response) => void;
};

const ResponseMatcherForm = ({ response = {}, onChange }: Props) => {
  const onResponseBodyChange = (newBody: string) => {
    const newHeaders = updateContentLengthAccordingToBody(
      newBody,
      response?.headers,
    );
    onChange({ ...response, body: newBody, headers: newHeaders });
  };

  const onHeaderChangeRequest = (
    newName: string,
    newValues: string[],
    oldName?: string,
  ) => {
    const newHeaders = { ...response.headers, [newName]: newValues };
    if (oldName && oldName !== newName) {
      delete newHeaders[oldName];
    }

    onChange({
      ...response,
      headers: newHeaders,
    });
  };

  const onHeaderDeleteRequest = (headerName: string) => {
    if (!response?.headers) {
      return;
    }
    const newHeaders = { ...response.headers };
    delete newHeaders[headerName];
    onChange({
      ...response,
      headers: newHeaders,
    });
  };

  return (
    <div className="flex flex-col gap-4" data-testid="response-form">
      <TypographyH2>Response</TypographyH2>

      <div className="flex gap-8">
        <div className="flex flex-col gap-2 w-4/6">
          <div className="flex flex-row gap-3">
            <Button
              variant="outline"
              onClick={() =>
                response.body && onResponseBodyChange(prettify(response.body))
              }
            >
              <MagicWandIcon />
              Prettify
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                response.body && onResponseBodyChange(minify(response.body))
              }
            >
              <ZoomOutIcon className="size-5" />
              Minify
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <ClockIcon />
                  Delay
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-60 p-4">
                <div className="flex flex-col gap-6">
                  <p className="font-medium leading-none">
                    Configure response delay
                  </p>

                  <div className="flex flex-col items-start gap-6">
                    <FormControl direction="column">
                      <Label htmlFor="fixedDelay">Fixed Delay (ms)</Label>
                      <Input
                        id="fixedDelay"
                        type="number"
                        className="form-control"
                        value={response.fixedDelay}
                        onChange={({ target }) =>
                          onChange({
                            ...response,
                            fixedDelay: parseIntOrDefault(
                              target.value,
                              undefined,
                            ),
                          })
                        }
                      />
                    </FormControl>
                    <FormControl direction="column">
                      <Label htmlFor="logNormalDelay">Log Normal Delay</Label>
                      <Input
                        id="logNormalDelay"
                        type="text"
                        className="form-control"
                        value={JSON.stringify(response.logNormalDelay)}
                        onChange={({ target }) =>
                          onChange({
                            ...response,
                            logNormalDelay: target.value
                              ? JSON.parse(target.value)
                              : undefined,
                          })
                        }
                      />
                    </FormControl>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <InlineMonacoEditor
            value={response?.body}
            onChange={(value) => onResponseBodyChange(value)}
            dataTestId="response-body-editor"
          />

          <FormControl direction="row" className="items-center">
            <Checkbox
              id="encodedBody"
              className="form-check-input"
              checked={response.encodedBody || false}
              onCheckedChange={(checked) =>
                onChange({
                  ...response,
                  encodedBody: checked ? true : undefined,
                })
              }
            />
            <Label htmlFor="encodedBody">Encoded body</Label>
          </FormControl>
        </div>

        <div className="flex flex-col gap-6 w-2/6 mt-10">
          <FormControl direction="column">
            <Label htmlFor="status">Status</Label>
            <SelectHttpStatus
              id="status"
              dataTestId="response-status-select"
              code={`${response.status}`}
              onChange={(code) =>
                onChange({ ...response, status: Number.parseInt(code) })
              }
            />
          </FormControl>

          <div>
            <FormControl direction="column">
              <Label className="mb-1">Headers</Label>

              {Object.entries(response.headers ?? {}).map(
                ([headerName, headerValues]) => (
                  <div
                    className="flex flex-row items-center gap-3"
                    key={headerName}
                  >
                    <ResponseHeaderFormPopover
                      onChange={(newName, newValues) =>
                        onHeaderChangeRequest(newName, newValues, headerName)
                      }
                      initialHeaderName={headerName}
                      initialHeaderValues={headerValues}
                    >
                      <div className="break-all text-sm">
                        <span className="text-sm">
                          {'-'} {headerName}:&nbsp;
                        </span>
                        <span className="text-sm">
                          {headerValues.join(',')}
                        </span>
                      </div>
                    </ResponseHeaderFormPopover>
                    <Cross1Icon
                      className="cursor-pointer size-4 shrink-0"
                      onClick={() => onHeaderDeleteRequest(headerName)}
                      aria-label="Delete response header"
                    />
                  </div>
                ),
              )}
            </FormControl>
          </div>

          <div className="w-full flex flex-row">
            <ResponseHeaderFormPopover onChange={onHeaderChangeRequest}>
              <Button variant="outline">Add header</Button>
            </ResponseHeaderFormPopover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseMatcherForm;
