const clock = document.querySelector(".clock-numbers");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const loopBtn = document.querySelector(".loop-btn");
const resetBtn = document.querySelector(".restart-btn");
const btnsContainer = document.querySelector(".buttons");
const loopContainer = document.querySelector(".loop-container");
const contolPanel = document.querySelector(".control-panel");
const loopContainerBtns = document.querySelector(".loop-container-btns");
const arrow = document.querySelector(".arrow-seconds");

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
    arrow.style.transition = `1s`;
    arrow.style.transform = `rotate(${6 * sec}deg)`;
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

// function to stop timer
function stopTimer() {
  if (runningInterval) {
    clearInterval(runningInterval);
    runningInterval = null;
  }
  if (clock.innerText != "00:00:00") {
    startBtn.innerText = "Continue";
  }
}

// catching element of loop (for event)
let elem;
let rclBinBtn;
let clearBtn;

//put a loop function
function takeLoop() {
  if (!runningInterval) {
    alert("No timers are running!");
  } else {
    // if there are some loops
    let loopNodeList = document.querySelectorAll(".loop");

    if (loopNodeList.length >= 5) {
      setTimeout(() => {
        loop.scrollIntoView({
          behavior: "smooth",
        });
      }, 0);
    }
    // creating a loop
    let loop = document.createElement("div");
    loop.classList.add("loop");
    loop.innerText = clock.innerText;
    loopContainer.appendChild(loop);
    elem = loop;
    // creatong a loop delete button
    if (!clearBtn) {
      clearBtn = document.createElement("div");
      let clearIcon = document.createElement("img");
      clearIcon.setAttribute("src", "Icons/ClearBtn.png");
      clearIcon.style.width = "2rem";
      clearIcon.style.height = "2rem";
      clearBtn.style.marginTop = "7rem";
      clearBtn.appendChild(clearIcon);
      loopContainer.style.marginLeft = "2rem";
      loopContainerBtns.append(clearBtn);

      clearBtn.addEventListener("click", () => {
        let loopNodeList = document.querySelectorAll(".loop");
        let lastLoop = loopNodeList[loopNodeList.length - 1];
        lastLoop.style.opacity = "0";
        lastLoop.style.marginTop = "-2.3rem";
        setTimeout(() => {
          lastLoop.parentNode.removeChild(lastLoop);
        }, 1000);
      });
    }
    // creatong a recycle bin
    if (!rclBinBtn) {
      rclBinBtn = document.createElement("div");
      let rclIcon = document.createElement("img");
      rclIcon.setAttribute("src", "Icons/RecycleBin.png");
      rclIcon.style.width = "2rem";
      rclIcon.style.height = "2rem";
      rclBinBtn.style.marginTop = "7rem";
      rclBinBtn.appendChild(rclIcon);
      loopContainer.style.marginLeft = "2rem";
      loopContainerBtns.append(rclBinBtn);

      rclBinBtn.addEventListener("click", () => {
        let loopNodeList = document.querySelectorAll(".loop");
        for (let i = 0; i < loopNodeList.length; i++) {
          loopNodeList[i].parentNode.removeChild(loopNodeList[i]);
        }

        clearBtn.remove();
        rclBinBtn.remove();
        clearBtn = null;
        rclBinBtn = null;
      });
    }
  }
}

function resetTimer() {
  if (runningInterval) {
    stopTimer();
    startTimer(0, 0, 0);
  } else {
    arrow.style.transform = `rotate(+0deg)`;
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

loopBtn.addEventListener("click", () => {
  takeLoop();
  setTimeout(() => {
    elem.style.opacity = "1";
    elem.style.top = "5px";
  }, 0);
});

resetBtn.addEventListener("click", resetTimer);
