import { NumberInput, Text, Group, Button, Stack } from "@mantine/core";

export function ActionBar({
  wpm,
  timeLeft,
  onRestart,
}: {
  wpm: number;
  timeLeft: number;
  onRestart: () => void;
}) {
  return (
    <Group position="center">
      <Button color="yellow" uppercase onClick={onRestart}>
        Restart
      </Button>
    </Group>
  );
}
