import React from 'react';
import RequestResponsePairListForm from '../form-simulation/RequestResponsePairListForm';
import { RequestResponsePair } from '../../types/hoverfly';
import { parse, stringify } from '../../services/json-service';
import InvalidSimulation from '../utilities/InvalidSimulation';
import { initHoverflySimulation } from '../../services/request-matcher-service';

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
  const parsedJson = parse(atob(simulationData || ''));

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
    <div className="p-3">
      <h3 className="mt-2 mb-3 text-center">Simulations</h3>
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
