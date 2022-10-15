import { KeyCode } from "./KeyCode";
import { keyCodeByChar } from "./keyCodeByChar";

export function charToKeyCode(letter: string): KeyCode {
  return keyCodeByChar[letter];
}
