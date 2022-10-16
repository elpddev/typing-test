import { Container } from "@mantine/core";
import { Stack } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { ActionBar } from "./ActionBar";
import { KeyCode } from "../KeyCode";
import { Board } from "../Board";
import { TypingPanel } from "./TypingPanel";
import { WordsCard } from "./WordsCard";

export function TypingGame() {
  const { typingEvent } = useTypingCapture();

  const { currentWordIndex, wpm, timeLeft, board, restart, onTyping } =
    useTypingGame();

  useEffect(() => {
    if (!typingEvent) {
      return;
    }

    console.log("** effect typing");

    onTyping(typingEvent.code, typingEvent.char);
  }, [typingEvent, onTyping]);

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

function useTypingCapture() {
  const [typingEvent, setTypingEvent] = useState<{
    code: KeyCode;
    char: string;
  } | null>(null);
  const typingCallback = useCallback((event: KeyboardEvent) => {
    setTypingEvent({ code: event.code as KeyCode, char: event.key });
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", typingCallback);

    return () => {
      document.removeEventListener("keydown", typingCallback);
    };
  }, [typingCallback]);

  return {
    typingEvent,
  };
}

function useTypingGame() {
  const [wpm, setWpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typingValue, setTypingValue] = useState("");

  const [board, setBoard] = useState(Board.init());

  const restart = useCallback(() => {
    setBoard(Board.init());
  }, []);

  const onTyping = useCallback((code: KeyCode, char: string) => {
    setBoard((board) => {
      const nextBoard = Board.moveByKey(char, code, board);
      return nextBoard;
    });
  }, []);

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
