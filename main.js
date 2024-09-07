// Game Options for both player or CPU
const choices = ['rock', 'paper', 'scissors'];

// Responses passed to Emojies to display it on screen
const rules = {
  rock: '✊',
  paper: '🖐️',
  scissors: '✌️',
};

// Counters initiation
let plyCounter = 0;
let cpuCounter = 0;

// Set background music to false on start
let isMusicOn = false;

// Set instances of all elements involved on the game
const player = document.getElementById('player');
const computer = document.getElementById('computer');
const result = document.getElementById('result');
const playerScore = document.getElementById('playerScore');
const computerScore = document.getElementById('computerScore');
const plyDisplay = document.getElementById('plyDisplay');
const cpuDisplay = document.getElementById('cpuDisplay');

// Toast section
const toastLiveExample = document.getElementById('liveToast');
const toast = new bootstrap.Toast(toastLiveExample);

// Function to get a random choice from the choice array
function getRndChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}
// Main function to be executed on every click event of the 3 options
async function play(playerChoice) {
  // Play the click sound and wait for it to finish
  await clickSound.play();

  // Get the random choice for CPU
  const computerChoice = await getRndChoice();

  // Set both player and CPU with their chosen options
  plyDisplay.src = `animations/ply_${playerChoice}.gif`;
  cpuDisplay.src = `animations/ply_${computerChoice}.gif`;

  await delay(1000); // Delay for 1 second, adjust this time as necessary

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

  // Save the current scores on the local Storage key
  localStorage.setItem(
    'prevScore',
    JSON.stringify({
      plyCounter: plyCounter,
      cpuCounter: cpuCounter,
    })
  );
}

// Helper function to simulate a delay (for animations or game effects)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// This function is to control background music with a toggle button
function bgMusic() {
  const bgMusicAudioTag = document.getElementById('musicSelector');
  if (isMusicOn === true) {
    bkMusic.pause();
    bkMusic.currentTime = 0;
    isMusicOn = false;
    bgMusicAudioTag.innerText = 'Turn Music ON 🔈';
    // Set class attributes to simulate toggling
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

// Retrieve the content of 'prevScore' from localStorage
function retrieveMatchScores() {
  const prevScore = JSON.parse(localStorage.getItem('prevScore'));
  plyCounter = prevScore.plyCounter;
  cpuCounter = prevScore.cpuCounter;
  playerScore.innerText = `Player: ${plyCounter}`;
  computerScore.innerText = `Computer: ${cpuCounter}`;
}

// Check if 'prevScore' exists in localStorage
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
