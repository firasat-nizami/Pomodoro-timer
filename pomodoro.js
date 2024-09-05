// pomodoro.js
let timerInterval;
let workTime = 1500000; // 25 minutes in milliseconds
let breakTime = 300000; // 5 minutes in milliseconds
let currentTime = workTime;
let isRunning = false;
let isWorkSession = true;

document
  .getElementById("start-button")
  .addEventListener("click", startTimer);
document
  .getElementById("stop-button")
  .addEventListener("click", stopTimer);
document
  .getElementById("reset-button")
  .addEventListener("click", resetTimer);

document
  .getElementById("increase-work")
  .addEventListener("click", increaseWorkTime);
document
  .getElementById("decrease-work")
  .addEventListener("click", decreaseWorkTime);
document
  .getElementById("increase-break")
  .addEventListener("click", increaseBreakTime);
document
  .getElementById("decrease-break")
  .addEventListener("click", decreaseBreakTime);

function startTimer() {
  if (!isRunning) {
    timerInterval = setInterval(updateTimer, 1000);
    isRunning = true;
    document.getElementById("start-button").disabled = true;
    document.getElementById("stop-button").disabled = false;
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;
  document.getElementById("start-button").disabled = false;
  document.getElementById("stop-button").disabled = true;
}

function resetTimer() {
  stopTimer();
  currentTime = workTime;
  isWorkSession = true;
  updateDisplay();
}

function updateTimer() {
  currentTime -= 1000; // Decrease by 1 second

  if (currentTime <= 0) {
    currentTime = isWorkSession ? breakTime : workTime;
    isWorkSession = !isWorkSession;
  }

  updateDisplay();
}

function updateDisplay() {
  const display = document.getElementById("timer-display");
  const minutes = Math.floor(currentTime / 60000);
  const seconds = Math.floor((currentTime % 60000) / 1000);

  display.textContent = `${padZero(minutes)}:${padZero(seconds)}`;

  document.getElementById("session-type").textContent = isWorkSession
    ? "Work Session"
    : "Break Time";
}

function padZero(time) {
  return time.toString().padStart(2, "0");
}

function increaseWorkTime() {
  let workInput = document.getElementById("work-time");
  let newWorkTime = parseInt(workInput.value) + 1;
  workInput.value = newWorkTime;
  updateWorkTime(newWorkTime);
}

function decreaseWorkTime() {
  let workInput = document.getElementById("work-time");
  let newWorkTime = Math.max(1, parseInt(workInput.value) - 1);
  workInput.value = newWorkTime;
  updateWorkTime(newWorkTime);
}

function increaseBreakTime() {
  let breakInput = document.getElementById("break-time");
  let newBreakTime = parseInt(breakInput.value) + 1;
  breakInput.value = newBreakTime;
  updateBreakTime(newBreakTime);
}

function decreaseBreakTime() {
  let breakInput = document.getElementById("break-time");
  let newBreakTime = Math.max(1, parseInt(breakInput.value) - 1);
  breakInput.value = newBreakTime;
  updateBreakTime(newBreakTime);
}

function updateWorkTime(minutes) {
  workTime = minutes * 60000;
  if (!isWorkSession) {
    currentTime = workTime;
    updateDisplay();
  }
}

function updateBreakTime(minutes) {
  breakTime = minutes * 60000;
  if (isWorkSession) {
    currentTime = breakTime;
    updateDisplay();
  }
}