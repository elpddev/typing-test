import { Container } from "@mantine/core";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { ActionBar } from "./ActionBar";
import { KeyCode } from "../KeyCode";
import { WordsCard } from "./WordsCard";
import { init, moveByKey } from "../models/Board";
import { useInterval } from "../utils/useInterval";
import { useCountdown } from "../utils/useCountdown";
import { useTypingCapture } from "../utils/useTypingCapture";

export function TypingGame() {
  const { currentWordIndex, wpm, timeLeft, board, restart } = useTypingGame();

  return (
    <Container>
      <Stack align="center">
        <div>Typing Test</div>

        <ActionBar wpm={wpm} timeLeft={timeLeft} onRestart={restart} />

        <WordsCard board={board} />
      </Stack>
    </Container>
  );
}

function useTypingGame() {
  const [wpm, setWpm] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typingValue, setTypingValue] = useState("");
  const { timeLeft, start: startCount } = useCountdown(1_000, 10_000);
  const [initialized, setInitialized] = useState(false);

  const [board, setBoard] = useState(init());

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
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      stopCapture();
    }
  }, [timeLeft]);

  useEffect(() => {
    restart();
  }, []);

  return {
    currentWordIndex,
    wpm,
    board,
    timeLeft,
    typingValue,
    restart,
    onTyping,
  };
}
