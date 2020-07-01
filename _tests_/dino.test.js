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

  test('should signify that the player has lost if the number of guesses is reduced to 0', () => {
    game.parseWord(["G", "a", "r", "g", "o", "y", "l", "e", "o", "s", "a", "u", "r", "u", "s"]);
    game.guesses =1;
    game.checkLetter("Z");
    expect(game.hasLost).toBeTruthy();
  });

  test('should signify that the player has won if all the guessed flags for every letter in the word are set to true', ()=> {
    game.parseWord(["T", "r", "e", "x"]);
    for (const letter of game.word) {
      letter.guessed = true;
    }
    expect(game.hasWon).toBeTruthy();
  });

});
