import * as THREE from 'three';
import { initControls } from './global/controls';
import { initRenderer } from './global/renderer';
import { initCamera } from './global/camera';
import { initScene } from './global/scene';

import { Player } from './components/player/player';
import { Input } from './components/controls/input';
import { Alien } from './components/alien/alien';

import '/style.css'
import { initClock } from './utils/clock';

let scene, 
  camera, 
  controls, 
  renderer, 
  container,
  player,
  clock,
  input,
  playerMesh,
  playerAnimation,
  gltfLoader,
  alien,
  alien2

const init = () => {

  // Global Elements
  scene = initScene()
  camera = initCamera()
  renderer = initRenderer(camera)
  // controls = initControls(camera, renderer.domElement)
  clock = initClock()
  // input = initInput()

  // Game Elements
  player = new Player(scene, camera)

  // ALIENS!!!
  alien = new Alien(scene, 2, 0, -2)
  alien2 = new Alien(scene, -2, 0, -2)

  // Add to HTML
  container = document.querySelector('#app')
  container.appendChild( renderer.domElement );
}
init()

const sun = new THREE.PointLight(0xffffff, 1.5)
sun.position.set(0, 2, 1)
sun.castShadow = true
scene.add(sun)

const groundGeometry = new THREE.PlaneGeometry(10, 10, 5, 5)
const groundMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000
})
const ground = new THREE.Mesh(groundGeometry, groundMaterial)
ground.receiveShadow = true
ground.rotateX(- Math.PI / 2)
scene.add(ground)

// Animate
function animate() {

  // Render Loop
	renderer.render( scene, camera );
  requestAnimationFrame( animate );
}
animate();
