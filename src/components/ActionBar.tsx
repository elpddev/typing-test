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
    <Stack sx={{ width: "400px" }}>
      <Group position="apart">
        <Text>WPM</Text>
        <NumberInput disabled value={wpm} />
      </Group>

      <Group position="apart">
        <Text>Time left</Text>
        <NumberInput disabled value={timeLeft} />
      </Group>

      <Button onClick={onRestart}>Restart</Button>
    </Stack>
  );
}
