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
  })();
  
  $("#input-form").submit(function (event) {
    event.preventDefault();
    let input = $("#letter-input").val();
    $("#letter-input").val("");
    debugger;
    game.checkLetter(input);
    displayGame(game);
  });
});

function displayGame(game) {
  displayWord(game);
  displayGuesses(game);
  displayGuessedLetters(game);
  checkWinLose(game);
}

function displayWord (game) {
  $("#dino-word").text("");
  for (let i = 0; i < game.word.length; i++) {
    if (game.word[i].guessed) {
      $("#dino-word").append(game.word[i].letter);
    } else {
      $("#dino-word").append(" _ ");
    }
  }
}

function displayGuesses (game) {
  $("#guesses-remain").text(game.guesses);
}

function displayGuessedLetters (game) {
  $("#already-guessed").text(game.inputs.join(", "));
}

function checkWinLose(game) {
  if (game.hasWon) {
    $('#submit-button').disabled = true;
    $('#win-lose').text('You Won!');
  }
  if (game.hasLost) {
    $('#submit-button').disabled = true;
    $('#win-lose').text('You Lost!');
  }
}