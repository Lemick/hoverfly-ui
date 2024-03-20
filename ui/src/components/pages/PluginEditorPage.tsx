import React from 'react';
import RequestResponsePairListForm from '@/components/forms/RequestResponsePairListForm';
import { RequestResponsePair } from '@/types/hoverfly';
import { parse, stringify } from '@/services/json-service';
import InvalidSimulation from '../utilities/InvalidSimulation';
import { initHoverflySimulation } from '@/services/request-matcher-service';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { TypographyH2 } from '@/components/ui/Typography';

function b64DecodeUnicode(value: string) {
  return decodeURIComponent(Array.prototype.map.call(atob(value), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
}

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
  const parsedJson = parse(b64DecodeUnicode(simulationData || ''));

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
