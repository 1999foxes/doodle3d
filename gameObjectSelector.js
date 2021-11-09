import { globals, root, gameObjects } from './game.js';
import Paint from './paint.js';
import { GameObject } from './gameObject.js';


class GameObjectSelector {      // singleton
    constructor() {
        this.selected = [];
        this.x = undefined;
        this.y = undefined;

        this.domElement = document.createElement('div');
        this.domElement.classList.add('gameObjectSelector');

        this.previews = document.createElement('div');
        this.previews.classList.add('previews');
        this.domElement.appendChild(this.previews);

        this.addGameObjectButton = document.createElement('button');
        this.addGameObjectButton.classList.add('addGameObjectButton');
        this.domElement.appendChild(this.addGameObjectButton);

        document.body.appendChild(this.domElement);

        this.handleGridClick = this.handleGridClick.bind(this);
        root.addEventListener('gridclick', this.handleGridClick);

        this.handlePaintInit = this.handleGridClick.bind(this);

        this.handleAddGameObject = this.handleAddGameObject.bind(this);
        this.addGameObjectButton.onclick = this.handleAddGameObject;
    }

    handleGridClick(e) {
        this.x = e.detail.gridX;
        this.y = e.detail.gridY;
        this.update();
    }

    selectGameObject(x, y) {
        console.log(x, y, gameObjects);
        const result = [];
        for (const go of gameObjects) {
            if (go.x === x && go.y === y) {
                result.push(go);
            }
        }
        return result;
    }

    handlePaintInit(gameObject) {
        if (this.paint !== undefined) {
            this.paint.destroy()
        }
        this.paint = new Paint({gameObject});
    }

    handleAddGameObject() {
        const gameObject = new GameObject({x: this.x, y: this.y});
        this.update();
        this.handlePaintInit(gameObject);
    }

    update() {
        if (this.x === undefined || this.y === undefined) {
            return;
        }
        this.selected = this.selectGameObject(this.x, this.y);
        this.domElement.innerHTML = '';
        for (const go of this.selected) {
            console.log(go);
            const preview = document.createElement('div');
            preview.innerHTML = `
                <img class='preview'></img>
            `;
            preview.onclick = () => this.handlePaintInit(go);
            this.domElement.appendChild(preview);
        }
    }
}

const gameObjectSelector = new GameObjectSelector();

export default gameObjectSelector;