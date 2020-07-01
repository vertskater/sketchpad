'use strict'
const drawpad = document.getElementById('drawpad');
const btnReset = document.getElementById('reset');
let newGrid = 0;
let bgRed = 0;
let bgGreen = 0;
let bgBlue = 0;
let bgColor;

class Grid {
    constructor() {
        this.allDivs = undefined;
    }

    create(columnsQuantity) {
        this.delete();
        let width = (1000 / columnsQuantity) - 2;
        let height = width;
        drawpad.style.gridTemplateColumns = "repeat(" + columnsQuantity + ", 1fr)";
        for (let i = 1; i < (columnsQuantity + 1); i++) {
            for (let j = 1; j < (columnsQuantity + 1); j++) {
                let div = document.createElement('div');
                div.style.cssText = "width: " + width + "px; height: " + height + "px; border: 1px solid #000000; background-color: #ffffff;";
                div.classList.add('smallDiv');
                drawpad.appendChild(div);
            }
        }
        this.allDivs = document.querySelectorAll('.smallDiv');
    }
    
    addColour() {
        this.allDivs.forEach(div => {
            div.addEventListener('mouseover', (e) => {
    //not finished yet
                console.log(div.style.backgroundColor);
                if (div.style.backgroundColor !== "rgb(255, 255, 255)") {  
                    bgRed -= 20;
                    bgGreen -= 20;
                    bgBlue -= 20;
                } else {
                    bgRed = this.randomiseColour();
                    bgGreen = this.randomiseColour();
                    bgBlue = this.randomiseColour();
                }
                bgColor = "rgb(" + bgRed + "," + bgGreen + "," + bgBlue + ")";
                div.style.backgroundColor = bgColor;
    
            })
        });
    }

    randomiseColour() {
        let colorValue = Math.floor(Math.random() * 255);
        return colorValue;
    }

    delete() {
        if ((this.newGrid === "") || (this.allDivs === undefined)) 
            return;
        this.allDivs.forEach(div => {
            drawpad.removeChild(div);
        });
        this.allDivs = undefined;
    }
}

var grid = new Grid();
grid.create(17);
grid.addColour();

btnReset.addEventListener('click', () => {
    /*allDivs.forEach(div => {
        div.style.backgroundColor = "white";
    });*/
    //grid.delete();
    newGrid = prompt("How Many Columns do you want?");
    newGrid = parseInt(newGrid);
    grid.create(newGrid);
    grid.addColor();
})
addColor()


