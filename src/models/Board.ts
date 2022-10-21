import { KeyCode } from "../KeyCode";
import { wordBank } from "../wordBank";
import { getRandomItem } from "../getRandomItem";
import * as WordMod from "./Word";
import { Word } from "./Word";
import * as LetterMod from "./Letter";
import { SuccessStatus } from "./SuccessStatus";

export interface Board {
  words: Word[];
  successStatus: SuccessStatus;
  currentWordIndex: number;
  currentWordLetterIndex: number;
}

export function init(): Board {
  const item = {
    words: generateWords(10),
    successStatus: SuccessStatus.Initial,
    currentWordIndex: 0,
    currentWordLetterIndex: 0,
  };

  return item;
}

export function clone(board: Board): Board {
  const item = init();
  item.words = [...board.words];
  item.successStatus = board.successStatus;
  item.currentWordIndex = board.currentWordIndex;
  item.currentWordLetterIndex = board.currentWordLetterIndex;

  return item;
}

export function generateWords(amount: number): Word[] {
  const gameWords = [];

  for (let i = 0; i < amount; i += 1) {
    const nextWord = getRandomItem(wordBank);
    const nextGameWord = WordMod.init(nextWord);
    gameWords.push(nextGameWord);
  }

  return gameWords;
}

export function moveByKey(char: string, code: KeyCode, board: Board): Board {
  if (code === KeyCode.Backspace) {
    if (isAtStartOfFirstWord(board)) {
      return board;
    }

    return moveBackward(board);
  }

  if (code === KeyCode.Space) {
    if (board.currentWordLetterIndex === 0) {
      return board;
    }

    if (board.currentWordIndex === board.words.length - 1) {
      return board;
    }

    return moveForwardWord(board);
  }

  return moveNextLetterByKey(board, char, code);
}

export function moveNextLetterByKey(
  board: Board,
  char: string,
  code: KeyCode
): Board {
  const currWord = board.words[board.currentWordIndex];
  const currLetter = currWord.letters[board.currentWordLetterIndex];

  const newLetter = LetterMod.clone(currLetter);

  if (currLetter.char === char) {
    newLetter.successStatus = SuccessStatus.Success;
  } else {
    newLetter.successStatus = SuccessStatus.Fail;
  }

  const newWord = WordMod.replaceLetter(
    newLetter,
    board.currentWordLetterIndex,
    currWord
  );

  const newBoard = replaceWord(newWord, board.currentWordIndex, board);
  if (newBoard.currentWordLetterIndex === newWord.letters.length - 1) {
    newBoard.currentWordLetterIndex = 0;
    newBoard.currentWordIndex += 1;
  } else {
    newBoard.currentWordLetterIndex += 1;
  }

  return newBoard;
}

export function replaceWord(newWord: Word, index: number, board: Board): Board {
  const newWords = [...board.words];
  newWords.splice(index, 1, newWord);

  const newBoard = clone(board);
  newBoard.words = newWords;

  return newBoard;
}

export function isAtStartOfFirstWord(board: Board): boolean {
  return board.currentWordIndex === 0 && board.currentWordLetterIndex === 0;
}

export function moveBackward(board: Board): Board {
  if (board.currentWordLetterIndex === 0) {
    if (board.currentWordIndex === 0) {
      return board;
    }

    return moveBackwardWord(board);
  }

  return moveBackwardInWord(board);
}

export function moveMarkerBackwardWord(board: Board): Board {
  const nextBoard = clone(board);
  nextBoard.currentWordIndex -= 1;

  const currWord = nextBoard.words[nextBoard.currentWordIndex];
  nextBoard.currentWordLetterIndex = currWord.letters.length - 1;

  return nextBoard;
}

export function moveMarkerBackwardWordToLastInitial(board: Board): Board {
  const nextBoard = clone(board);
  nextBoard.currentWordIndex -= 1;

  const currWord = nextBoard.words[nextBoard.currentWordIndex];
  const lastInitialLetterIndex = currWord.letters.findIndex(
    (letter) => letter.successStatus === SuccessStatus.Initial
  );
  if (lastInitialLetterIndex >= 0) {
    nextBoard.currentWordLetterIndex = lastInitialLetterIndex;
  } else {
    nextBoard.currentWordLetterIndex = currWord.letters.length - 1;
  }

  return nextBoard;
}

export function moveBackwardWord(board: Board): Board {
  let nextBoard = moveMarkerBackwardWordToLastInitial(board);
  nextBoard = resetSuccessCurrentLetter(nextBoard);

  return nextBoard;
}

export function resetSuccessCurrentLetter(board: Board): Board {
  const currWord = board.words[board.currentWordIndex];
  const currLetter = currWord.letters[board.currentWordLetterIndex];

  const newLetter = LetterMod.clone(currLetter);

  newLetter.successStatus = SuccessStatus.Initial;

  const newWord = WordMod.replaceLetter(
    newLetter,
    board.currentWordLetterIndex,
    currWord
  );
  const newBoard = replaceWord(newWord, board.currentWordIndex, board);

  return newBoard;
}

export function moveMarketBackwardInWord(board: Board): Board {
  const nextBoard = clone(board);
  nextBoard.currentWordLetterIndex -= 1;

  return nextBoard;
}

export function moveBackwardInWord(board: Board): Board {
  let nextBoard = moveMarketBackwardInWord(board);
  nextBoard = resetSuccessCurrentLetter(nextBoard);

  return nextBoard;
}

export function moveForwardWord(board: Board): Board {
  const nextBoard = clone(board);
  nextBoard.currentWordIndex += 1;
  nextBoard.currentWordLetterIndex = 0;

  return nextBoard;
}
