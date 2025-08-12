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
