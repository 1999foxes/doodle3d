import { globals, root, gameObjects, GameObject } from './game.js';

const width = 10, height = 10;
const grid = document.createElement('table');
grid.classList.add('grid');
for (let i = 0; i < height; ++i) {
    const row = document.createElement('tr');
    for (let j = 0; j < width; ++j) {
        const cell = document.createElement('td');
        row.appendChild(cell);
        cell.onclick = () => {
            console.log(i, j);
            const e = new CustomEvent('gridclick', {
                detail: {
                    x: j,
                    y: i,
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
    grid.appendChild(row);
}
root.appendChild(grid);

export default grid;
