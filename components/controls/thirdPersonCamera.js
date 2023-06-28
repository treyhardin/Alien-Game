import * as THREE from 'three';
import { getClock } from '../../utils/clock';

export class ThirdPersonCamera {

  constructor(camera, player, input) {
    this.camera = camera
    this.player = player
    this.input = input
    this.clock = getClock()

    this.currentPosition = new THREE.Vector3()
    this.currentLookAt = new THREE.Vector3()
    this.target = new THREE.Quaternion()
    
    this.lerpSpeed = 0.5
    this.lookSensitivityY = 0.75
  }

  getIdealOffset() {
    const idealOffset = new THREE.Vector3(-0.5, 2.0, -1.5)
    const playerRotation = this.player.rotation.clone()
    idealOffset.applyEuler(playerRotation)
    idealOffset.add(this.player.position)
    return idealOffset
  }

  getIdealLookAt() {
    const idealLookAt = new THREE.Vector3(0, 1, 2.5)
    const playerRotation = this.player.rotation.clone()
    idealLookAt.y += - this.input.lookY * this.lookSensitivityY
    idealLookAt.applyEuler(playerRotation)
    idealLookAt.add(this.player.position)
    return idealLookAt
  }

  update() {

    const idealOffset = this.getIdealOffset()
    const idealLookAt = this.getIdealLookAt()

    const lerpStrength = (1 - Math.pow(0.001, this.clock.elapsedTime)) * this.lerpSpeed

    this.currentLookAt.lerp(idealLookAt, lerpStrength)
    this.currentPosition.lerp(idealOffset, lerpStrength)

    this.camera.position.copy(this.currentPosition)
    this.camera.lookAt(this.currentLookAt)
  }

}