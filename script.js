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
    imp: true,
  },
];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  document.querySelector(".allTask");
});
