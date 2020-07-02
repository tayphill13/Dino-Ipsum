import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import {Game} from './dino.js';
import {GiphService} from './giphy-service.js';

$(document).ready(function () {
  let game = new Game();
  (async () => {
    await game.getWord();
    game.showInitialLetter();
    await displayGif();
    displayGame(game);
  })();
  
  $("#input-form").submit(function (event) {
    event.preventDefault();
    let input = $("#letter-input").val();
    $("#letter-input").val("");
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
    if (game.word[i].guess) {
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
    $('#submit-button').prop("disabled", true);
    $('#win-lose').text('You Won!');
  }

  if (game.hasLost) {
    let wordArray =[];
    for(const letter of game.word) {
      wordArray.push(letter.letter);
    }

    $('#submit-button').prop("disabled", true);
    $('#win-lose').text(`You Lost! The word was: ${wordArray.join("")}`);
  }
 
}
  


async function displayGif() {
  let gifService = new gifService();
  let response = await gifService.getGiphy();
  
  if (response) {
    this.parseWord(response[0][0].split(""));
  } else {
    response = "error";
    this.parseWord(response.split(""));
  }
}
