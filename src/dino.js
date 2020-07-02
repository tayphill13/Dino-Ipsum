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
            this.word[i].guess = true;
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
    if (this.word.every(element => element.guess === true)) {
      this.hasWon = true;
    }
    if (this.guesses === 0) {
      this.hasLost = true;
    }
  }

  showInitialLetter() {
    let numberOfLetters = Math.floor(this.word.length/4);
    console.log(numberOfLetters);
    if (numberOfLetters > 0) {
      let numberOfRevealedLetters = 0;
      while (numberOfLetters > numberOfRevealedLetters) {
        const randomLetter = this.getRndInteger(this.word.length);
        if (this.word[randomLetter].guess === false) {
          let count = this.revealRepeatLetters(this.word[randomLetter].letter);
          numberOfRevealedLetters += count;
        }
      }
    }
  }

  revealRepeatLetters (inputLetter) {
    let count = 0;
    for (let i = 0; i < this.word.length; i++) {
      if (this.word[i].letter === inputLetter) {
        this.word[i].guess = true;
        count ++;
      }
    }
    return count;
  }
  
  getRndInteger(max) {
    return Math.floor(Math.random() * (max) );
  }
}