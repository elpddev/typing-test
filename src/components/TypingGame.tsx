import { Container } from "@mantine/core";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { ActionBar } from "./ActionBar";
import { KeyCode } from "../KeyCode";
import { Board } from "../Board";
import { TypingPanel } from "./TypingPanel";
import { WordsCard } from "./WordsCard";

export function TypingGame() {
  const {
    currentWordIndex,
    wpm,
    timeLeft,
    board,
    typingValue,
    restart,
    onTyping,
  } = useTypingGame();

  return (
    <Container>
      <Stack align="center">
        <div>Typing Test</div>

        <ActionBar wpm={wpm} timeLeft={timeLeft} onRestart={restart} />

        <WordsCard board={board} />

        <TypingPanel value={typingValue} onTyping={onTyping} />
      </Stack>
    </Container>
  );
}

enum GameStatus {
  Initial,
  InProgress,
  Done,
}

function useTypingGame() {
  const [wpm, setWpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Initial);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [typingValue, setTypingValue] = useState("");

  const [board, setBoard] = useState(Board.init());

  const restart = useCallback(() => {
    setBoard(Board.init());
  }, []);

  const onTyping = useCallback(
    (char: string, keyCode: KeyCode) => {
      const nextBoard = Board.moveByKey(char, keyCode, board);
      setBoard(nextBoard);
    },
    [board]
  );

  useEffect(() => {
    restart();
  }, [restart]);

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

