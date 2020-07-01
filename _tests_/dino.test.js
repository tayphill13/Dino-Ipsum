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

  test("Should correctly populate word array with API call", () => {
    expect(game.word.length).toBeGreaterThan(0);
  });

});
