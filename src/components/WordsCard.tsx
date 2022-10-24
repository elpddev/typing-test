import { Group, ScrollArea } from "@mantine/core";
import { memo } from "react";
import { Board } from "../models/Board";
import { WordCard } from "./WordCard";

function WordsCardFn({ board }: { board: Board }) {
  return (
    <ScrollArea
      style={{
        height: 250,
        backgroundColor: "#fdfdfd",
        border: "1px solid lightgray",
      }}
      p={15}
    >
      <Group spacing={0} align="center">
        {board.words.map((word, index) => {
          const isCurrent = index === board.currentWordIndex;
          return (
            <WordCard
              key={word.guid}
              word={word}
              isCurrent={isCurrent}
              currentLetterIndex={isCurrent ? board.currentWordLetterIndex : 0}
            />
          );
        })}
      </Group>
    </ScrollArea>
  );
}

export const WordsCard = memo(WordsCardFn);
