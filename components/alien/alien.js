import * as THREE from 'three';
import { getGLTFLoader } from '../../utils/gltfLoader';
import { getTextureLoader } from '../../utils/textureLoader';

export class Alien {

  static loadedModel = null

  constructor(scene, posX, posY, posZ) {
    this.animState = 0
    this.clock = new THREE.Clock()
    this.instantiate(scene, posX, posY, posZ)
  }

  async instantiate(scene, posX, posY, posZ) {

    const gltfLoader = getGLTFLoader()

    // Use Instanced Mesh
    if (Alien.loadedModel) {
      const mesh = Alien.loadedModel.clone()
      mesh.position.set(posX, posY, posZ)
      scene.add(mesh)
      return mesh
    }

    // Initial Mesh Load
    await gltfLoader.load('/models/Alien.glb', (model) => {


      const loadedModel = model.scene.children[0]
      loadedModel.position.set(posX, posY, posZ)
      Alien.loadedModel = loadedModel

      const mesh = loadedModel.children[0]
      const armature = loadedModel.children[1]
      const material = mesh.material

      // Load Textures
      let colorMap, normalMap, armMap
      const textureLoader = getTextureLoader()

      // Color Map
      if (!this.colorMap) {
        colorMap = textureLoader.load('/textures/alien/Alien_Albedo.jpg', (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace
          texture.flipY = false
          this.colorMap = texture
          return texture
        })
      } else {
        colorMap = this.colorMap
      }

      // Normal Map
      if (!this.normalMap) {
        normalMap = textureLoader.load('/textures/alien/Alien_Normal.jpg', (texture) => {
          texture.flipY = false
          this.normalMap = texture
          return texture
        })
      } else {
        normalMap = this.normalMap
      }

      // ARM Map
      if (!this.armMap) {
        armMap = textureLoader.load('/textures/alien/Alien_MetallicSmoothness.jpg', (texture) => {
          texture.flipY = false
          this.armMap = texture
          return texture
        })
      } else {
        armMap = this.armMap
      }

      // Update Material
      material.map = colorMap
      material.normalMap = normalMap
      material.roughness = 2
      material.roughnessMap = armMap
      material.metalnessMap = armMap
      

      loadedModel.scale.set(0.0175, 0.0175, 0.0175)

      // Add Model
      scene.add(loadedModel)

      // Animation Mixer
      const mixer = new THREE.AnimationMixer( armature )
      this.mixer = mixer
      const clips = model.animations

      // Get Animations
      const animIdle = THREE.AnimationClip.findByName( clips, 'Idle' );
      const animWalk = THREE.AnimationClip.findByName( clips, 'Walk' );
      const animRun = THREE.AnimationClip.findByName( clips, 'Run' );

      // Animation Clips
      const idle = mixer.clipAction( animIdle );
      const walk = mixer.clipAction( animWalk );
      const run = mixer.clipAction( animRun );

      run.play();

      // Render Loop
      const animate = () => {
        mixer.update( this.clock.getDelta() );
        requestAnimationFrame(animate)
      }

      setTimeout(() => {
        animate()
      }, Math.random() * 800)

      return loadedModel
    })   

  }
}