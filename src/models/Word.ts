import { DisplayType } from "../DisplayType";
import { Letter } from "../Letter";
import { SuccessStatus } from "../SuccessStatus";

export class Word {
  static replaceLetter(newLetter: Letter, index: number, word: Word) {
    const newLetters = [...word.letters];
    newLetters.splice(index, 1, newLetter);

    const newWord = Word.clone(word);
    newWord.letters = newLetters;

    return newWord;
  }

  letters: Letter[] = [];
  successStatus: SuccessStatus = SuccessStatus.Initial;
  displayType: DisplayType = DisplayType.Initial;

  static init(word: string): Word {
    const item = new Word();
    item.displayType = DisplayType.Initial;
    item.successStatus = SuccessStatus.Initial;
    item.letters = Word.generateLetters(word);

    return item;
  }

  static clone(word: Word) {
    const item = new Word();
    item.displayType = word.displayType;
    item.successStatus = word.successStatus;
    item.letters = word.letters;

    return item;
  }

  static generateLetters(word: string): Letter[] {
    return Array.from(word).map((char) => Letter.init(char));
  }
}
