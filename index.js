import {root, gameObjects} from './game.js';
import Player from './player.js';
import Paint from './paint.js';
import grid from './grid.js';
import updateControl from './parallaxControl.js';
import gameObjectSelector from './gameObjectSelector.js';
import { GameObject } from './gameObject.js';


let player = new Player({textureUrl: './player.png', x: 2, y: 2});
window.player = player;

const editButton = document.getElementById('edit');
editButton.onclick = toggleEditMode;

globals.isEditMode = false;
hide(gameObjectSelector.domElement);
function toggleEditMode() {
    if (!globals.isEditMode) {
        for (const td of grid.domElement.querySelectorAll('td')) {
            td.classList.add('editable');
        }
        for (const go of gameObjects) {
            go.domElement.classList.add('editable');
        }
        show(gameObjectSelector.domElement);
        player.freeze();
        globals.isEditMode = true;
    } else {
        for (const td of grid.domElement.querySelectorAll('td')) {
            td.classList.remove('editable');
        }
        for (const go of gameObjects) {
            go.domElement.classList.remove('editable');
        }
        hide(gameObjectSelector.domElement);
        player.free();
        globals.isEditMode = false;
    }
}


const themeButton = document.getElementById('theme');
themeButton.onclick = editTheme;
function editTheme() {
    console.log(123);
    new Paint({gameObject: player});
}



function hide(domElement) {
    Object.assign(domElement.style, { display: 'none' });
}
function show(domElement) {
    Object.assign(domElement.style, { display: '' });
}

// render function, should be called in main
function animate(timeStamp) {
    requestAnimationFrame(animate);
    
    globals.deltaTime = timeStamp - globals.time;
    // if (globals.deltaTime < 100) return;
    globals.time = timeStamp;

    updateControl();
    
    // update game objects
    for (const gameObject of gameObjects) {
        gameObject.update();
    }
}

animate();
