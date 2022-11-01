import { Text } from "@mantine/core";
import { memo, useMemo } from "react";
import { Letter } from "../models/Letter";
import { SuccessStatus } from "../models/SuccessStatus";

function LetterCardFn({
  letter,
  isCurrent,
  isHighlight,
}: {
  letter: Letter;
  isCurrent: boolean;
  isHighlight: boolean;
}) {
  const style = useMemo(
    () => styleLetterCard(letter, isCurrent, isHighlight),
    [letter, isCurrent, isHighlight]
  );

  return (
    <Text component="span" sx={style}>
      {letter.char}
    </Text>
  );
}

function styleLetterCard(
  letter: Letter,
  isCurrent: boolean,
  isHighlight: boolean
): Record<string, any> {
  const color = styleColor(letter);
  const backgroundColor = styleBackgroundColor(letter, isHighlight, isCurrent);
  /*
  let borderLeft = "";

  if (isCurrent) {
    borderLeft = "1px solid white";
  }
  */

  let before = {};

  if (isCurrent) {
    before = {
      content: "''",
      width: "2px",
      height: "100%",
      background: "#ec7fff",
      position: "absolute",
      left: "0px",
      animation: "cursor-blink 0.8s infinite",
    };
  }

  return {
    position: "relative",
    color,
    // borderLeft,
    backgroundColor,
    fontSize: "28px",
    fontFamily: "monospace",
    whiteSpace: "pre",
    padding: "0 3px",
    "::before": {
      ...before,
    },
    "@keyframes cursor-blink": {
      "0%": { background: "transparent" },
      "50%": { background: "#ff963a" },
      "100%": { background: "transparent" },
    },
  };
}

function styleColor(letter: Letter) {
  if (letter.successStatus === SuccessStatus.Fail) {
    return "#ed5252";
  }

  if (letter.successStatus === SuccessStatus.Success) {
    return "#d7d7d7";
  }

  return "#727272";
}

function styleBackgroundColor(
  letter: Letter,
  isHighlight: boolean,
  isCurrent: boolean
) {
  /*
  if (isCurrent) {
    return "lightgreen";
  }
  */

  /*
  if (isHighlight) {
    return "#cccccc";
  }
  */

  return "#323437";
}

export const LetterCard = memo(LetterCardFn);
