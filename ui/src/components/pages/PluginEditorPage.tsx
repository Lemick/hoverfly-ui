import React from 'react';
import RequestResponsePairListForm from '../form-simulation/RequestResponsePairListForm';
import { RequestResponsePair } from '../../types/hoverfly';
import { parse, stringify } from '../../services/json-service';

type PluginEditorPageProps = {
  simulationJson?: string;
  onSimulationUpdate?: (simulationJson: string) => void;
};

/**
 * A light page that only provides the UI to edit simulations.
 */
export default function PluginEditorPage({
  simulationJson,
  onSimulationUpdate
}: PluginEditorPageProps) {
  const parsedJson = parse(simulationJson);
  // TODO provide a way to start from scratch

  function onChangeFromForms(updatedPairs: RequestResponsePair[]) {
    const updatedSimulation = {
      ...parsedJson,
      data: {
        ...parsedJson?.data,
        pairs: updatedPairs
      }
    };

    if (onSimulationUpdate) {
      onSimulationUpdate(stringify(updatedSimulation));
    }
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
        <span>No valid data pairs</span>
      )}
    </div>
  );
}
