import { globals, root, gameObjects, GameObject } from './game.js';
import Paint from './paint.js';

class Player extends GameObject {
    constructor(textureUrl='./empty.png') {
        super();
        // init variables
        this.state = 'freeze';
        this.isWalking = false;
        this.walkingTargetX = 0;
        this.walkingTargetY = 0;

        // init dom element
        this.domElement = document.createElement('div');
        this.domElement.classList.add('gameObject');
        this.domElement.classList.add('player');
        this.domElement.innerHTML = '<img class="texture" src="' + textureUrl + '" alt=""></img>';
        this.texture = this.domElement.querySelector('.texture');
        root.appendChild(this.domElement);
        
        // init event bindings
        this.handlePointerDown = this.handlePointerDown.bind(this);
        root.addEventListener('pointerdown', this.handlePointerDown);
        this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        root.addEventListener('transitionend', this.handleTransitionEnd);

        // this.promptPaintTexture();
    }

    destory() {
        super.destory();
        root.removeEventListener('pointerdown', this.handlePointerDown);
        root.removeEventListener('transitionend', this.handleTransitionEnd);
    }

    handlePointerDown(e) {
        if (this.state === 'free') {
            const {width, height} = this.domElement.getBoundingClientRect();
            this.walkTo(e.clientX - width / 2, e.clientY - height);
        }
    }

    handleTransitionEnd(e) {
        // toggle animation
        if (this.isWalking) {
            if (almostEqual(this.walkingTargetX, this.domElement.offsetLeft) && almostEqual(this.walkingTargetY, this.domElement.offsetTop)) {
                this.isWalking = false;
                this.domElement.classList.remove('walking');
            }
        }
    }

    handleChangeTexture(url) {
        if (this.texture !== undefined) {
            this.domElement.removeChild(this.texture);
            this.texture = undefined;
        }
        
        const newImg = document.createElement('img');
        newImg.onload = function() {
            URL.revokeObjectURL(url);
        };
        newImg.src = url;
        this.domElement.appendChild(newImg);
        this.texture = newImg;
        this.free();
    }

    promptPaintTexture() {
        globals.prompt('draw a stick man');
        this.freeze();
        const paint = new Paint(this.texture, this.handleChangeTexture.bind(this));
        paint.setStyle({
            left: '' + this.domElement.getBoundingClientRect().left + 'px',
            top: '' + this.domElement.getBoundingClientRect().top + 'px',
        });
        this.domElement.removeChild(this.texture);
        this.texture = undefined;
    }

    walkTo(x, y) {
        this.isWalking = true;
        this.walkingTargetX = x;
        this.walkingTargetY = y;

        this.domElement.classList.add('walking');
        const speed = 100;
        const currentX = this.domElement.offsetLeft;
        const currentY = this.domElement.offsetTop;
        this.setStyle({
            ['transition-duration']: (((currentX - x) ** 2 + (currentY - y) ** 2) ** 0.5) / speed + 's',
            left: '' + x + 'px',
            top: '' + y + 'px',
        });
    }

    freeze() {
        this.state = 'freeze';
    }

    free() {
        this.state = 'free';
    }
}


function almostEqual(a, b) {
    return (Math.abs(a - b) < 1);
}


export default Player;