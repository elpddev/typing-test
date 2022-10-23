import { Container, Group, Title } from "@mantine/core";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { ActionBar } from "./ActionBar";
import { KeyCode } from "../KeyCode";
import { WordsCard } from "./WordsCard";
import { init, moveByKey } from "../models/Board";
import { useCountdown } from "../utils/useCountdown";
import { useTypingCapture } from "../utils/useTypingCapture";
import { useMeasureWpm } from "../utils/useMeasureWpm";
import { StatsBar } from "./StatsBar";

export function TypingGame() {
  const { wpm, timeLeft, board, restart } = useTypingGame();

  return (
    <Container>
      <Stack align="stretch">
        <Group position="center">
          <Title order={1}>Typing Test</Title>
        </Group>

        <ActionBar wpm={wpm} timeLeft={timeLeft} onRestart={restart} />

        <WordsCard board={board} />

        <StatsBar wpm={wpm} timeLeft={timeLeft} />
      </Stack>
    </Container>
  );
}

const gameLength = 60_000;

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

  const { startCapture, stopCapture } = useTypingCapture(onTyping);

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
