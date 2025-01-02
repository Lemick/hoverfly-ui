import FieldMatcherListForm from '@/components/forms/matchers/FieldMatcherListForm';
import RecordStringFieldMatcherListForm from '@/components/forms/matchers/RecordStringFieldMatcherListForm';
import { Badge } from '@/components/ui/Badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Tabs';
import { TypographyH2 } from '@/components/ui/Typography';
import type { Request } from '@/types/hoverfly';
import * as React from 'react';

type Props = {
  request: Request;
  onChange: (request: Request) => void;
};

const RequestMatcherForm = ({ request, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <TypographyH2>Request</TypographyH2>
      <Tabs defaultValue="method">
        <TabsList>
          <TabsTrigger value="method">
            Method &#8239;
            <CountMatcherBadge elements={request.method} />
          </TabsTrigger>
          <TabsTrigger value="scheme">
            Scheme &#8239;
            <CountMatcherBadge elements={request.scheme} />
          </TabsTrigger>
          <TabsTrigger value="destination">
            Destination &#8239; <CountMatcherBadge elements={request.destination} />
          </TabsTrigger>
          <TabsTrigger value="path">
            Path &#8239;
            <CountMatcherBadge elements={request.path} />
          </TabsTrigger>
          <TabsTrigger value="queryParams">
            Query Params &#8239;
            <CountMatcherBadge elements={request.query} />
          </TabsTrigger>
          <TabsTrigger value="headers">
            Headers &#8239;
            <CountMatcherBadge elements={request.headers} />
          </TabsTrigger>
          <TabsTrigger value="body">
            Body &#8239;
            <CountMatcherBadge elements={request.body} />
          </TabsTrigger>
        </TabsList>
        <TabsContent value="method" data-testid="tab-content-method">
          <FieldMatcherListForm
            fieldMatchers={request.method}
            type="method"
            valuePlaceholder="GET"
            onChange={(fieldMatchers) => onChange({ ...request, method: fieldMatchers })}
          />
        </TabsContent>
        <TabsContent value="body" data-testid="tab-content-body">
          <FieldMatcherListForm
            fieldMatchers={request.body}
            type="body"
            valuePlaceholder='{"key": "value"}'
            onChange={(fieldMatchers) => onChange({ ...request, body: fieldMatchers })}
            forceFullEditor={true}
          />
        </TabsContent>
        <TabsContent value="destination" data-testid="tab-content-destination">
          <FieldMatcherListForm
            fieldMatchers={request.destination}
            type="destination"
            valuePlaceholder="hoverfly.io"
            onChange={(fieldMatchers) => onChange({ ...request, destination: fieldMatchers })}
          />
        </TabsContent>
        <TabsContent value="headers" data-testid="tab-content-headers">
          <RecordStringFieldMatcherListForm
            entries={request.headers}
            type="header"
            onChange={(entries) => {
              onChange({ ...request, headers: entries });
            }}
          />
        </TabsContent>
        <TabsContent value="path" data-testid="tab-content-path">
          <FieldMatcherListForm
            fieldMatchers={request.path}
            type="path"
            valuePlaceholder="/pages/keyconcepts/templates.htm"
            onChange={(fieldMatchers) => {
              onChange({ ...request, path: fieldMatchers });
            }}
          />
        </TabsContent>
        <TabsContent value="queryParams" data-testid="tab-content-query">
          <RecordStringFieldMatcherListForm
            entries={request.query}
            type="query"
            valuePlaceholder="query=true"
            onChange={(entries) => {
              onChange({ ...request, query: entries });
            }}
          />
        </TabsContent>
        <TabsContent value="scheme" data-testid="tab-content-scheme">
          <FieldMatcherListForm
            fieldMatchers={request.scheme}
            type="scheme"
            valuePlaceholder="https"
            onChange={(fieldMatchers) => {
              onChange({ ...request, scheme: fieldMatchers });
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const CountMatcherBadge = ({ elements }: { elements?: unknown[] | object }) => {
  if (!elements) {
    return null;
  }

  const elementsCount = Array.isArray(elements) ? elements.length : Object.keys(elements).length;
  return <Badge variant={elementsCount > 0 ? 'default' : 'secondary'}>{elementsCount}</Badge>;
};

export default RequestMatcherForm;
