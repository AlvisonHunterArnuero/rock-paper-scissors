let plyCounter = 0;
let cpuCounter = 0;
let isMusicOn = false;

function play(playerChoice) {
  clickSound.play();
  const choices = ['rock', 'paper', 'scissors'];
  const responses = {
    rock: '✊',
    paper: '🖐️',
    scissors: '✌️',
  };
  const computerChoice =
    choices[Math.floor(Math.random() * choices.length)];

  document.getElementById(
    'player'
  ).innerText = `${responses[playerChoice]}`;
  document.getElementById(
    'computer'
  ).innerText = `${responses[computerChoice]}`;

  if (playerChoice === computerChoice) {
    document.getElementById('result').innerText = "It's a draw! 😌";
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    document.getElementById('result').innerText = 'You win! 😄';
    plyCounter += 1;
    document.getElementById(
      'playerScore'
    ).innerText = `Points: ${plyCounter}`;
    winSound.play();
  } else {
    document.getElementById('result').innerText = 'You lose! 😢';
    cpuCounter += 1;
    document.getElementById(
      'computerScore'
    ).innerText = `Points: ${cpuCounter}`;
    loseSound.play();
  }
}

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
