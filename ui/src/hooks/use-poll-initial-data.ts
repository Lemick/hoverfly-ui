import { useEffect, useRef } from 'react';

// Force initialSimulationData init in plugin mode if the browser is too fast to load
export const usePollInitialData = ({
  enabled,
  setInitialData,
}: {
  enabled: boolean;
  setInitialData: (value: string) => void;
}) => {
  const intervalIdRef = useRef<number>(null);
  const timeoutIdRef = useRef<number>(null);

  const clearPolling = () => {
    intervalIdRef.current && clearInterval(intervalIdRef.current);
    timeoutIdRef.current && clearTimeout(timeoutIdRef.current);
    intervalIdRef.current = null;
    timeoutIdRef.current = null;
  };

  const startPolling = () => {
    const checkVariable = () => {
      if (window.hoverflyUi_initialSimulationData !== undefined) {
        clearPolling();
        setInitialData(window.hoverflyUi_initialSimulationData);
      }
    };

    intervalIdRef.current = setInterval(checkVariable, 10);
    timeoutIdRef.current = setTimeout(clearPolling, 2000);
  };

  useEffect(() => {
    if (!enabled) {
      return;
    }

    startPolling();

    return clearPolling;
  }, [enabled]);

  return !!intervalIdRef.current;
};
