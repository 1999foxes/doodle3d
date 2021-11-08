import { globals, root, gameObjects, GameObject } from './game.js';


class Grid {
    constructor(width = 20, height = 20) {
        this.width = width;
        this.height = height;

        this.domElement = document.createElement('table');
        this.domElement.classList.add('grid');
        for (let i = 0; i < height; ++i) {
            const row = document.createElement('tr');
            for (let j = 0; j < width; ++j) {
                const cell = document.createElement('td');
                row.appendChild(cell);
                cell.onclick = () => {
                    const e = new CustomEvent('gridclick', {
                        detail: {
                            gridX: j,
                            gridY: i,
                            clientX: this.gridX2ClientX(j),
                            clientY: this.gridY2ClientY(i),
                            width,
                            height,
                        },
                        bubbles: true,
                        cancelable: true,
                        composed: false,
                    });
                    root.dispatchEvent(e);
                };
            }
            this.domElement.appendChild(row);
        }
        root.appendChild(this.domElement);
    }

    gridX2ClientX(gridX) {
        return gridX * window.innerWidth / grid.width;
    }

    gridY2ClientY(gridY) {
        return gridY * window.innerHeight / grid.height;
    }
}

const grid = new Grid();    // singleton

export default grid;
