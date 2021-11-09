// global variables, functions and constants
const globals = {
    time: Date.now(),
    deltaTime: 0,
    pointerX: 0,
    pointerY: 0,
    isPointerDown: false,
    lastPointerDownX: 0,
    lastPointerDownY: 0,
    prompt: (info) => window.alert(info),
    // keyStates: []
};
const root = document.getElementById('root');
const GUI = document.getElementById('GUI');
const gameObjects = [];
gameObjects.remove = (obj) => {
    for (let i = 0; i < gameObjects.length; ++i) {
        if (gameObjects[i] === obj) {
            gameObjects.splice(i, 1);
        }
    }
};


// expose global variable for debugging
window.globals = globals;
window.gameObjects = gameObjects;
window.root = root;
window.GUI = GUI;


// global events
document.body.addEventListener('pointermove', (e) => {
    globals.pointerX = e.clientX;
    globals.pointerY = e.clientY;
});

document.body.addEventListener('pointerdown', (e) => {
    globals.isPointerDown = true;
    globals.lastPointerDownX = e.clientX;
    globals.lastPointerDownY = e.clientY;
});

document.body.addEventListener('pointerup', (e) => {
    globals.isPointerDown = false;
});


export { globals, root, GUI, gameObjects };
