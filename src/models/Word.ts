import { DisplayType } from "./DisplayType";
import { Letter } from "./Letter";
import * as LetterMod from "./Letter";
import { SuccessStatus } from "./SuccessStatus";
import { v4 } from "uuid";

export function replaceLetter(
  newLetter: Letter,
  index: number,
  word: Word
): Word {
  const newLetters = [...word.letters];
  newLetters.splice(index, 1, newLetter);

  const newWord = clone(word);
  newWord.letters = newLetters;

  return newWord;
}

export interface Word {
  letters: Letter[];
  successStatus: SuccessStatus;
  displayType: DisplayType;
  guid: string;
}

export function init(wordStr: string): Word {
  const item = {
    displayType: DisplayType.Initial,
    successStatus: SuccessStatus.Initial,
    letters: generateLetters(wordStr),
    guid: v4(),
  };

  return item;
}

export function clone(word: Word): Word {
  const item = init("");
  item.displayType = word.displayType;
  item.successStatus = word.successStatus;
  item.letters = word.letters;

  return item;
}

export function generateLetters(word: string): Letter[] {
  return Array.from(word).map((char) => LetterMod.init(char));
}
