import { Group, ScrollArea } from "@mantine/core";
import { Board } from "../Board";
import { WordCard } from "./WordCard";

export function WordsCard({ board }: { board: Board }) {
  return (
    <ScrollArea style={{ height: 250 }}>
      <Group position="center" spacing={7}>
        {board.words.map((word, index) => (
          <WordCard
            key={index}
            word={word}
            isCurrent={index === board.currentWordIndex}
            currentLetterIndex={board.currentWordLetterIndex}
          />
        ))}
      </Group>
    </ScrollArea>
  );
}