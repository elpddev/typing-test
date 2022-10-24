import { v4 } from "uuid";
import { DisplayType } from "./DisplayType";
import { SuccessStatus } from "./SuccessStatus";

export interface Letter {
  char: string;
  successStatus: SuccessStatus;
  displayType: DisplayType;
  guid: string;
}

export function init(char: string): Letter {
  const item = {
    successStatus: SuccessStatus.Initial,
    displayType: DisplayType.Initial,
    char,
    guid: v4(),
  };

  return item;
}

export function clone(letter: Letter): Letter {
  const item = init("");
  item.successStatus = letter.successStatus;
  item.displayType = letter.displayType;
  item.char = letter.char;

  return item;
}
