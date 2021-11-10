import { globals, root, gameObjects } from './game.js';
import grid from './grid.js';
import {GameObject} from './gameObject.js';

class Player extends GameObject {
    constructor({textureUrl='./player.png', size='size_8', x=0, y=0}) {
        super({textureUrl, size, x, y});
        // init variables
        this.state = 'free';
        this.isWalking = false;
        this.walkingTargetX = 0;
        this.walkingTargetY = 0;
        this.clientX = grid.gridX2ClientX(x);
        this.clientY = grid.gridY2ClientY(y);
        this.x = undefined;
        this.y = undefined;

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

        this.walkingStartX = this.clientX;
        this.walkingStartY = this.clientY;

        this.walkingTargetX = x;
        this.walkingTargetY = y;

        this.walkingDeltaTime = globals.deltaTime;
        this.walkingEndTime = this.distance(this.clientX, this.clientY, this.walkingTargetX, this.walkingTargetY) * 40;

        this.texture.classList.add('animation_walk');
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
                this.texture.classList.remove('animation_walk');
                this.clientX = this.walkingTargetX;
                this.clientY = this.walkingTargetY;
                this.setPosition(this.clientX, this.clientY);
            } else {
                let fraction = this.walkingDeltaTime / this.walkingEndTime;
                this.clientX = (1 - fraction) * this.walkingStartX + fraction * this.walkingTargetX;
                this.clientY = (1 - fraction) * this.walkingStartY + fraction * this.walkingTargetY;
                this.setPosition(this.clientX, this.clientY);
            }
        }
    }
}


export default Player;