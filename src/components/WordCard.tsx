import { Box } from "@mantine/core";
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
    <Box
      component="span"
      sx={{
        backgroundColor: isCurrent ? "lightgreen" : "none",
      }}
    >
      {word.letters.map((letter, index) => (
        <LetterCard
          key={index}
          letter={letter}
          isCurrent={isCurrent && index === currentLetterIndex}
        />
      ))}
    </Box>
  );
}
