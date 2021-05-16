'use strict'
const drawpad = document.querySelector('#drawpad');
const btnReset = document.querySelector('#reset');
let newGrid = "";

class Grid {
    constructor(){
        this.allDivs = undefined;
        this.bgRed = 0;
        this.bgGreen = 0;
        this.bgBlue = 0;
        this.bgColor;
    }
    create(columnsQuantity){
        if(columnsQuantity === undefined){
            columnsQuantity = 16;
        }
        this.delete();
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
        this.allDivs = document.querySelectorAll('.smallDiv');  
        this.addColor();
    }
    addColor() {
        this.allDivs.forEach(div => {
            div.addEventListener('mouseover', (e) => {
    //not finished yet
                console.log(div.style.backgroundColor);
                if (div.style.backgroundColor !== "rgb(255, 255, 255)") {               
                    this.bgRed -= 20;
                    this.bgGreen -= 20;
                    this.bgBlue -= 20;
                    this.bgColor = "rgb(" + this.bgRed + "," + this.bgGreen + "," + this.bgBlue + ")";
                    div.style.backgroundColor = this.bgColor;
                } else {
                    this.bgRed = this.random();
                    this.bgGreen = this.random();
                    this.bgBlue = this.random();
                    this.bgColor = "rgb(" + this.bgRed + "," + this.bgGreen + "," + this.bgBlue + ")";
                    div.style.backgroundColor = this.bgColor;
                }
            })
        });
    }
    delete() {
        if ((this.newGrid === "") || (this.allDivs === undefined)) return;
        this.allDivs.forEach(div => {
            drawpad.removeChild(div);
        });
        this.allDivs = undefined;
    }
    random() {
        let colorValue = Math.floor(Math.random() * 255);
        return colorValue;
    }
}

btnReset.addEventListener('click', () => {
    //grid.delete();
    newGrid = prompt("How Many Columns do you want?");
    newGrid = parseInt(newGrid);
    grid.create(newGrid);
    grid.addColor();
})
let grid = new Grid();
grid.create();

