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


//Open Features 

// Todo Page Events
 function todoList(){
  
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