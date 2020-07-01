import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Game} from './dino.js';

$(document).ready(function () {
  let game = new Game();
  (async () => {
    await game.getWord();
    displayGame(game);
  });
  
  $('#submit-button').submit(function (event) {
    event.preventDefault();
    let input = $("#letter-input").val();
    game.checkLetter(input);
    displayGame(game);
  });
});

function displayGame(game) {
  displayWord(game);
  displayGuesses(game);
  displayGuessedLetters(game);
}

function displayWord (game) {
  $("#dino-word").text("");
  for (let i = 0; i < game.word.length; i++) {
    if (game.word[i].guessed) {
      $("#dino-word").append(game.word[i].letter);
    } else {
      $("#dino-word").append("_");
    }
  }
}

function displayGuesses (game) {
  $("#guesses-remain").text(game.guesses);
}

function displayGuessedLetters (game) {
  $("#already-guessed").text(game.inputs.join(", "));
}