let randomNumber = parseInt(Math.random() * 100 + 1);

const submit = document.querySelector('#sbt');
const userInput = document.querySelector('#txt');
const guessp = document.querySelector('#guesp');
const guessr = document.querySelector('#guesr');
const loworhi = document.querySelector('.loworhi');
const resultContainer = document.querySelector('.result-text');

let prevGuesses = [];
let numGuesses = 1;
let maxGuesses = 10;
let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    displayMessage('Please enter a valid number');
  } else if (guess < 1 || guess > 100) {
    displayMessage('Number must be between 1 and 100');
  } else {
    prevGuesses.push(guess);
    if (numGuesses === maxGuesses) {
      displayGuess(guess);
      displayMessage(`Game Over! The number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage('🎉 Congratulations! You guessed it right!');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage('🔻 Too low! Try again.');
  } else {
    displayMessage('🔺 Too high! Try again.');
  }
}

function displayGuess(guess) {
  userInput.value = '';
  if (guessp.textContent === '-' || guessp.textContent === '') {
    guessp.textContent = guess;
  } else {
    guessp.textContent += `, ${guess}`;
  }
  guessr.textContent = maxGuesses - numGuesses;
  numGuesses++;
}

function displayMessage(message) {
  loworhi.textContent = message;
}

function endGame() {
  userInput.disabled = true;
  submit.disabled = true;
  playGame = false;
  const newGameBtn = document.createElement('button');
  newGameBtn.textContent = 'Start New Game';
  newGameBtn.classList.add('btn', 'btn-success', 'w-100', 'mt-3');
  resultContainer.appendChild(newGameBtn);
  newGameBtn.addEventListener('click', newGame);
}

function newGame() {
  randomNumber = parseInt(Math.random() * 100 + 1);
  prevGuesses = [];
  numGuesses = 1;
  guessp.textContent = '-';
  guessr.textContent = maxGuesses;
  userInput.disabled = false;
  submit.disabled = false;
  loworhi.textContent = '';
  const oldButton = resultContainer.querySelector('.btn-success');
  if (oldButton) resultContainer.removeChild(oldButton);
  playGame = true;
}
