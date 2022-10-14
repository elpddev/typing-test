import { Box, Container } from "@mantine/core";
import { Stack, NumberInput, Text, Group, Button } from "@mantine/core";
import { useCallback, useEffect, useState } from "react";
import { wordBank } from "./wordBank";

export function TypingGame() {
  const { currentWordIndex, wpm, timeLeft, words, restart } = useTypingGame();

  return (
    <Container>
      <Stack align="center">
        <div>Game Title</div>

        <ActionBar wpm={wpm} timeLeft={timeLeft} onRestart={restart} />

        <WordsCard words={words} currentWordIndex={currentWordIndex} />

        <TypingPanel />
      </Stack>
    </Container>
  );
}

function ActionBar({
  wpm,
  timeLeft,
  onRestart,
}: {
  wpm: number;
  timeLeft: number;
  onRestart: () => void;
}) {
  return (
    <Group>
      <Text>WPM</Text>
      <NumberInput disabled value={wpm} />

      <Text>Time left</Text>
      <NumberInput disabled value={timeLeft} />

      <Button onClick={onRestart}>Restart</Button>
    </Group>
  );
}

function WordsCard({
  currentWordIndex,
  words,
}: {
  currentWordIndex: number;
  words: GameWord[];
}) {
  return (
    <Group position="center">
      {words.map((word, index) => (
        <WordCard key={index} word={word} highlight={index === currentWordIndex}/>
      ))}
    </Group>
  );
}

function WordCard({ highlight, word }: { highlight: boolean; word: GameWord }) {
  return (
    <Box component="span" sx={{
      backgroundColor: highlight ? 'lightgreen' : 'none',
    }}>
      {word.letters.map((letter) => (
        <LetterCard letter={letter} />
      ))}
    </Box>
  );
}

function LetterCard({ letter }: { letter: GameLetter }) {
  return <Text component="span">{letter.letter}</Text>;
}

function TypingPanel() {
  return <div>Typing panel</div>;
}

enum GameStatus {
  Initial,
  InProgress,
  Done,
}

enum SuccessStatus {
  Initial,
  Fail,
  Success,
}

class GameLetter {
  success: SuccessStatus = SuccessStatus.Initial;

  constructor(readonly letter: string) {}
}

class GameWord {
  success: SuccessStatus = SuccessStatus.Initial;
  letters: GameLetter[] = [];

  constructor(word: string) {
    this.letters = this.calcLetters(word);
  }

  private calcLetters(word: string): GameLetter[] {
    return Array.from(word).map((letter) => new GameLetter(letter));
  }
}

function useTypingGame() {
  const [wpm, setWpm] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Initial);
  const [words, setWords] = useState<GameWord[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const restart = useCallback(() => {
    setWpm(0);
    setTimeLeft(60);
    setGameStatus(GameStatus.Initial);
    setWords(calcGameWords());
    setCurrentWordIndex(0);
  }, []);

  useEffect(() => {
    restart();
  }, [restart]);

  return {
    currentWordIndex,
    wpm,
    words,
    timeLeft,
    restart,
  };
}

function calcGameWords(): GameWord[] {
  // todo: calc amount based on fixed characters count. for accurate stats.
  const amount = 18;
  const bank = [...wordBank];
  const words = [];

  for (let i = 0; i < amount; i += 1) {
    const nextIndex = Math.floor(Math.random() * bank.length);
    const word = bank[nextIndex];
    bank.splice(nextIndex, 1);
    words.push(word);
  }

  const gameWords = words.map((word) => new GameWord(word));

  return gameWords;
}
