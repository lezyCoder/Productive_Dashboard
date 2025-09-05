function openFeatures() {
  var allElems = document.querySelectorAll(".elem");
  var fullElemPage = document.querySelectorAll(".fullElem");
  var fullElemPageBackBtn = document.querySelectorAll(".fullElem .back");

  allElems.forEach((elem) => {
    elem.addEventListener("click", () => {
      fullElemPage[elem.id].style.display = "block";
    });
  });

  fullElemPageBackBtn.forEach((back) => {
    back.addEventListener("click", () => {
      fullElemPage[back.id].style.display = "none";
    });
  });
}
openFeatures();
//Open Features

// Todo Page Events
function todoList() {
  const form = document.querySelector(".addTask form");
  const input = document.querySelector(".addTask form input");
  const taskDetailsInput = document.querySelector(".addTask form textarea");
  const taskCheckbox = document.querySelector(".addTask form #check");
  const allTask = document.querySelector(".allTask");

  // Always start with an array
  let currentTask = JSON.parse(localStorage.getItem("currentTask")) || [];

  // Rendering the task
  function renderTask() {
    let sum = "";
    currentTask.forEach((elem, idx) => {
      sum += `
      <div class="task">
         <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
        <button type="button" id= ${idx}>Mark as Complete</button>
      </div>`;
    });
    allTask.innerHTML = sum;

    // Marking the task as completed

    let markCompletedButton = document.querySelectorAll(".task button");

    markCompletedButton.forEach((btn) => {
      btn.addEventListener("click", () => {
        currentTask.splice(btn.id, 1);
        renderTask();
      });
    });
  }

  // On form submit
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (input.value.trim()) {
      currentTask.push({
        task: input.value,
        details: taskDetailsInput.value,
        imp: taskCheckbox.checked,
      });

      localStorage.setItem("currentTask", JSON.stringify(currentTask));
      input.value = "";
      taskDetailsInput.value = "";
      taskCheckbox.checked = false;

      renderTask();
    } else {
      alert("Please enter some Task");
    }
  });

  // Show tasks on page load
  renderTask();
}

todoList();

// Daily Planner

function dailyPlanner() {
  let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || {};

  var hours = Array.from({ length: 18 }, (elem, idx) => {
    let startHour = 6 + idx;
    let endHour = 7 + idx;

    // convert to 12-hour format with AM/PM
    const formatHour = (h) => {
      let period = h >= 12 ? "pm" : "am";
      let hour12 = h % 12 === 0 ? 12 : h % 12;
      return `${hour12}:00 ${period}`;
    };

    return `${formatHour(startHour)} - ${formatHour(endHour)}`;
  });

  let wholeDaySum = "";
  hours.forEach((elem, idx) => {
    var savedDataInLocalStorage = dayPlanData[idx] || "";

    wholeDaySum += `
    <div class="day-planner-time">
      <p>${elem}</p>
      <input type="text" placeholder="..." id="${idx}" value="${savedDataInLocalStorage}">
    </div>`;
  });

  document.querySelector(".day-planner").innerHTML = wholeDaySum;

  let dayPlannerInput = document.querySelectorAll(".day-planner input");
  dayPlannerInput.forEach((elem) => {
    elem.addEventListener("input", () => {
      dayPlanData[elem.id] = elem.value; // update the object
      localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
    });
  });
}
dailyPlanner();

// Motivation

function motivationalQuoteContent() {
  async function fetchQuote() {
    let url = "https://api.freeapi.app/api/v1/public/quotes/quote/random";
    let quotes = document.querySelector(".motivation-2 h2");
    let author = document.querySelector(".motivation-3 h2");

    try {
      let response = await fetch(url);
      let quotesData = await response.json();
      // console.log(quotesData);
      quotes.innerHTML = quotesData.data.content;
      author.innerHTML = `~ ${quotesData.data.author}`;
    } catch (err) {
      console.log("Error", err);
    }
  }
  fetchQuote();
}

motivationalQuoteContent();

// Pomodoro Clock

function pomodoroClock() {
  const startBtn = document.getElementById("start");
  const resetBtn = document.getElementById("reset");
  const clock = document.querySelector(".pomodoro-clock h2");
  const shortBreakBtn = document.getElementById("shortBreak");
  const longBreakBtn = document.getElementById("longBreak");
  const pomodoroBtn = document.getElementById("pomodoro");

  let timer = null;
  let minutes = 0;
  let seconds = 0;
  let isPaused = false;

  function updateClock(minute, second) {
    const m = minute.toString().padStart(2, "0");
    const s = second.toString().padStart(2, "0");
    clock.innerHTML = `${m}:${s}`;
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
  }

  // ✅ Reset all buttons before highlighting the selected one
  function setActive(button) {
    [shortBreakBtn, longBreakBtn, pomodoroBtn].forEach((btn) => {
      btn.style.backgroundColor = "";
      btn.style.color = "";
    });

    button.style.backgroundColor = `var(--tri2)`;
    button.style.color = `var(--sec)`;
  }

  function shortBreak() {
    stopTimer();
    minutes = 5;
    seconds = 0;
    isPaused = false;
    startBtn.innerHTML = "Start";
    setActive(shortBreakBtn); // ✅ highlight selected
    updateClock(minutes, seconds);
  }

  function longBreak() {
    stopTimer();
    minutes = 15;
    seconds = 0;
    isPaused = false;
    startBtn.innerHTML = "Start";
    setActive(longBreakBtn);
    updateClock(minutes, seconds);
  }

  function pomodoro() {
    stopTimer();
    minutes = 25;
    seconds = 0;
    isPaused = false;
    startBtn.innerHTML = "Start";
    setActive(pomodoroBtn);
    updateClock(minutes, seconds);
  }

  function startTimer() {
    timer = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        stopTimer();
        startBtn.innerHTML = "Start";
        return;
      }
      if (seconds === 0) {
        seconds = 59;
        minutes--;
      } else {
        seconds--;
      }
      updateClock(minutes, seconds);
    }, 1000);
  }

  startBtn.addEventListener("click", () => {
    if (minutes === 0 && seconds === 0 && !isPaused) return;

    if (timer) {
      stopTimer();
      isPaused = true;
      startBtn.innerHTML = "Resume";
    } else {
      startTimer();
      isPaused = false;
      startBtn.innerHTML = "Pause";
    }
  });

  resetBtn.addEventListener("click", () => {
    stopTimer();
    minutes = 0;
    seconds = 0;
    isPaused = false;
    startBtn.innerHTML = "Start";
    updateClock(minutes, seconds);
    // Optionally remove highlight when reset
    [shortBreakBtn, longBreakBtn, pomodoroBtn].forEach((btn) => {
      btn.style.backgroundColor = "";
      btn.style.color = "";
    });
  });

  shortBreakBtn.addEventListener("click", shortBreak);
  longBreakBtn.addEventListener("click", longBreak);
  pomodoroBtn.addEventListener("click", pomodoro);

  updateClock(minutes, seconds);
}

pomodoroClock();

// Weather api
async function weatherApiCall() {
  const apiKey = "Your Api key ";
  var city = "Mumbai";
  try {
    let response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
    );

    let data = await response.json();
    console.log(data);

    // Set the Location and Country
    document.querySelector(".location").innerText =
      data.location.name + " " + data.location.country;

    // Set the Weather Condition
    document.querySelector(".weather").innerText = data.current.condition.text;

    // Set the temperature and perciptio humidity
    document.querySelector(
      ".temperature"
    ).innerText = `${data.current.temp_c}° C`;
    document.querySelector(
      ".perciption"
    ).innerText = `Perciption :  ${data.current.precip_in}`;
    document.querySelector(
      ".humidity"
    ).innerText = `Humidity: ${data.current.humidity}`;
    document.querySelector(".time").innerText = data.location.localtime;
    document.querySelector(
      ".wind"
    ).innerText = `Wind: ${data.current.wind_kph} kph`;
  } catch (err) {
    console.log("Error : ", err);
  }
}
// Call once on page load
weatherApiCall();

// Change theme

function themeChanger() {
  const rootElement = document.documentElement;
  const theme = document.querySelector(".theme ");

  const isDark = false;

  theme.addEventListener("click", () => {
    // --sec: #2c3639;
    // --pri: #3f4e4f;
    // --tri1: #a27b5c;
    // --tri2: #dcd7c9;
    // For Dark theme
    if (!isDark) {
      rootElement.style.setProperty("--pri", "#183D3D");
      rootElement.style.setProperty("--tri2", "#A27B5C");
      rootElement.style.setProperty("--tri1", "#210F37");
      rootElement.style.setProperty("--sec", "#1E3E62");
    }
    else{
      return;
    }
  });
}

themeChanger();
