import React, { useEffect, useState } from 'react';
import WebEditorPage from './components/pages/WebEditorPage';
import './boostrap.scss';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import PluginEditorPage from './components/pages/PluginEditorPage';

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
        simulationJson={simulationData}
        onSimulationUpdate={window.hoverflyUi_onUiSimulationChange}
      />
    );
  }

  return <WebEditorPage />;
}
