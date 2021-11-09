import {root, gameObjects} from './game.js';
import Player from './player.js';
import Paint from './paint.js';
import grid from './grid.js';
import updateControl from './parallaxControl.js';
import gameObjectSelector from './gameObjectSelector.js';
import { GameObject } from './gameObject.js';


let p = new Player({textureUrl: './player.png', x: 2, y: 2});
window.p = p;

setTimeout(() => {
let paint = new Paint({gameObject: p});
window.paint = paint;
}, 1000);


let obj = new GameObject({});

/*
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
*/


// render function, should be called in main
function animate(timeStamp) {
    requestAnimationFrame(animate);

    // // update global variables
    globals.deltaTime = timeStamp - globals.time;
    // if (globals.deltaTime < 100) return;
    globals.time = timeStamp;

    updateControl();
    
    // update game objects
    for (const gameObject of gameObjects) {
        gameObject.update();
    }
    
    // // control
    // cube.rotation.z += 0.01;
    // cube.rotation.y += 0.01;
    // p.setStyle({
    //     transform: matrix2cssTransform(cube.matrixWorld),
    // });

    // // render
    // renderer.render(scene, camera);
}

animate();
