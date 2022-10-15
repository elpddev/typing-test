import { Text } from "@mantine/core";
import { useMemo } from "react";
import { Letter } from "../Letter";
import { SuccessStatus } from "../SuccessStatus";

export function LetterCard({ letter, isCurrent }: { letter: Letter; isCurrent: boolean; }) {
  const style = useMemo(() => styleLetterCard(letter, isCurrent), [letter, isCurrent]);
  if (isCurrent) {
    console.log('style', style)
  }

  return (
    <Text
      component="span"
      sx={style}
    >
      {letter.char}
    </Text>
  );
}

function styleLetterCard(letter: Letter, isCurrent: boolean): Record<string, any> {
  const color = styleColor(letter);
  let borderLeft = '';

  if (isCurrent) {
    borderLeft = '1px solid white'
  }

  return {
    color,
    borderLeft,
  };
}

function styleColor(letter: Letter) {
    if (letter.successStatus === SuccessStatus.Fail) {
      return "red";
    }

    if (letter.successStatus === SuccessStatus.Success) {
      return "green";
    }

    return "black";
}