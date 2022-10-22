import { useCallback, useEffect, useState } from "react";
import { Board, getLetterSuccessAmount } from "../models/Board";
import { useInterval } from "../utils/useInterval";

export function useMeasureWpm(board: Board) {
  const { start: startInterval, stop: stopInterval } = useInterval();
  const [wpm, setWpm] = useState(0);
  const [boardLocal, setBoardLocal] = useState(board);

  const start = useCallback(() => {
    startInterval(200, (timePassed) => {
      setBoardLocal((currBoard) => {
        const successAmount = getLetterSuccessAmount(currBoard);
        const wpmTemp = ((successAmount / (timePassed / 1000)) * 60) / 5;

        setWpm(wpmTemp);

        return currBoard;
      });
    });
  }, []);

  const stop = useCallback(() => {
    stopInterval();
  }, []);

  useEffect(() => {
    setBoardLocal(board);
  }, [board]);

  return {
    wpm,
    start,
    stop,
  };
}
