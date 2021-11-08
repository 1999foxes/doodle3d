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
window.root = root;


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


// base class for all game objects
class GameObject {
    constructor({textureUrl, x=0, y=0}) {
        gameObjects.push(this);

        this.domElement = document.createElement('div');
        this.domElement.classList.add('gameObject');
        if (textureUrl) {
            this.domElement.innerHTML = '<img class="texture" src="' + textureUrl + '" alt=""></img>';
            this.texture = this.domElement.querySelector('.texture');
        }
        root.appendChild(this.domElement);

        this.x = x;
        this.y = y;
        this.setPosition(this.x, this.y, 100, -90, 0, 0);
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
    
    setPosition(x=0, y=0, z=0, rx=0, ry=0, rz=0) {
        this.setStyle({
            transform: `translateX(${Math.floor(x)}px) translateY(${Math.floor(y)}px) translateZ(${Math.floor(z)}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
        });
    }
    
    distance(x1, y1, x2, y2) {
        return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
    }

    distanceTo(x, y) {
        return this.distance(this.x, this.y, x, y);
    }
}


export { globals, root, gameObjects, GameObject };
