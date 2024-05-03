import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('scene'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.82, 0),
});


const groundBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
  material: new CANNON.Material('ground')
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);


const controls = new OrbitControls(camera, renderer.domElement)

const cannonDebugger = new CannonDebugger(scene, world)


camera.position.set(0, 2, 5);
const animate = () => {
  requestAnimationFrame(animate);
  controls.update();
  cannonDebugger.update();
  renderer.render(scene, camera);
}

animate();

window.onresize = () => {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}