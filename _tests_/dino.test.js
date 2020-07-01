import {Game} from '../src/dino.js';

describe ('dino hangman', () => {

  test("Should correctly create game object with word array, input letters array, and remaining guesses", () => {
    let game = new Game();
    expect(game.word).toEqual([]);
    expect(game.inputs).toEqual([]);
    expect(game.guesses).toEqual(7);
  });

  test("", () => {

  });

});
