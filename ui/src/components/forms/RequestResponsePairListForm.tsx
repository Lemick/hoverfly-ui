import React, { useState } from 'react';
import RequestResponseMatcherForm from './RequestResponseMatcherForm';
import { RequestResponsePair } from '@/types/hoverfly';
import { CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/Accordion';
import { getRequestHeader } from '@/services/request-matcher-service';
import { ClipboardIcon, TrashIcon } from '@radix-ui/react-icons';
import TooltipDecorator from '../utilities/TooltipDecorator';
import { useTheme } from '@/hooks/use-theme-provider';

type Props = {
  requestResponsePairs: RequestResponsePair[];
  onChange: (requestResponsePairs: RequestResponsePair[]) => void;
  onOpenPair?: (index: number) => void;
};

const RequestResponsePairListForm = ({
  requestResponsePairs,
  onChange,
  onOpenPair = (_) => {}
}: Props) => {
  const [activeIndex, setActiveIndex] = useState<number>();

  const onUpdate = (index: number, requestResponsePair: RequestResponsePair) => {
    const newPairs = [...requestResponsePairs];
    newPairs[index] = requestResponsePair;
    onChange(newPairs);
  };

  const onDuplicate = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    e.stopPropagation();
    const newPairs = [...requestResponsePairs];
    newPairs.splice(index, 0, { ...newPairs[index] });
    onChange(newPairs);
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>, indexToRemove: number) => {
    e.stopPropagation();

    if (activeIndex && indexToRemove < activeIndex) {
      setActiveIndex(activeIndex - 1);
    }

    const newPairs = [...requestResponsePairs];
    newPairs.splice(indexToRemove, 1);
    onChange(newPairs);
  };

  function onAddRequestResponsePair() {
    const newPair = {
      request: {},
      response: { status: 200 }
    };
    onChange([...requestResponsePairs, newPair]);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {requestResponsePairs.length > 0 && (
        <Accordion
          type="single"
          collapsible={true}
          className="border rounded-xl max-w-[1200px] w-full">
          {requestResponsePairs.map((pair, index) => (
            <AccordionItem key={index} value={`ìtem-${index}`}>
              <AccordionTrigger onClick={() => onOpenPair(index)}>
                <div className="w-full flex justify-between items-center cursor-pointer gap-4 px-6">
                  <span className="font-bold">
                    {index} - {getRequestHeader(pair.request)} →️&nbsp;
                    <ResponseStatusHeader status={pair.response?.status} />
                  </span>
                  <div className="flex gap-2 justify-end">
                    <TooltipDecorator tooltipText="Duplicate">
                      <Button
                        variant="secondary"
                        type="button"
                        onClick={(e) => onDuplicate(e, index)}>
                        <ClipboardIcon />
                      </Button>
                    </TooltipDecorator>

                    <TooltipDecorator tooltipText="Delete">
                      <Button
                        variant="destructive"
                        type="button"
                        onClick={(e) => onDelete(e, index)}>
                        <TrashIcon />
                      </Button>
                    </TooltipDecorator>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <CardContent>
                  <RequestResponseMatcherForm
                    pair={pair}
                    onChange={(newPair) => onUpdate(index, newPair)}
                  />
                </CardContent>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <div className="w-full text-center mt-8">
        <Button variant="default" onClick={onAddRequestResponsePair}>
          Add request/response pair
        </Button>
      </div>
    </div>
  );
};

export default RequestResponsePairListForm;

const ResponseStatusHeader = ({ status }: { status?: number }) => {
  const { appliedTheme } = useTheme();
  const isDark = appliedTheme === 'dark';

  if (!status) {
    return null;
  }

  function getColorForHTTPCode(httpCode: number) {
    if (httpCode >= 100 && httpCode < 200) {
      return isDark ? 'text-yellow-200' : `text-yellow-500`;
    } else if (httpCode >= 200 && httpCode < 300) {
      return isDark ? `text-green-200` : `text-green-500`;
    } else if (httpCode >= 300 && httpCode < 400) {
      return isDark ? `text-blue-200` : `text-blue-500`;
    } else if (httpCode >= 400 && httpCode < 500) {
      return isDark ? `text-orange-200` : `text-orange-500`;
    } else if (httpCode >= 500 && httpCode < 600) {
      return isDark ? `text-red-200` : `text-red-500`;
    } else {
      return '';
    }
  }

  return <span className={getColorForHTTPCode(status)}>{status}</span>;
};
