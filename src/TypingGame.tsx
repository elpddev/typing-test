import { Container } from '@mantine/core';
import { Stack, NumberInput, Text, Group, Button } from '@mantine/core';
import { useCallback, useState } from 'react';

export function TypingGame() {
  const {wpm, timeLeft, restart} = useTypingGame();

  return (
    <Container>
      <Stack align="center">
        <div>Game Title</div>

        <ActionBar wpm={wpm} timeLeft={timeLeft} onRestart={restart}/>

        <WordsCard />

        <TypingPanel />
      </Stack>
    </Container>
  );
}

function ActionBar({ wpm, timeLeft, onRestart }: {
  wpm: number;
  timeLeft: number;
  onRestart: () => void;
}) {
  return (
    <Group>
      <Text>WPM</Text>
      <NumberInput disabled value={wpm}/>

      <Text>Time left</Text>
      <NumberInput disabled value={timeLeft}/>

      <Button onClick={onRestart}>Restart</Button>
    </Group>
  )
}

function WordsCard() {
  return (<div>Word card</div>);
}

function TypingPanel() {
  return (<div>Typing panel</div>);
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

  const restart = useCallback(() => {
    console.log('** restart');
  }, []);

  return {
    wpm,
    timeLeft,
    restart
  };
}