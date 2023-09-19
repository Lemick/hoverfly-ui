export {};

declare global {
  interface Window {
    hoverflyUi_enablePluginMode?: boolean;
    hoverflyUi_initialSimulationData?: string;
    hoverflyUi_setUiSimulation?: (simulationJson: string) => void;
    hoverflyUi_onUiSimulationChange?: (simulationJson: string) => void;
  }
}
