import * as THREE from 'three';
import { getFBXLoader } from './fbxLoader';

export class StateMachine {

  constructor(armature, movement) {
    this.clock = new THREE.Clock()
    this.movement = movement
    this._init(armature)
  }
  
  _init(armature) {

      // Animation Mixer
      const mixer = new THREE.AnimationMixer( armature )
      this.mixer = mixer

      this.animationActions = {}
      const fbxLoader = getFBXLoader()

      // Animation Loader
      const loadAnimation = (name, path) => {
        fbxLoader.load(path, (fbx) => {
          const animation = fbx.animations[0]
          const action = mixer.clipAction( animation );
          this.animationActions[name] = action
          return
        })
      }

      // Load Animations
      loadAnimation('idle', '/animations/idle.fbx')
      loadAnimation('jump', '/animations/jump.fbx')
      loadAnimation('walk', '/animations/walking.fbx')
      loadAnimation('run', '/animations/running.fbx')

      const mixAnimations = () => {
        if (this.movement.direction.x > 0.001) {
          // this.animationActions.walk.play()
        }
      }


      // Animation Loop
      const animate = () => {

        // console.log(this.movement)
        mixAnimations()
        
        mixer.update( this.clock.getDelta() );
        requestAnimationFrame(animate)
      }
      animate()
  }
}