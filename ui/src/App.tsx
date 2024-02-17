import React, { useEffect, useState } from 'react';
import WebEditorPage from './components/pages/WebEditorPage';
import PluginEditorPage from './components/pages/PluginEditorPage';
import './hooks/use-monaco-worker';

export default function App() {
  const [simulationData, setSimulationData] = useState<string | undefined>(
    window.hoverflyUi_initialSimulationData
  );

  useEffect(() => {
    window.hoverflyUi_setUiSimulation = setSimulationData;
  }, []);

  if (window.hoverflyUi_enablePluginMode) {
    return (
      <PluginEditorPage
        simulationData={simulationData}
        onSimulationUpdate={window.hoverflyUi_onUiSimulationChange}
      />
    );
  }

  return <WebEditorPage />;
}
