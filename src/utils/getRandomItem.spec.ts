import { describe, expect, it, vi } from "vitest";
import { getRandomItem } from "./getRandomItem";

describe("getRandomItem", () => {
  it("get item from input data set", () => {
    const dataset = [5, 2, 3];
    expect(dataset).toContain(getRandomItem(dataset));
  });

  it("get random item base on Math.random", () => {
    const MathMock = Object.create(Math);
    vi.stubGlobal("Math", MathMock);

    const dataset = [5, 2, 3, 14, 8];

    MathMock.random = () => 1;
    // Alternative: check only for mock activation
    expect(getRandomItem(dataset)).toEqual(dataset[dataset.length - 1]);

    MathMock.random = () => 0;
    expect(getRandomItem(dataset)).toEqual(dataset[0]);
  });
});
