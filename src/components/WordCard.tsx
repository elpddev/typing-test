import { Box, Group } from "@mantine/core";
import { memo, useContext, useEffect, useRef } from "react";
import { Word } from "../models/Word";
import { LetterCard } from "./LetterCard";
import { TypingAreaContext } from "./TypingAreaProvier";

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
  const typingArea = useContext(TypingAreaContext);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    if (!isCurrent) {
      return;
    }

    const top = ref?.current?.offsetTop || 0;
    typingArea.scrollToSelf(top);
  }, [isCurrent, typingArea, ref]);

  return (
    <Group
      ref={ref as any}
      spacing={0}
      sx={
        {
          // backgroundColor: isCurrent ? "#f1f1f1" : "none",
        }
      }
      p={0}
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
