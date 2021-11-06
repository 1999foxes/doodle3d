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
const gameObjects = [];


// expose global variable for debugging
window.globals = globals;
window.gameObjects = gameObjects;


// global events
root.addEventListener('pointermove', (e) => {
    globals.pointerX = e.clientX;
    globals.pointerY = e.clientY;
});

root.addEventListener('pointerdown', (e) => {
    globals.isPointerDown = true;
    globals.lastPointerDownX = e.clientX;
    globals.lastPointerDownY = e.clientY;
});

root.addEventListener('pointerup', (e) => {
    globals.isPointerDown = false;
});


// base class for all game objects
class GameObject {
    constructor() {
        gameObjects.push(this);
    }
    
    destory() {
        if (this.domElement !== undefined) {
            root.removeChild(this.domElement);
        }

        for (let i = 0; i < gameObjects.length; ++i) {
            if (gameObjects[i] === this) {
                gameObjects.splice(i, 1);
            }
        }
    }

    setStyle(style) {
        if (this.domElement && this.domElement.style) {
            Object.assign(this.domElement.style, style);
        }
    }

    update() {
        if (this.domElement && this.object3d) {
            //
        }
    }
}


export { globals, root, gameObjects, GameObject };
