import { useCallback, useState } from "react";
import { useInterval } from "./useInterval";

export enum CountdownStatus {
  On = "on",
  Off = "off",
}

export function useCountdown(interval: number, length: number) {
  const [status, setStatus] = useState(CountdownStatus.Off);
  const [timeLeft, setTimeLeft] = useState(0);
  const {
    start: startInterval,
    stop: stopInterval,
    status: statusInterval,
  } = useInterval();

  const stop = useCallback(() => {
    stopInterval();
    setTimeLeft(0);
    setStatus(CountdownStatus.Off);
  }, []);

  const start = useCallback(() => {
    stop();

    let prevTime = Date.now();
    let timeLeftTemp = length;
    setTimeLeft(timeLeftTemp);

    startInterval(interval, () => {
      const currTime = Date.now();
      const diff = currTime - prevTime;
      timeLeftTemp -= diff;

      prevTime = currTime;

      setTimeLeft(timeLeftTemp);

      if (timeLeftTemp <= 0) {
        timeLeftTemp = 0;
        stop();
      }
    });

    setStatus(CountdownStatus.On);
  }, [interval, startInterval]);

  return {
    timeLeft,
    start,
    stop,
  };
}
