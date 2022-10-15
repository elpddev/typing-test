import { KeyCode } from "./KeyCode";
import { wordBank } from "./wordBank";
import { getRandomItem } from "./getRandomItem";
import { Word } from "./Word";
import { Letter } from "./Letter";
import { SuccessStatus } from "./SuccessStatus";

// todo: refactor to functional interface and functions
export class Board {
  words: Word[] = [];
  successStatus: SuccessStatus = SuccessStatus.Initial;
  currentWordIndex: number = 0;
  currentWordLetterIndex: number = 0;

  static init() {
    const item = new Board();
    item.words = Board.generateWords(10);
    item.successStatus = SuccessStatus.Initial;
    item.currentWordIndex = 0;
    item.currentWordLetterIndex = 0;

    return item;
  }

  static clone(board: Board) {
    const item = new Board();
    item.words = [...board.words];
    item.successStatus = board.successStatus;
    item.currentWordIndex = board.currentWordIndex;
    item.currentWordLetterIndex = board.currentWordLetterIndex;

    return item;
  }

  static generateWords(amount: number): Word[] {
    const gameWords = [];

    for (let i = 0; i < amount; i += 1) {
      const nextWord = getRandomItem(wordBank);
      const nextGameWord = Word.init(nextWord);
      gameWords.push(nextGameWord);
    }

    return gameWords;
  }

  static moveByKey(char: string, code: KeyCode, board: Board) {
    if (code === KeyCode.Backspace) {
      if (Board.isAtStartOfFirstWord(board)) {
        return board;
      }

      return Board.moveBackward(board);
    }

    if (code === KeyCode.Space) {
      if (board.currentWordLetterIndex === 0) {
        return board;
      }

      if (board.currentWordIndex === board.words.length - 1) {
        return board;
      }

      return Board.moveForwardWord(board);
    }

    return Board.moveNextLetterByKey(board, char, code);
  }

  static moveNextLetterByKey(board: Board, char: string, code: KeyCode) {
    const currWord = board.words[board.currentWordIndex];
    const currLetter = currWord.letters[board.currentWordLetterIndex];

    const newLetter = Letter.clone(currLetter);

    if (currLetter.char === char) {
      newLetter.successStatus = SuccessStatus.Success;
    } else {
      newLetter.successStatus = SuccessStatus.Fail;
    }

    const newWord = Word.replaceLetter(newLetter, board.currentWordLetterIndex, currWord);

    const newBoard = Board.replaceWord(newWord, board.currentWordIndex, board);
    if (newBoard.currentWordLetterIndex === newWord.letters.length - 1) {
      newBoard.currentWordLetterIndex = 0;
      newBoard.currentWordIndex += 1;
    } else {
      newBoard.currentWordLetterIndex += 1;
    }

    return newBoard;
  }

  static replaceWord(newWord: Word, index: number, board: Board): Board {
    const newWords = [...board.words];
    newWords.splice(index, 1, newWord);

    const newBoard = Board.clone(board);
    newBoard.words = newWords;

    return newBoard;
  }

  static isAtStartOfFirstWord(board: Board): boolean {
    return board.currentWordIndex === 0 && board.currentWordLetterIndex === 0;
  }

  static moveBackward(board: Board) {
    if (board.currentWordLetterIndex === 0) {
      if (board.currentWordIndex === 0) {
        return board;
      }

      return Board.moveBackwardWord(board);
    }

    return Board.moveBackwardInWord(board);
  }

  static moveMarkerBackwardWord(board: Board) {
    const nextBoard = Board.clone(board);
    nextBoard.currentWordIndex -= 1;

    const currWord = nextBoard.words[nextBoard.currentWordIndex];
    nextBoard.currentWordLetterIndex = currWord.letters.length - 1;

    return nextBoard;
  }

  static moveMarkerBackwardWordToLastInitial(board: Board) {
    const nextBoard = Board.clone(board);
    nextBoard.currentWordIndex -= 1;

    const currWord = nextBoard.words[nextBoard.currentWordIndex];
    const lastInitialLetterIndex = currWord.letters.findIndex(letter => letter.successStatus === SuccessStatus.Initial);
    if (lastInitialLetterIndex >= 0) {
      nextBoard.currentWordLetterIndex = lastInitialLetterIndex;
    } else {
      nextBoard.currentWordLetterIndex = currWord.letters.length - 1;
    }

    return nextBoard;
  }

  static moveBackwardWord(board: Board) {
    let nextBoard = Board.moveMarkerBackwardWordToLastInitial(board);
    nextBoard = Board.resetSuccessCurrentLetter(nextBoard);

    return nextBoard;
  }

  static resetSuccessCurrentLetter(board: Board): Board {
    const currWord = board.words[board.currentWordIndex];
    const currLetter = currWord.letters[board.currentWordLetterIndex];

    const newLetter = Letter.clone(currLetter);

    newLetter.successStatus = SuccessStatus.Initial;

    const newWord = Word.replaceLetter(newLetter, board.currentWordLetterIndex, currWord);
    const newBoard = Board.replaceWord(newWord, board.currentWordIndex, board);

    return newBoard;
  }

  static moveMarketBackwardInWord(board: Board): Board {
    const nextBoard = Board.clone(board);
    nextBoard.currentWordLetterIndex -= 1;

    return nextBoard;
  }

  static moveBackwardInWord(board: Board) {
    let nextBoard = Board.moveMarketBackwardInWord(board);
    nextBoard = Board.resetSuccessCurrentLetter(nextBoard);

    return nextBoard;
  }

  static moveForwardWord(board: Board) {
    const nextBoard = Board.clone(board);
    nextBoard.currentWordIndex += 1;
    nextBoard.currentWordLetterIndex = 0;

    return nextBoard;
  }
}
