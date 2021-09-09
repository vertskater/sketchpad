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
  colorChoice.addEventListener("click", (e) => {
    let choice = e.target;
    if (choice.matches(".color-random")) {
      deleteClass();
      choice.classList.add("active");
      colorDivs(randomColor);
    }
    if (choice.matches(".color-red")) {
      deleteClass();
      choice.classList.add("active");
      colorDivs(colorRed);
    }
    if (choice.matches(".color-green")) {
      deleteClass();
      choice.classList.add("active");
      colorDivs(colorGreen);
    }
    if (choice.matches(".color-blue")) {
      deleteClass();
      choice.classList.add("active");
      colorDivs(colorBlue);
    }
  });
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
