import { useEffect, useState } from 'react';
import { usePollInitialData } from '@/hooks/use-poll-initial-data';

export const usePluginMode = () => {
  const isPluginMode = location.search.endsWith('plugin=true');

  const [ideSimulationData, setIdeSimulationData] = useState<string | undefined>(
    window.hoverflyUi_initialSimulationData
  );
  usePollInitialData({
    enabled: isPluginMode && !window.hoverflyUi_initialSimulationData,
    setInitialData: setIdeSimulationData
  });

  useEffect(() => {
    window.hoverflyUi_setUiSimulation = setIdeSimulationData;
  }, []);

  return { ideSimulationData, isPluginMode };
};
