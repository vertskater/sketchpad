'use strict';

const drawpad   = document.querySelector('#drawpad');
const btnReset  = document.querySelector('#reset');
const btnRandom = document.querySelector('#randomBtn');
const colorPicker = document.querySelector('#colorPicker');

let useRandom = true;

// ── Mode toggle ──────────────────────────────────────
btnRandom.addEventListener('click', () => {
    useRandom = true;
    btnRandom.classList.add('btn--active');
});

colorPicker.addEventListener('input', () => {
    useRandom = false;
    btnRandom.classList.remove('btn--active');
});

// ── Grid class ───────────────────────────────────────
class Grid {
    constructor() {
        this.allDivs = undefined;
    }

    create(columnsQuantity = 16) {
        this.delete();
        drawpad.style.gridTemplateColumns = `repeat(${columnsQuantity}, 1fr)`;

        for (let i = 0; i < columnsQuantity * columnsQuantity; i++) {
            const div = document.createElement('div');
            div.classList.add('smallDiv');
            drawpad.appendChild(div);
        }

        this.allDivs = document.querySelectorAll('.smallDiv');
        this.bindHover();
    }

    bindHover() {
        this.allDivs.forEach(div => {
            div.addEventListener('mouseover', () => {
                const current = div.style.backgroundColor;
                const isBlank = !current || current === 'rgb(255, 255, 255)';

                if (isBlank) {
                    // First touch → apply chosen / random color
                    div.style.backgroundColor = useRandom
                        ? this.randomColor()
                        : colorPicker.value;
                } else {
                    // Re-hover → gradually darken
                    this.darken(div);
                }
            });
        });
    }

    darken(div) {
        const match = div.style.backgroundColor.match(/\d+/g);
        if (!match) return;
        let [r, g, b] = match.map(Number);
        r = Math.max(0, r - 20);
        g = Math.max(0, g - 20);
        b = Math.max(0, b - 20);
        div.style.backgroundColor = `rgb(${r},${g},${b})`;
    }

    randomColor() {
        const r = Math.floor(Math.random() * 220);
        const g = Math.floor(Math.random() * 220);
        const b = Math.floor(Math.random() * 220);
        return `rgb(${r},${g},${b})`;
    }

    delete() {
        if (!this.allDivs) return;
        this.allDivs.forEach(div => drawpad.removeChild(div));
        this.allDivs = undefined;
    }
}

// ── Init ─────────────────────────────────────────────
const grid = new Grid();
grid.create();

btnReset.addEventListener('click', () => {
    const input = prompt('Wie viele Spalten? (1 – 64)');
    const cols  = parseInt(input);
    if (cols > 0 && cols <= 64) {
        grid.create(cols);
    }
});
