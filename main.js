/**
 * @constant {Array<string>} choices - Game options for both player and CPU.
 */
const choices = ['rock', 'paper', 'scissors'];

/**
 * @constant {Object} rules - Mapping of game choices to emojis for display.
 */
const rules = {
  rock: '✊',
  paper: '🖐️',
  scissors: '✌️',
};

/** @var {number} plyCounter - Player's score counter. */
let plyCounter = 0;

/** @var {number} cpuCounter - CPU's score counter. */
let cpuCounter = 0;

/** @var {boolean} isMusicOn - Tracks background music state (on/off). */
let isMusicOn = false;

// Set instances of all elements involved in the game
/** @type {HTMLElement} */
const player = document.getElementById('player');
/** @type {HTMLElement} */
const computer = document.getElementById('computer');
/** @type {HTMLElement} */
const result = document.getElementById('result');
/** @type {HTMLElement} */
const playerScore = document.getElementById('playerScore');
/** @type {HTMLElement} */
const computerScore = document.getElementById('computerScore');
/** @type {HTMLImageElement} */
const plyDisplay = document.getElementById('plyDisplay');
/** @type {HTMLImageElement} */
const cpuDisplay = document.getElementById('cpuDisplay');

/** @type {HTMLElement} */
const toastLiveExample = document.getElementById('liveToast');
/** @type {bootstrap.Toast} */
const toast = new bootstrap.Toast(toastLiveExample);

/**
 * Generates a random choice for the CPU.
 * @returns {string} A random choice of 'rock', 'paper', or 'scissors'.
 */
function getRndChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

/**
 * Main function to handle the game logic for each player choice.
 * @async
 * @param {string} playerChoice - The player's choice ('rock', 'paper', or 'scissors').
 * @returns {Promise<void>}
 */
async function play(playerChoice) {
  // lets reset the game current win state
  result.innerText = '... ';

  // Play the click sound and wait for it to finish
  await clickSound.play();

  // Get the random choice for CPU
  const computerChoice = await getRndChoice();

  // Set both player and CPU with their chosen options
  plyDisplay.src = `animations/ply_${playerChoice}.gif`;
  cpuDisplay.src = `animations/ply_${computerChoice}.gif`;

  await delay(500); // Delay for 1 second, adjust this time as necessary

  // Game Validations
  if (playerChoice === computerChoice) {
    result.innerText = 'It is a draw! 😌';
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    result.innerText = 'You win! 😄';
    await winSound.play();
    plyCounter += 1; // Increase player score
    playerScore.innerText = `Player: ${plyCounter}`; // Update score on screen
  } else {
    result.innerText = 'You lose! 😢';
    await loseSound.play();
    cpuCounter += 1; // Increase CPU score
    computerScore.innerText = `Computer: ${cpuCounter}`; // Update score on screen
  }

  // Save the current scores on the local storage key
  localStorage.setItem(
    'prevScore',
    JSON.stringify({
      plyCounter: plyCounter,
      cpuCounter: cpuCounter,
    })
  );
}

/**
 * Creates a delay for a specified duration.
 * @param {number} ms - The number of milliseconds to delay.
 * @returns {Promise<void>}
 */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Toggles background music on or off.
 * Controls the background music playback and updates UI accordingly.
 */
function bgMusic() {
  const bgMusicAudioTag = document.getElementById('musicSelector');
  if (isMusicOn === true) {
    bkMusic.pause();
    bkMusic.currentTime = 0;
    isMusicOn = false;
    bgMusicAudioTag.innerText = 'Turn Music ON 🔈';
    bgMusicAudioTag.setAttribute(
      'class',
      'w-50 text-muted text-end poppins-extralight'
    );
  } else {
    bkMusic.play();
    isMusicOn = true;
    bgMusicAudioTag.innerText = 'Turn Music OFF 🔊';
    bgMusicAudioTag.setAttribute(
      'class',
      'w-50 text-end poppins-extralight'
    );
  }
}

/**
 * Retrieves the saved match scores from localStorage.
 * Updates the UI with the previous player and CPU scores.
 */
function retrieveMatchScores() {
  const prevScore = JSON.parse(localStorage.getItem('prevScore'));
  plyCounter = prevScore.plyCounter;
  cpuCounter = prevScore.cpuCounter;
  playerScore.innerText = `Player: ${plyCounter}`;
  computerScore.innerText = `Computer: ${cpuCounter}`;
}

// Check if 'prevScore' exists in localStorage and update UI accordingly
if (localStorage.getItem('prevScore')) {
  // Confirm if user wants to resume previous match scores
  toast.show();
} else {
  // Initialize 'prevScore' with plyCounter and cpuCounter set to 0
  const prevScore = {
    plyCounter: 0,
    cpuCounter: 0,
  };
  localStorage.setItem('prevScore', JSON.stringify(prevScore));
}
