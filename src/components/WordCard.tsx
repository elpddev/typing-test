import { Box, Group } from "@mantine/core";
import { memo } from "react";
import { Word } from "../models/Word";
import { LetterCard } from "./LetterCard";

function WordCardFn({
  word,
  isCurrent,
  currentLetterIndex,
}: {
  word: Word;
  isCurrent: boolean;
  currentLetterIndex: number;
}) {
  // console.log('** word card', word.guid);
  return (
    <Group
      spacing={3}
      sx={{
        backgroundColor: isCurrent ? "#f1f1f1" : "none",
      }}
      p={8}
    >
      {word.letters.map((letter, index) => (
        <LetterCard
          key={letter.guid}
          letter={letter}
          isHighlight={isCurrent}
          isCurrent={isCurrent && index === currentLetterIndex}
        />
      ))}
    </Group>
  );
}

export const WordCard = memo(WordCardFn);
