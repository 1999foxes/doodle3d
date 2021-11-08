import { globals, root, gameObjects, GameObject } from './game.js';
import Paint from './paint.js';

class Player extends GameObject {
    constructor(textureUrl='./empty.png') {
        super();
        // init variables
        this.state = 'free';
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
        // document.body.addEventListener('pointerdown', this.handlePointerDown);
        root.addEventListener('gridclick', this.handlePointerDown);
        // this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
        // root.addEventListener('transitionend', this.handleTransitionEnd);

        // this.promptPaintTexture();

        this.x = 0;
        this.y = 0;
        this.setPosition(this.x, this.y, 100, -90, 0, 0);
    }

    destory() {
        super.destory();
        document.body.removeEventListener('pointerdown', this.handlePointerDown);
        // root.removeEventListener('transitionend', this.handleTransitionEnd);
    }

    handlePointerDown(e) {
        console.log(e);
        if (this.state === 'free') {
            // const {width, height} = this.domElement.getBoundingClientRect();
            // this.walkTo(e.clientX - width / 2, e.clientY - height);
            // this.walkTo(e.clientX, e.clientY);
            this.walkTo(e.detail.x * window.innerWidth / e.detail.width, 
                e.detail.y * window.innerHeight / e.detail.height);
            console.log(e.detail.x, e.detail.y, window.innerWidth, window.innerHeight);
        }
    }

    // handleTransitionEnd(e) {
    //     // toggle animation
    //     if (this.isWalking) {
    //         if (almostEqual(this.walkingTargetX, this.domElement.offsetLeft) && almostEqual(this.walkingTargetY, this.domElement.offsetTop)) {
    //             this.isWalking = false;
    //             this.domElement.classList.remove('walking');
    //         }
    //     }
    // }

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
        // this.free();
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

        this.walkingStartX = this.x;
        this.walkingStartY = this.y;

        this.walkingTargetX = x;
        this.walkingTargetY = y;

        this.walkingDeltaTime = globals.deltaTime;
        this.walkingEndTime = distance(this.walkingStartX, this.walkingStartY, 
            this.walkingTargetX, this.walkingTargetY) / 100 * 500;

        this.texture.classList.add('walking');

        // const speed = 100;
        // const currentX = this.domElement.offsetLeft;
        // const currentY = this.domElement.offsetTop;
        // this.setStyle({
        //     ['transition-duration']: (((currentX - x) ** 2 + (currentY - y) ** 2) ** 0.5) / speed + 's',
        //     left: '' + x + 'px',
        //     top: '' + y + 'px',
        // });
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
                // this.setStyle({
                //     left: this.walkingTargetX + 'px',
                //     top: this.walkingTargetY + 'px',
                // })
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
    
    setPosition(x=0, y=0, z=0, rx=0, ry=0, rz=0) {
        this.setStyle({
            transform: `translateX(${Math.floor(x)}px) translateY(${Math.floor(y)}px) translateZ(${Math.floor(z)}px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)`,
        });
    }
}




function almostEqual(a, b) {
    return (Math.abs(a - b) < 1);
}

function distance(x1, y1, x2, y2) {
    return (Math.abs(x1 - x2) + Math.abs(y1 - y2));
}


export default Player;