import { useCallback, useEffect, useState } from "react";

export enum IntervalStatus {
  On = "on",
  Off = "off",
}

export function useInterval() {
  const [status, setStatus] = useState(IntervalStatus.Off);
  const [id, setId] = useState<NodeJS.Timer | null>(null);

  const stop = useCallback(() => {
    setId((prevId) => {
      if (!prevId) {
        return prevId;
      }

      clearInterval(prevId);
      setStatus(IntervalStatus.Off);
      return null;
    });
  }, []);

  const start = useCallback(
    (intervalAmount: number, onTick: (timePassed: number) => void) => {
      stop();

      const startTime = Date.now();

      const newId = setInterval(() => {
        const currentTime = Date.now();
        const diff = currentTime - startTime;

        onTick(diff);
      }, intervalAmount);

      setId(newId);
      setStatus(IntervalStatus.On);
    },
    []
  );

  // useEffect(() => {
  //   return () => stop();
  // }, []);

  return {
    status,
    start,
    stop,
  };
}
