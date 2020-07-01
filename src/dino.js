import {NameService} from '../src/name-service.js';
import {Letter} from '../src/guessed-letter.js'; 

export class Game {
  constructor() {
    this.word = [];
    this.inputs = [];
    this.guesses = 7;
    this.guessedLetterCount = 0;
    this.hasLost = false;
    this.hasWon = false;
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
    if (/^[A-Za-z]$/.test(letterGuess))  { 
      const lowerCaseGuess = letterGuess.toLowerCase();
      
      if (!this.inputs.includes(lowerCaseGuess)) {
        let incorrectGuess = true;
        for (let i =0; i < this.word.length; i++) {
          if (lowerCaseGuess === this.word[i].letter.toLowerCase()) {
            this.word[i].guessed = true;
            this.guessedLetterCount++;
            incorrectGuess = false;
          }
        }
        if (incorrectGuess) {
          this.inputs.push(lowerCaseGuess);
        }
        this.checkStatus();
        if (incorrectGuess) {
          this.guesses --;
          this.checkStatus();
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }
    
  checkStatus () {
    this.hasWon = true;
    for (const letter of this.word) {
      if (letter.guessed === false) {
        this.hasWon = false;
        break;
      }
    }
    if (this.guesses === 0) {
      this.hasLost = true;
    }
  
  }
}

/* if (this.word.every(element => element.guessed === true)) {
  this.hasWon = true;
} */