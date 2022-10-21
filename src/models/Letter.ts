import { DisplayType } from "../DisplayType";
import { SuccessStatus } from "../SuccessStatus";

export class Letter {
  char: string = "";
  successStatus: SuccessStatus = SuccessStatus.Initial;
  displayType: DisplayType = DisplayType.Initial;

  static init(char: string): Letter {
    const item = new Letter();
    item.successStatus = SuccessStatus.Initial;
    item.displayType = DisplayType.Initial;
    item.char = char;

    return item;
  }

  static clone(letter: Letter): Letter {
    const item = new Letter();
    item.successStatus = letter.successStatus;
    item.displayType = letter.displayType;
    item.char = letter.char;

    return item;
  }
}
