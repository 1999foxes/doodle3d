import {root, gameObjects} from './game.js';
import Player from './player.js';
import Paint from './paint.js';
import grid from './grid.js';


// import * as THREE from './three.module.js';

// const clock = new THREE.Clock();

// const renderer = new THREE.WebGLRenderer();
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.outputEncoding = THREE.sRGBEncoding;
// root.appendChild(renderer.domElement);

// const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x000000);
// const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
// // camera.position.set(0, 0, 0);


// window.onresize = function () {

//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();

//     renderer.setSize( window.innerWidth, window.innerHeight );

// };

// let p = new Player();
// p.setStyle({
//     left: '100px',
//     top: '100px',
// });
// p.texture.onload = p.promptPaintTexture.bind(p);
// p = null;

let p = new Player('./player.png');
// p.setStyle({
//     transform: 'translateZ(100px) translateX(100px) translateY(100px)',
// });
window.p = p;


// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// cube.translateZ(-10);
// cube.translateY(-1);
// scene.add( cube );


// function matrix2cssTransform(matrix) {
//     matrix = matrix.clone();
//     matrix.multiply(new THREE.Matrix4().makeScale(1, -1, 1));

//     let transform =  'matrix3d(';
//     for (let i = 0; i < 15; ++i) {
//         transform += (i % 4 === 0 ? -1 : 1) * matrix.elements[i].toFixed(2) + ', ';
//     }
//     transform += matrix.elements[15].toFixed(2) + ')';
//     return transform;
// }


// render function, should be called in main
function animate(timeStamp) {
    requestAnimationFrame(animate);

    // // update global variables
    globals.deltaTime = timeStamp - globals.time;
    // if (globals.deltaTime < 100) return;
    globals.time = timeStamp;
    
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
