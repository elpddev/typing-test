import { Box, Group } from "@mantine/core";
import { Word } from "../Word";
import { LetterCard } from "./LetterCard";

export function WordCard({
  word,
  isCurrent,
  currentLetterIndex,
}: {
  word: Word;
  isCurrent: boolean;
  currentLetterIndex: number;
}) {
  return (
    <Group
      spacing={3}
      sx={{
        backgroundColor: isCurrent ? "lightgray" : "none",
      }}
    >
      {word.letters.map((letter, index) => (
        <LetterCard
          key={index}
          letter={letter}
          isHighlight={isCurrent}
          isCurrent={isCurrent && index === currentLetterIndex}
        />
      ))}
    </Group>
  );
}
