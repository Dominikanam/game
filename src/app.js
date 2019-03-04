import world from './world';

var user = { score: 0, choice: '' };
var computer = { score: 0, choice: '' };
var bestOfNumber = 5;

const rock = 0;
const paper = 1;
const scissors = 2;

var setup = [
	{ option: rock, label: 'ROCK', beats: scissors, looses: paper },
	{ option: paper, label: 'PAPER', beats: rock, looses: scissors },
	{ option: scissors, label: 'SCISSORS', beats: paper, looses: rock }
];

var userscore_span = document.getElementById("userScore");
var computerscore_span = document.getElementById("computerScore");
var result_div = document.querySelector(".result");

var rockButton = document.getElementById('rockButton');
var paperButton = document.getElementById('paperButton');
var scissorsButton = document.getElementById('scissorsButton');
var resetButton = document.getElementById('resetButton');

function getComputerChoice() {
  return Math.floor(Math.random() * Math.floor(setup.length - 1));
}

function refreshScore() {
  userscore_span.innerHTML = user.score;
  computerscore_span.innerHTML = computer.score;
}


function win() {
  user.score++;
  result_div.innerHTML = user.choice.label + " " + "BEATS" + " " + computer.choice.label + " " + "YOU WIN!";
}

function lose() {
  computer.score++;
  result_div.innerHTML = user.choice.label + " " + "LOSES" + " " + computer.choice.label + " " +  "YOU LOSE!";
}

function draw() {
  result_div.innerHTML = user.choice.label + " " + "EQUALS" + " " + computer.choice.label + " " +  "DRAW";
}

function play(userChoice) {
	var computerChoice = getComputerChoice();
	console.log(userChoice, computerChoice);
	user.choice = setup[userChoice];
	computer.choice = setup[computerChoice];

	if (user.choice === computer.choice) {
		draw();
	} else if (user.choice.beats === computer.choice.option) {
		win();
	} else {
		lose();
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
  play(rock);
});

paperButton.addEventListener('click', function() {
   play(paper);
});

scissorsButton.addEventListener('click', function() {
   play(scissors);
});
resetButton.addEventListener('click', function() {
  restart();
});