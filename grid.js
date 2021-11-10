import { globals, root, gameObjects } from './game.js';


class Grid {    // singleton
    constructor(gridWidth = 32, gridHeight = 32, clientWidth = 64, clientHeight = 64) {
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.clientWidth = clientWidth;
        this.clientHeight = clientHeight;

        this.domElement = document.createElement('table');
        this.domElement.classList.add('grid');
        Object.assign(root.style, {
            width: this.clientWidth + 'vh',
            height: this.clientHeight + 'vh',
            left: 'calc(50% - ' + (this.clientWidth / 2 | 0) + 'vh)',
            top: 'calc(50% - ' + (this.clientHeight / 2 | 0) + 'vh)',
        });
        for (let i = 0; i < gridHeight; ++i) {
            const row = document.createElement('tr');
            for (let j = 0; j < gridWidth; ++j) {
                const cell = document.createElement('td');
                row.appendChild(cell);
                cell.onclick = () => {
                    const e = new CustomEvent('gridclick', {
                        detail: {
                            gridX: j,
                            gridY: i,
                            clientX: this.gridX2ClientX(j),
                            clientY: this.gridY2ClientY(i),
                            gridWidth,
                            gridHeight,
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
        return gridX * this.clientWidth / this.gridWidth;
    }

    gridY2ClientY(gridY) {
        return gridY * this.clientHeight / this.gridHeight;
    }

    clientX2GridX(clientX) {
        return clientX * this.gridWidth / this.clientWidth;
    }

    clientY2GridY(clientY) {
        return clientY * this.gridHeight / this.clientHeight;
    }
}

const grid = new Grid();

export default grid;
