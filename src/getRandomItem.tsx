import { wordBank } from "./data/wordBank";

export function getRandomItem(items: string[]) {
  const nextIndex = Math.floor(Math.random() * items.length);
  const nextItem = wordBank[nextIndex];

  return nextItem;
}
