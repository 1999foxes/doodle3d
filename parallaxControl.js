import { globals, root, gameObjects } from './game.js';


const limitX = 20, limitY = 10;
let lastPointerX = 0, lastPointerY = 0;

function update() {
    if (globals.pointerX === lastPointerX && globals.pointerY === lastPointerY) {
        return;
    }
    Object.assign(root.style, {
        transform: `translateX(${-globals.pointerX / window.innerWidth * limitX}px) `+
            `translateY(${-globals.pointerY / window.innerHeight * limitY}px)  `+
            `rotateX(60deg)`,
    });
    lastPointerX = globals.pointerX;
    lastPointerY = globals.pointerY;
}

export default update;