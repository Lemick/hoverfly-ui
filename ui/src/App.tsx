import React from 'react';
import WebEditorPage from './components/pages/WebEditorPage';
import PluginEditorPage from './components/pages/PluginEditorPage';
import './hooks/use-monaco-worker';
import { usePluginMode } from '@/hooks/use-plugin-mode';

export default function App() {
  const { ideSimulationData, isPluginMode } = usePluginMode();

  if (isPluginMode && ideSimulationData === undefined) {
    return (
      <div style={{ display: 'flex', placeContent: 'center', paddingTop: '5rem' }}>
        <span>Loading...</span>
      </div>
    );
  }

  if (isPluginMode && ideSimulationData !== undefined) {
    return (
      <PluginEditorPage
        simulationData={ideSimulationData}
        onSimulationUpdate={window.hoverflyUi_onUiSimulationChange}
      />
    );
  }

  return <WebEditorPage />;
}
