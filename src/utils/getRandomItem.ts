import { wordBank } from "../data/wordBank";

export function getRandomItem<T>(items: T[]): T {
  const nextIndex = Math.floor(Math.random() * (items.length - 1));
  const nextItem = items[nextIndex];

  return nextItem;
}
