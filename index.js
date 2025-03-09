let timer;
let isRunning = false;
let timeLeft = 0;
let currentMode = 'shortBreak';

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const shortBreakBtn = document.getElementById('shortBreakBtn');
const longBreakBtn = document.getElementById('longBreakBtn');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  
  isRunning = true;
  startBtn.disabled = true;
  pauseBtn.disabled = false;

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      isRunning = false;
      startBtn.disabled = false;
      pauseBtn.disabled = true;
      alert('Time is up!');
      return;
    }
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;

  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  timeLeft = currentMode === 'shortBreak' ? 5 * 60 : 15 * 60; // Default times for short and long break
  timerDisplay.textContent = formatTime(timeLeft);
}

function switchMode(mode) {
  currentMode = mode;
  if (mode === 'shortBreak') {
    timeLeft = 5 * 60; // 5 minutes
  } else if (mode === 'longBreak') {
    timeLeft = 15 * 60; // 15 minutes
  }
  timerDisplay.textContent = formatTime(timeLeft);
  if (!isRunning) {
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

shortBreakBtn.addEventListener('click', () => switchMode('shortBreak'));
longBreakBtn.addEventListener('click', () => switchMode('longBreak'));

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);


switchMode('shortBreak');
