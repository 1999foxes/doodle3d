import { globals, root, gameObjects, GUI } from './game.js';
import grid from './grid.js';

// base class for all game objects
class GameObject {
    constructor({ textureUrl = './empty.png', x = 0, y = 0, size = 'size_4', animation = 'animation_none' }) {
        gameObjects.push(this);

        this.domElement = document.createElement('div');
        this.domElement.classList.add('gameObject');
        if (globals.isEditMode) {
            this.domElement.classList.add('editable');
        }
        this.domElement.innerHTML = '<img class="texture" src="' + textureUrl + '" alt=""></img>';
        this.texture = this.domElement.querySelector('.texture');
        root.appendChild(this.domElement);

        this.x = x;
        this.y = y;

        this.size = size;
        this.domElement.classList.add(this.size);

        this.animation = animation;
        this.texture.classList.add(this.animation);

        this.setPositionOnGrid(this.x, this.y);
    }

    destroy() {
        if (this.domElement !== undefined) {
            root.removeChild(this.domElement);
        }
        gameObjects.remove(this);
    }

    setStyle(style) {
        if (this.domElement && this.domElement.style) {
            Object.assign(this.domElement.style, style);
        }
    }

    setTextureUrl(textureUrl) {
        URL.revokeObjectURL(this.textureUrl);   // revoke the old texture
        this.texture.src = textureUrl;
        this.textureUrl = textureUrl;
    }

    setAnimation(animation) {
        this.texture.classList.replace(this.animation, animation);
        this.animation = animation;
    }

    setSize(size) {
        this.domElement.classList.replace(this.size, size);
        this.size = size;
        if (this.x !== undefined && this.y !== undefined)
            this.setPositionOnGrid(this.x, this.y);
    }

    getGridSize() {
        return 2 ** (sizes.indexOf(this.size) + 2);
    }

    setPositionOnGrid(x = 0, y = 0) {
        this.setPosition(grid.gridX2ClientX(x), grid.gridY2ClientY(y));
    }

    setPosition(clientX = 0, clientY = 0) {
        const half = grid.gridX2ClientX(this.getGridSize()) / 2;
        this.setTransform(clientX,
            clientY - half,
            half,
            -90, 0, 0);
    }

    setTransform(x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
        this.setStyle({
            transform: `translateX(${Math.floor(x)}vh) translateY(${Math.floor(y)}vh) translateZ(${Math.floor(z)}vh) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
        });
    }

    distance(x1, y1, x2, y2) {
        return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
    }

    distanceTo(x, y) {
        return this.distance(this.x, this.y, x, y);
    }

    update() { }
}


class GUIObject {
    constructor() {
        this.domElement = document.createElement('div');
        GUI.appendChild(this.domElement);
        gameObjects.push(this);
    }

    destroy() {
        GUI.removeChild(this.domElement);
        gameObjects.remove(this);
    }

    update() {
        // empty;
    }

    setStyle(style) {
        if (this.domElement && this.domElement.style) {
            Object.assign(this.domElement.style, style);
        }
    }
}


const animations = [
    'animation_none',
    'animation_walk',
    'animation_float',
    'animation_rotate',
];


const sizes = [
    'size_4',
    'size_8',
    'size_16',
    'size_32',
]


export { GameObject, GUIObject, animations, sizes };