import * as THREE from 'three';
import { getGLTFLoader } from '../../utils/gltfLoader';
import { getTextureLoader } from '../../utils/textureLoader';

import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { StateMachine } from '../../utils/stateMachine';
import { Movement } from '../controls/movement';
import { Input } from '../controls/input';
import { getClock } from '../../utils/clock';
import { ThirdPersonCamera } from '../controls/thirdPersonCamera';

export class Player {

  constructor(scene, camera) {
    this.scene = scene
    this.clock = getClock()
    this.camera = camera
    this._init()
  }

  _init() {

    const gltfLoader = getGLTFLoader()
    const textureLoader = getTextureLoader()

    // Load Model
    const playerModel = gltfLoader.load('/models/Player.glb', (model) => {

        // Get Model Children
        const mesh = model.scene.children[0]
        const clothing = mesh.children[0]
        const hair = mesh.children[1]
        const skin = mesh.children[2]
        const armature = mesh.children[3]

        // Base Materials
        hair.material = new THREE.MeshStandardMaterial({
          roughness: 5,
          flatShading: false,
        })

        // Init Materials
        clothing.material = new THREE.MeshStandardMaterial({
          roughness: 5,
          flatShading: false,
        })

        // Update Skin Material
        skin.material = new THREE.MeshStandardMaterial({
          roughness: 5,
          flatShading: false,
          transparent: true
        })

        // Hair Color Map
        const hairColor = textureLoader.load('/textures/player/Ch08_1003_Diffuse.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
        })

        // Hair Normal Map
        const hairNormal = textureLoader.load('/textures/player/Ch08_1003_Normal.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
        })

        // Update Hair Material
        hair.material.map = hairColor
        hair.material.normalMap = hairNormal

        // Clothing Color Map
        const clothingColor = textureLoader.load('/textures/player/Ch08_1002_Diffuse.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
        })

        // Clothing ARM Map
        const clothingARM = textureLoader.load('/textures/player/Ch08_1002_Diffuse.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
        })

        // Clothing Normal Map
        const clothingNormal = textureLoader.load('/textures/player/Ch08_1001_Normal.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
        })

        // Update Clothing Materials
        clothing.material.map = clothingColor
        clothing.material.normalMap = clothingNormal

        // Skin Color Map
        const skinColor = textureLoader.load('/textures/player/Ch08_1001_Diffuse.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
        })

        // Skin Normal Map
        const skinNormal = textureLoader.load('/textures/player/Ch08_1001_Normal.png', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
        })

        // Update Skin Material
        skin.material.map = skinColor
        skin.material.normalMap = skinNormal

        mesh.position.set(0, 0, 0)
        this.mesh = mesh

        // Setup Controls
        this.input = new Input(this)

        // Init State Machine
        this.movement = new Movement(this.mesh, this.input)
        this.stateMachine = new StateMachine(armature, this.movement)

        // Setup Camera
        this.thirdPersonCamera = new ThirdPersonCamera(this.camera, this.mesh, this.input)

        this.scene.add(mesh)

        // Render Loop
        const animate = () => {
          this.thirdPersonCamera.update()
          this.movement.update()
          requestAnimationFrame(animate)
        }
        animate()

      return model

    })
  }
  



}