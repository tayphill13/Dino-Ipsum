import {Game} from '../src/dino.js';

describe ('dino hangman', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test("Should correctly create game object with word array, input letters array, and remaining guesses", () => {
    expect(game.word).toEqual([]);
    expect(game.inputs).toEqual([]);
    expect(game.guesses).toEqual(7);
  });

  test("Should correctly populate word array with API call", async () => {
    await game.getWord();
    expect(game.word.length).toBeGreaterThan(0);
  });

  test('should compare a single letter input from the user to each letter in the word, altering the word guessed value to true', () => {
    game.parseWord(["G", "a", "r", "g", "o", "y", "l", "e", "o", "s", "a", "u", "r", "u", "s"]);
    game.checkLetter("A");
    expect(game.word[1].guessed).toBeTruthy();
  });

  test('should reduce the total number of guesses by one, if the guessed letter is not found within the word', () => {
    game.parseWord(["G", "a", "r", "g", "o", "y", "l", "e", "o", "s", "a", "u", "r", "u", "s"]);
    game.checkLetter("Z");
    expect(game.guesses).toEqual(6);
  });
});
