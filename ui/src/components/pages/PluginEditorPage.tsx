import React from 'react';
import RequestResponsePairListForm from '@/components/forms/RequestResponsePairListForm';
import { RequestResponsePair } from '@/types/hoverfly';
import { parse, stringify } from '@/services/json-service';
import InvalidSimulation from '../utilities/InvalidSimulation';
import { initHoverflySimulation } from '@/services/request-matcher-service';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { TypographyH2 } from '@/components/ui/Typography';

type PluginEditorPageProps = {
  simulationData?: string;
  onSimulationUpdate?: (simulationJson: string) => void;
};

/**
 * A light page that only provides the UI to edit simulations.
 */
export default function PluginEditorPage({
  simulationData,
  onSimulationUpdate = () => {}
}: PluginEditorPageProps) {
  const parsedJson = parse(decodeBase64Utf8(simulationData ?? ''));

  function onChangeFromForms(updatedPairs: RequestResponsePair[]) {
    const updatedSimulation = {
      ...parsedJson,
      data: {
        ...parsedJson?.data,
        pairs: updatedPairs
      }
    };

    onSimulationUpdate(stringify(updatedSimulation));
  }

  function startFromScratch() {
    const newHoverflySimulation = initHoverflySimulation(true);
    onSimulationUpdate(stringify(newHoverflySimulation));
  }

  return (
    <div className="p-3 flex flex-col gap-6" style={cssVariables}>
      <div className="flex justify-between items-center">
        <ThemeToggle />
        <TypographyH2>Simulations</TypographyH2>
        <div className="w-[47px]"></div>
      </div>
      {parsedJson?.data?.pairs ? (
        <RequestResponsePairListForm
          requestResponsePairs={parsedJson.data.pairs}
          onChange={onChangeFromForms}
        />
      ) : (
        <InvalidSimulation onClick={startFromScratch} />
      )}
    </div>
  );
}

const cssVariables = { '--accordion-animation-duration': '0s' } as React.CSSProperties;

function decodeBase64Utf8(base64: string) {
  const text = atob(base64);
  const length = text.length;
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    bytes[i] = text.charCodeAt(i);
  }
  const decoder = new TextDecoder();
  return decoder.decode(bytes);
}
