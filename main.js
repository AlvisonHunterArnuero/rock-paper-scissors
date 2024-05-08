// Game Options for both player or CPU
const choices = ['rock', 'paper', 'scissors'];

// Responses passed to Emojies to display it on screen
const responses = {
  rock: '✊',
  paper: '🖐️',
  scissors: '✌️',
};

// counters initiation
let plyCounter = 0;
let cpuCounter = 0;

// set background music to false on start
let isMusicOn = false;

// Set instances of all elements involved on the game
const player = document.getElementById('player');
const computer = document.getElementById('computer');
const result = document.getElementById('result');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');

// function to get a random choice from the choice array
function getRndChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

// Main function to be executed on every click event of the 3 options
function play(playerChoice) {
  clickSound.play();

  // Get the random choice for CPU
  const computerChoice = getRndChoice();
  // Set both player and CPU with their chosen options
  player.innerText = responses[playerChoice];
  computer.innerText = responses[computerChoice];

  // Game Validations
  if (playerChoice === computerChoice) {
    result.innerText = "It's a draw! 😌";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result.innerText = 'You win! 😄';
    winSound.play();
    plyCounter += 1; // increase player score
    playerScore.innerText = `Points: ${plyCounter}`; // update score on screen
  } else {
    result.innerText = 'You lose! 😢';
    loseSound.play();
    cpuCounter += 1; // increase CPU score
    computerScore.innerText = `Points: ${cpuCounter}`; // update score on screen
  }
}

// This function is to control background music with a toggle button
function bgMusic() {
  const bgMusicAudioTag = document.getElementById('musicSelector');
  if (isMusicOn === true) {
    bkMusic.pause();
    bkMusic.currentTime = 0;
    isMusicOn = false;
    bgMusicAudioTag.innerText = 'Music OFF 🔈';
    bgMusicAudioTag.setAttribute('class', 'w-50 text-end text-muted');
  } else {
    bkMusic.play();
    isMusicOn = true;
    bgMusicAudioTag.innerText = 'Music ON 🔊';
    bgMusicAudioTag.setAttribute('class', 'w-50 text-end');
  }
}
