import {NameService} from '../src/name-service.js';
import {Letter} from '../src/guessed-letter.js'; 

export class Game {
  constructor() {
    this.word = [];
    this.inputs = [];
    this.guesses = 7;
  }

  async getWord () {
    let nameService = new NameService();
    let response = await nameService.getDinoName();
    if (response) {
      this.parseWord(response[0][0].split(""));
    } else {
      response = "error";
      this.parseWord(response.split(""));
    }
  }

  parseWord(letterArray) {
    for (const letter of letterArray) {
      const parsedLetter = new Letter (letter);
      this.word.push(parsedLetter);
    }
  }

  checkLetter (letterGuess) {
    const lowerCaseGuess = letterGuess.toLowerCase();

    if (!this.inputs.includes(lowerCaseGuess)) {
      for (let i =0; i < this.word.length; i++) {
        if (lowerCaseGuess === this.word[i].letter) {
          this.word[i].guessed = true;
          this.inputs.push(lowerCaseGuess);
        }
      }
    } else {
      return false;
    }
  }

}