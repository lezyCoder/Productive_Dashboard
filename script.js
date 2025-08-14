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

// Todo Page Events

const form = document.querySelector(".addTask form");
const input = document.querySelector(".addTask form input");
const taskDetailsInput = document.querySelector(".addTask form textarea");
const taskCheckbox = document.querySelector(".addTask form #check");
const allTask = document.querySelector(".allTask");

let currentTask = [
  {
    task: "Mandir Jao",
    details: "Mahadev ke Mandir Jaao",
    imp: true,
  },
  {
    task: "Gym Jao",
    details: " 2 Hours Exercise karo",
    imp: false,
  },
];

//Rendering the task
function renderTask() {
  var sum = "";
  currentTask.forEach((elem) => {
    sum += `
      <div class="task">
        <h5>${elem.task} <span class = ${elem.imp}>imp</span> </h5>
        <button type="button">Mark as Complete</button>
      </div>`;
  });

  allTask.innerHTML = sum;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    currentTask.push({
      task: input.value,
      details: taskDetailsInput.value,
      imp: taskCheckbox.checked,
    });
  } else {
    alert("Please enter some Task");
  }

  // Resetting the values.
  input.value = "";
  taskDetailsInput.value = "";
  taskCheckbox.checked = false;
  renderTask();
});
