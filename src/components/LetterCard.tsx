import { Text } from "@mantine/core";
import { useMemo } from "react";
import { Letter } from "../Letter";
import { SuccessStatus } from "../SuccessStatus";

export function LetterCard({ letter, isCurrent, isHighlight }: { 
  letter: Letter; 
  isCurrent: boolean; 
  isHighlight: boolean;
}) {
  const style = useMemo(() => styleLetterCard(letter, isCurrent, isHighlight), [letter, isCurrent, isHighlight]);

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

function styleLetterCard(letter: Letter, isCurrent: boolean, isHighlight: boolean): Record<string, any> {
  const color = styleColor(letter);
  const backgroundColor = styleBackgroundColor(isHighlight, isCurrent);
  let borderLeft = '';

  if (isCurrent) {
    borderLeft = '1px solid white'
  }

  return {
    color,
    borderLeft,
    backgroundColor,
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

function styleBackgroundColor(isHighlight: boolean, isCurrent: boolean) {
  if (isCurrent) {
    return 'lightgreen';
  }

  return 'none';
}