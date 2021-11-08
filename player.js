import { globals, root, gameObjects, GameObject } from './game.js';
import grid from './grid.js';

class Player extends GameObject {
    constructor(props) {
        super(props);
        // init variables
        this.state = 'free';
        this.isWalking = false;
        this.walkingTargetX = 0;
        this.walkingTargetY = 0;

        // init dom element
        this.domElement.classList.add('player');
        
        // init event bindings
        this.handleGridClick = this.handleGridClick.bind(this);
        root.addEventListener('gridclick', this.handleGridClick);
    }

    destory() {
        super.destory();
        document.body.removeEventListener('gridclick', this.handleGridClick);
    }

    handleGridClick(e) {
        if (this.state === 'free') {
            this.walkTo(e.detail.clientX, e.detail.clientY);
        }
    }

    walkTo(x, y) {
        this.isWalking = true;

        this.walkingStartX = this.x;
        this.walkingStartY = this.y;

        this.walkingTargetX = x;
        this.walkingTargetY = y;

        this.walkingDeltaTime = globals.deltaTime;
        this.walkingEndTime = this.distanceTo(this.walkingTargetX, this.walkingTargetY) / 100 * 500;

        this.texture.classList.add('walking');
    }

    freeze() {
        this.state = 'freeze';
    }

    free() {
        this.state = 'free';
    }

    update() {
        if (this.isWalking) {
            this.walkingDeltaTime += globals.deltaTime;
            if (this.walkingDeltaTime >= this.walkingEndTime) {
                this.isWalking = false;
                this.texture.classList.remove('walking');
                this.x = this.walkingTargetX;
                this.y = this.walkingTargetY;
                this.setPosition(this.x, this.y, 100, -90, 0, 0);
            } else {
                let fraction = this.walkingDeltaTime / this.walkingEndTime;
                this.x = (1 - fraction) * this.walkingStartX + fraction * this.walkingTargetX;
                this.y = (1 - fraction) * this.walkingStartY + fraction * this.walkingTargetY;
                this.setPosition(this.x, this.y, 100, -90, 0, 0);
            }
        }
    }
}


export default Player;