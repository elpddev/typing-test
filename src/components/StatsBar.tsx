import { NumberInput, Text, Group, Button, Stack } from "@mantine/core";
import styled from "@emotion/styled";

export function StatsBar({ wpm, timeLeft }: { wpm: number; timeLeft: number }) {
  return (
    <Group position="apart">
      <StatsBox>
        <Group position="apart" align="baseline">
          <Text>WPM:</Text>
          <div>{Math.floor(wpm)}</div>
        </Group>
      </StatsBox>

      <StatsBox>
        <Group position="apart" align="baseline">
          <Text>Time left:</Text>
          <div>{Math.floor(timeLeft / 1000)}</div>
        </Group>
      </StatsBox>
    </Group>
  );
}

const StatsBox = styled.div({
  // backgroundColor: "rgb(253, 253, 253)",
  // border: "1px solid lightgray",
  color: "#c8c7c7",
  padding: "5px",
});
