"use strict";
const drawpad = document.getElementById("drawpad");
const btnReset = document.getElementById("reset");
let allDivs;

createGrid(16);

function createGrid(columnsQuantity) {
  deleteGrid();
  let width = 1000 / columnsQuantity - 2;
  let height = width;
  drawpad.style.gridTemplateColumns = "repeat(" + columnsQuantity + ", 1fr)";
  for (let i = 1; i < columnsQuantity + 1; i++) {
    for (let j = 1; j < columnsQuantity + 1; j++) {
      const div = document.createElement("div");
      div.style.cssText =
        "width: " +
        width +
        "px; height: " +
        height +
        "px; border: 1px solid #000000; background-color: #ffffff;";
      div.classList.add("smallDiv");
      drawpad.appendChild(div);
    }
  }
  allDivs = document.querySelectorAll(".smallDiv");
}

function deleteGrid() {
  if (allDivs === undefined) return;
  allDivs.forEach((div) => {
    drawpad.removeChild(div);
  });
  allDivs = undefined;
}

btnReset.addEventListener("click", () => {
  let newGrid = "";
  deleteGrid();
  newGrid = prompt("How many columns do you want?");
  newGrid = parseInt(newGrid);
  if (newGrid > 90) {
    alert("Number must be smaller 90");
    newGrid = parseInt(prompt("How many columns do you want?"));
  }
  createGrid(newGrid);
  addColor();
});

addColor();
function addColor() {
  const rdmColorDiv = document.querySelector(".color-random");
  deleteClass();
  rdmColorDiv.classList.add("active");

  colorDivs(randomColor);
  const colorChoice = document.querySelector(".color-choice");
  const form = document.querySelector(".color-form");
  form.classList.remove("show-form");
  resetFormInput(form);
  colorChoice.addEventListener("click", (e) => {
    let choice = e.target;
    if (choice.matches(".color-random")) {
      deleteClass();
      form.classList.remove("show-form");
      resetFormInput(form);
      choice.classList.add("active");
      colorDivs(randomColor);
    }
    if (choice.matches(".color-red")) {
      deleteClass();
      form.classList.remove("show-form");
      resetFormInput(form);
      choice.classList.add("active");
      colorDivs(colorRed);
    }
    if (choice.matches(".color-green")) {
      deleteClass();
      form.classList.remove("show-form");
      resetFormInput(form);
      choice.classList.add("active");
      colorDivs(colorGreen);
    }
    if (choice.matches(".color-blue")) {
      deleteClass();
      form.classList.remove("show-form");
      resetFormInput(form);
      choice.classList.add("active");
      colorDivs(colorBlue);
    }
    if (choice.matches(".color-user")) {
      deleteClass();
      choice.classList.add("active");
      form.classList.add("show-form");
      const formInput = form.children;
      for (let input of formInput) {
        input.style.height = "50px";
      }
      colorDivs(colorUserGenerated);
    }
  });
}
function resetFormInput(form) {
  const formInput = form.children;
  for (let input of formInput) {
    input.style.height = "0px";
  }
}
function deleteClass() {
  const colorChoices = document.querySelectorAll(".color");
  for (let color of colorChoices) {
    color.classList.remove("active");
  }
}
function colorDivs(operation) {
  allDivs.forEach((div) => {
    div.addEventListener("mouseover", (e) => {
      operation(div);
    });
  });
}

function randomColor(div) {
  let bgRed = randome();
  let bgGreen = randome();
  let bgBlue = randome();
  let bgColor = "rgb(" + bgRed + "," + bgGreen + "," + bgBlue + ")";
  div.style.backgroundColor = bgColor;
}

function randome() {
  let colorValue = Math.floor(Math.random() * 255);
  return colorValue;
}

function colorRed(div) {
  let bgRed = 255;
  let bgGreen = 0;
  let bgBlue = 0;
  let bgColor = "rgb(" + bgRed + "," + bgGreen + "," + bgBlue + ")";
  div.style.backgroundColor = bgColor;
}
function colorGreen(div) {
  let bgRed = 0;
  let bgGreen = 255;
  let bgBlue = 0;
  let bgColor = "rgb(" + bgRed + "," + bgGreen + "," + bgBlue + ")";
  div.style.backgroundColor = bgColor;
}
function colorBlue(div) {
  let bgRed = 0;
  let bgGreen = 0;
  let bgBlue = 255;
  let bgColor = "rgb(" + bgRed + "," + bgGreen + "," + bgBlue + ")";
  div.style.backgroundColor = bgColor;
}
function colorUserGenerated(div) {
  let bgRed = document.querySelector("#input-red").value;
  let bgGreen = document.querySelector("#input-green").value;
  let bgBlue = document.querySelector("#input-blue").value;
  let bgColor = "rgb(" + bgRed + "," + bgGreen + "," + bgBlue + ")";
  div.style.backgroundColor = bgColor;
}
