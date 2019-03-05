const options = {
	rock: 0,
	paper: 1,
	scissors: 2
};

const params = {
	user: { score: 0, choice: null },
	computer: { score: 0, choice: null },
	bestOfNumber: 5,
	setup: [
		{ option: options.rock, label: 'ROCK', beats: options.scissors, looses: options.paper },
		{ option: options.paper, label: 'PAPER', beats: options.rock, looses: options.scissors },
		{ option: options.scissors, label: 'SCISSORS', beats: options.paper, looses: options.rock }
	]
};

var userscore_span = document.getElementById("userScore");
var computerscore_span = document.getElementById("computerScore");
var result_div = document.querySelector(".result");
var gameOverModal = document.getElementById("over");

const choiceButtons = document.querySelectorAll('.playerMove');
var resetButton = document.getElementById('resetButton');

function getComputerChoice() {
  const move = Math.floor(Math.random() * Math.floor(params.setup.length - 1));
  return params.setup[move];
}

function refreshScore() {
  userscore_span.innerHTML = params.user.score;
  computerscore_span.innerHTML = params.computer.score;
}


function win() {
  params.user.score++;
  result_div.innerHTML = params.user.choice.label + " " + "BEATS" + " " + params.computer.choice.label + " " + "YOU WIN!";
}

function lose() {
  params.computer.score++;
  result_div.innerHTML = params.user.choice.label + " " + "LOSES" + " " + params.computer.choice.label + " " +  "YOU LOSE!";
}

function draw() {
  result_div.innerHTML = params.user.choice.label + " " + "EQUALS" + " " + params.computer.choice.label + " " +  "DRAW";
}

function play(userChoice, computerChoice) {
	params.user.choice = userChoice;
	params.computer.choice = computerChoice;
	console.log(userChoice, computerChoice);

	if (params.user.choice === params.computer.choice) {
		draw();
	} else if (params.user.choice.beats === params.computer.choice.option) {
		win();
	} else {
		lose();
	}

	refreshScore();
	checkBestOf();
}

function restart() {
	params.user.score = 0;
	params.computer.score = 0;

	refreshScore();

	result_div.innerHTML = '';

	choiceButtons.forEach(function(element) {
		element.classList.remove('hide');
	});

	gameOverModal.classList.add('hide');
}

function checkBestOf() {
  var winningScore = Math.max(params.user.score, params.computer.score);
  var winningMargin = params.bestOfNumber / 2;
  var gamesPlayed = params.user.score + params.computer.score;

  if (winningScore > winningMargin) {
    gameOver('Game Over!');
  } else if (gamesPlayed === params.bestOfNumber) {
    gameOver('Draw!');
  }
}

function gameOver(text) {
    result_div.innerHTML = text;
    choiceButtons.forEach(function(element) {
		element.classList.add('hide');
	});
	gameOverModal.classList.remove('hide');
}

function playerMove() {
	const move = this.getAttribute('data-move');
	const playerChoice = params.setup.find(function(item) { return item.label === move.toUpperCase() });
	play(playerChoice, getComputerChoice());
}

/* NASŁUCHIWACZE */

choiceButtons.forEach(function(element) {
	element.addEventListener('click', playerMove);
});

resetButton.addEventListener('click', function() {
  restart();
});