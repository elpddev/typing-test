import { Group, ScrollArea } from "@mantine/core";
import { memo, useRef } from "react";
import { Board } from "../models/Board";
import { TypingAreaProvider } from "./TypingAreaProvier";
import { WordCard } from "./WordCard";

function WordsCardFn({ board }: { board: Board }) {
  const viewport = useRef<HTMLDivElement>();

  return (
    <ScrollArea
      style={{
        height: 250,
        backgroundColor: "#323437",
      }}
      p={15}
      viewportRef={viewport as any}
    >
      <TypingAreaProvider viewport={viewport as any}>
        <Group spacing={0} align="center">
          {board.words.map((word, index) => {
            const isCurrent = index === board.currentWordIndex;
            return (
              <WordCard
                key={word.guid}
                word={word}
                isCurrent={isCurrent}
                currentLetterIndex={
                  isCurrent ? board.currentWordLetterIndex : 0
                }
              />
            );
          })}
        </Group>
      </TypingAreaProvider>
    </ScrollArea>
  );
}

export const WordsCard = memo(WordsCardFn);
