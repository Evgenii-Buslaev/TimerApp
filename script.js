const clock = document.querySelector(".clock-numbers");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const loopBtn = document.querySelector(".loop-btn");
const resetBtn = document.querySelector(".restart-btn");
const btnsContainer = document.querySelector(".buttons");
const loopContainer = document.querySelector(".loop-container");
const contolPanel = document.querySelector(".control-panel");

//cathing running timer to this variable
let runningInterval;

// functions of timer
function startTimer(ms, sec, min) {
  if (runningInterval) {
    alert("Click 'reset' to start a new timer");
    return;
  }
  if (startBtn.innerText === "Continue") {
    startBtn.innerText = "Start";
  }
  runningInterval = setInterval(() => {
    // timer calculations
    clock.innerText = `${min}:${sec}:${ms}`;
    ms++;
    if (ms == 80) {
      sec++;
      ms = 0;
    }
    if (sec == 60) {
      min++;
      sec = 0;
    }
    if (min == 60) {
      min = 0;
    }
    // timer display
    if (ms.toString().length < 2) {
      ms = "0" + ms;
    }
    if (ms.toString().length > 2) {
      ms.toFixed(2);
    }
    if (sec.toString().length < 2) {
      sec = "0" + sec;
    }
    if (min.toString().length < 2) {
      min = "0" + min;
    }
  }, 12.5);
}

function stopTimer() {
  if (runningInterval) {
    clearInterval(runningInterval);
    runningInterval = null;
  }
  if (clock.innerText != "00:00:00") {
    startBtn.innerText = "Continue";
  }
}

function takeLoop() {
  if (!runningInterval) {
    alert("No timers are running!");
  } else {
    let loopNodeList = document.querySelectorAll(".loop");

    if (loopNodeList.length > 4) {
      loopContainer.removeChild(loopContainer.firstChild);
      loopNodeList[1].style.opacity = "0.3";
    }

    let loop = document.createElement("div");
    loop.classList.add("loop");
    loop.innerText = clock.innerText;
    loopContainer.appendChild(loop);
    /*  loop.style.opacity = "0.3"; */
  }
}

function resetTimer() {
  if (runningInterval) {
    stopTimer();
    startTimer(0, 0, 0);
  } else {
    clock.innerText = "00:00:00";
    startBtn.innerText = "Start";
  }
}

// events
startBtn.addEventListener("click", () => {
  let takenNumber = clock.innerText;
  let continueTime = takenNumber.split(":");
  let ms = continueTime[2];
  let sec = continueTime[1];
  let min = continueTime[0];

  startTimer(ms, sec, min);
});

stopBtn.addEventListener("click", stopTimer);
loopBtn.addEventListener("click", takeLoop);
resetBtn.addEventListener("click", resetTimer);

// animation functions
