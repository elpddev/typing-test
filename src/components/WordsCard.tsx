import { Group, ScrollArea } from "@mantine/core";
import { Board } from "../models/Board";
import { WordCard } from "./WordCard";

export function WordsCard({ board }: { board: Board }) {
  return (
    <ScrollArea
      style={{
        height: 250,
        backgroundColor: "#fdfdfd",
        border: "1px solid lightgray",
      }}
      p={15}
    >
      <Group position="center" spacing={12}>
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
