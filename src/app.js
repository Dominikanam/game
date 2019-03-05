const options = {
	rock: 0,
	paper: 1,
	scissors: 2
};

const params = {
	user: { score: 0, choice: null },
	computer: { score: 0, choice: null },
	bestOfNumber: 5,
	played: 0,
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
var winner = document.getElementById("winner");
var progress = document.querySelector("table");
var progressBody = progress.querySelector('tbody');

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

function updateProgress(isDraw) {
	if (params.played === 0) {
		return;
	}

	var rows = progressBody.querySelectorAll('tr');
	updateProgressRow(rows[params.played - 1]);

	if (isDraw) {
		progressBody.innerHTML += '<tr><td></td><td></td><td></td></tr>';
	}
}

function updateProgressRow(row) {
	row.innerHTML = `<td>${params.user.choice.label}</td>
		<td>${params.user.score}:${params.computer.score}</td>
		<td>${params.computer.choice.label}</td>`;
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

	const isDraw = params.user.choice === params.computer.choice;

	params.played++;
	if (isDraw) {
		draw();
	} else if (params.user.choice.beats === params.computer.choice.option) {
		win();
	} else {
		lose();
	}

	refreshScore();
	updateProgress(isDraw);
	checkBestOf();
}

function restart() {
	params.played = 0;
	params.user.score = 0;
	params.computer.score = 0;

	prepareProgress();
	refreshScore();

	result_div.innerHTML = '';
	gameOverModal.classList.add('hide');
}

function prepareProgress() {
	progressBody.innerHTML = '';

	for (var i = 0; i < params.bestOfNumber; i++) {
		progressBody.innerHTML += '<tr><td></td><td></td><td></td></tr>';
	}
}

function checkBestOf() {
	var winningScore = Math.max(params.user.score, params.computer.score);
	var winningMargin = params.bestOfNumber / 2;
	var gamesPlayed = params.user.score + params.computer.score;

	if (winningScore > winningMargin) {
		if (params.user.score > params.computer.score) {
			gameOver(params.user);
		} else {
			gameOver(params.computer);
		}
	} else if (gamesPlayed === params.bestOfNumber) {
		gameOver();
	}
}

function gameOver(user) {
	if (user === params.user) {
		winner.innerHTML = 'YOU WIN, CONGRATULATIONS!';
	} else if (user === params.computer) {
		winner.innerHTML = 'YOU LOSE, SORRY...';
	} else {
		winner.innerHTML = 'It\'s a draw!';
	}

	gameOverModal.classList.remove('hide');
}

function playerMove() {
	const move = this.getAttribute('data-move');
	const playerChoice = params.setup.find(function(item) { return item.option == move });
	play(playerChoice, getComputerChoice());
}

/* NASŁUCHIWACZE */

choiceButtons.forEach(function(element) {
	element.addEventListener('click', playerMove);
});

resetButton.addEventListener('click', function() {
  restart();
});

prepareProgress();