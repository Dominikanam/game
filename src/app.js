import world from './world';

var user = { score: 0, choice: '' };
var computer = { score: 0, choice: '' };
var bestOfNumber = 5;

var userscore_span = document.getElementById ("userScore");
var computerscore_span = document.getElementById ("computerScore");
var result_div = document.querySelector(".result");

var rockButton = document.getElementById('rockButton');
var paperButton = document.getElementById('paperButton');
var scissorsButton = document.getElementById('scissorsButton');
var resetButton = document.getElementById('resetButton');

function getComputerChoice() {
  var choices = ['ROCK', 'PAPER', 'SCISSORS'];
  return choices[Math.floor(Math.random() * 5)];
}

function refreshScore() {
  userscore_span.innerHTML = user.score;
  computerscore_span.innerHTML = computer.score;
}


function win() {
  user.score++;
  result_div.innerHTML = user.choice + " " + "BEATS" + " " + computer.choice + " " + "YOU WIN!";
}

function lose() {
  computer.score++;
  result_div.innerHTML = user.choice + " " + "LOSES" + " " + computer.choice + " " +  "YOU LOSE!";
}

function draw() {
  result_div.innerHTML = user.choice + " " + "EQUALS" + " " + computer.choice + " " +  "DRAW";
}

function game(userChoice) {
  var computerChoice = getComputerChoice();
  user.choice = userChoice;
  computer.choice = computerChoice;


  switch (user.choice + " " + computer.choice) {
    case "ROCK SCISSORS":
    case "PAPER ROCK":
    case "SCISSORS PAPER":
      win();
      break;
    case "ROCK PAPER":
    case "PAPER SCISSORS":
    case "SCISSORS ROCK":
      lose();
      break;
    case "ROCK ROCK":
    case "PAPER PAPER":
    case "SCISSORS SCISSORS":
      draw();
      break;
  }

  refreshScore();
  checkBestOf();
}

function restart() {
  user.score = 0;
  computer.score = 0;

  refreshScore();

  result_div.innerHTML = '';
  result_div.classList.remove('gameOver');

  rockButton.classList.remove('hide');
  paperButton.classList.remove('hide');
  scissorsButton.classList.remove('hide');
  resetButton.classList.add('hide');
}

function checkBestOf() {
  var winningScore = Math.max(user.score, computer.score);
  var winningMargin = bestOfNumber / 2;
  var gamesPlayed = user.score + computer.score;

  if (winningScore > winningMargin) {
    gameOver('Game Over!');
  } else if (gamesPlayed === bestOfNumber) {
    gameOver('Draw!');
  }
}

function gameOver(text) {
    result_div.innerHTML = text;

    result_div.classList.add('gameOver');
    rockButton.classList.add('hide');
    paperButton.classList.add('hide');
    scissorsButton.classList.add('hide');
    resetButton.classList.remove('hide');
}

/* NASŁUCHIWACZE */

rockButton.addEventListener('click', function() {
  game("ROCK");
});

paperButton.addEventListener('click', function() {
   game("PAPER");
});

scissorsButton.addEventListener('click', function() {
   game("SCISSORS");
});
resetButton.addEventListener('click', function() {
  restart();
});