import { Container, Title } from "@mantine/core";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { ActionBar } from "./ActionBar";
import { KeyCode } from "../KeyCode";
import { WordsCard } from "./WordsCard";
import {
  Board,
  init,
  moveByKey,
  getLetterSuccessAmount,
} from "../models/Board";
import { useInterval } from "../utils/useInterval";
import { useCountdown } from "../utils/useCountdown";
import { useTypingCapture } from "../utils/useTypingCapture";

export function TypingGame() {
  const { wpm, timeLeft, board, restart } = useTypingGame();

  return (
    <Container>
      <Stack align="center">
        <Title order={1}>Typing Test</Title>

        <ActionBar wpm={wpm} timeLeft={timeLeft} onRestart={restart} />

        <WordsCard board={board} />
      </Stack>
    </Container>
  );
}

const gameLength = 10_000;

function useTypingGame() {
  const {
    timeLeft,
    start: startCount,
    stop: stopCount,
  } = useCountdown(1_000, gameLength);
  const [board, setBoard] = useState(init());
  const { wpm, start: startWpm, stop: stopWpm } = useMeasureWpm(board);

  const onTyping = useCallback(
    (typingEvent: { code: KeyCode; char: string }) => {
      setBoard((board) => {
        const nextBoard = moveByKey(typingEvent.char, typingEvent.code, board);
        return nextBoard;
      });
    },
    []
  );

  const { startCapture, stopCapture, isCapturing } = useTypingCapture(onTyping);

  const restart = useCallback(() => {
    setBoard(init());
    startCount();
    startCapture();
    startWpm();
  }, []);

  const stop = useCallback(() => {
    stopCount();
    stopCapture();
    stopWpm();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      stop();
    }
  }, [timeLeft]);

  useEffect(() => {
    restart();

    () => {
      stop();
    };
  }, []);

  return {
    wpm,
    board,
    timeLeft,
    restart,
    onTyping,
  };
}

function useMeasureWpm(board: Board) {
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
