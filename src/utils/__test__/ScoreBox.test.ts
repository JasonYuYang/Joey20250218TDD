import { describe, expect, test, beforeEach } from "vitest";
import { ScoreBox } from "./ScoreBox";

describe("ScoreBox", () => {
  let scoreBox: ScoreBox;

  beforeEach(() => {
    scoreBox = new ScoreBox("Alice", "Bob");
  });

  test("should initialize players correctly", () => {
    expect(scoreBox.showScore()).equals("Love All");
  });

  test("should display correct score for 1:0", () => {
    scoreBox.clickLeft();
    expect(scoreBox.showScore()).equals("Fifteen Love");
  });

  test("should display correct score for 2:0", () => {
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    expect(scoreBox.showScore()).equals("Thirty Love");
  });

  test("should display correct score for 3:0", () => {
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    expect(scoreBox.showScore()).equals("Forty Love");
  });

  test("should handle deuce case", () => {
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    scoreBox.clickRight();
    scoreBox.clickRight();
    scoreBox.clickRight();
    expect(scoreBox.showScore()).equals("Deuce");
  });

  test("should handle advantage case", () => {
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    scoreBox.clickRight();
    scoreBox.clickRight();
    scoreBox.clickRight();
    scoreBox.clickLeft();
    expect(scoreBox.showScore()).equals("Alice Adv");
  });

  test("should handle win case", () => {
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    scoreBox.clickRight();
    scoreBox.clickRight();
    scoreBox.clickRight();
    scoreBox.clickLeft();
    scoreBox.clickLeft();
    expect(scoreBox.showScore()).equals("Alice Win");
  });
});
