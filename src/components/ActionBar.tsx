import {
  NumberInput, Text,
  Group,
  Button
} from "@mantine/core";

export function ActionBar({
  wpm, timeLeft, onRestart,
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
