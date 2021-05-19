'use strict'
const drawpad = document.getElementById('drawpad');
const btnReset = document.getElementById('reset');
let allDivs;

createGrid(16);

function createGrid(columnsQuantity) {
    deleteGrid();
    let width = (1000 / columnsQuantity) - 2;
    let height = width;
    drawpad.style.gridTemplateColumns = "repeat(" + columnsQuantity + ", 1fr)";
    for (let i = 1; i < (columnsQuantity + 1); i++) {
        for (let j = 1; j < (columnsQuantity + 1); j++) {
            const div = document.createElement('div');
            div.style.cssText = "width: " + width + "px; height: " + height + "px; border: 1px solid #000000; background-color: #ffffff;";
            div.classList.add('smallDiv');
            drawpad.appendChild(div);
        }
    }
    allDivs = document.querySelectorAll('.smallDiv');
}

function deleteGrid() {
    if (allDivs === undefined) return;
    allDivs.forEach(div => {
        drawpad.removeChild(div);
    });
    allDivs = undefined;
}

btnReset.addEventListener('click', () => {
    let newGrid = "";
    deleteGrid();
    newGrid = prompt("How many columns do you want?");
    newGrid = parseInt(newGrid);
    if (newGrid > 90) {
        alert('Number must be smaller 90')
        newGrid = parseInt(prompt("How many columns do you want?"));
    }
    createGrid(newGrid);
    addColor();
})

addColor()
function addColor() {
    let bgRed = 0;
    let bgGreen = 0;
    let bgBlue = 0;
    let bgColor;
    allDivs.forEach(div => {
        div.addEventListener('mouseover', (e) => {
            bgRed = randome();
            bgGreen = randome();
            bgBlue = randome();
            bgColor = "rgb(" + bgRed + "," + bgGreen + "," + bgBlue + ")";
            div.style.backgroundColor = bgColor;
        })
    });
}

function randome() {
    let colorValue = Math.floor(Math.random() * 255);
    return colorValue;
}
