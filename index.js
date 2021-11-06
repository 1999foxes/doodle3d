import {root, gameObjects} from './game.js';
import Player from './player.js';
import Paint from './paint.js';


import * as THREE from './three.module.js';

const clock = new THREE.Clock();

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
// root.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(0, 0, 5);


window.onresize = function () {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

};

// let p = new Player();
// p.setStyle({
//     left: '100px',
//     top: '100px',
// });
// p.texture.onload = p.promptPaintTexture.bind(p);
// p = null;

let p = new Player('./player.png');
p.setStyle({
    transform: 'translateZ(100px) translateX(100px) translateY(100px)',
});
window.p = p;


const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );


// render function, should be called in main
function animate() {
    requestAnimationFrame(animate);

    // update global variables
    globals.deltaTime = clock.getDelta();
    globals.time = clock.getElapsedTime();
    
    // update game objects
    for (const gameObject of gameObjects) {
        gameObject.update();
    }
    
    // control

    // render
    renderer.render(scene, camera);
}

animate();
