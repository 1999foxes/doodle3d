import { globals, root, gameObjects } from './game.js';


const limitX = 3, limitY = 10;
let lastPointerX = 0, lastPointerY = 0;

function update() {
    if (globals.pointerX === lastPointerX && globals.pointerY === lastPointerY) {
        return;
    }
    Object.assign(root.style, {
        transform: 
            `rotateY(${-globals.pointerX / window.innerWidth * limitX + limitX / 2}deg)  `+
            `rotateX(${globals.pointerY / window.innerHeight * limitY + 50}deg)`,
    });
    lastPointerX = globals.pointerX;
    lastPointerY = globals.pointerY;
}

export default update;