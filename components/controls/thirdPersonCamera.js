import * as THREE from 'three';
import { getClock } from '../../utils/clock';

export class ThirdPersonCamera {

  constructor(camera, player, input) {
    this.camera = camera
    this.player = player
    this.input = input

    this.currentPosition = new THREE.Vector3()
    this.currentLookAt = new THREE.Vector3()

    this.target = new THREE.Quaternion()

    this._init()
  }

  _init() {
    // this.camera.lookAt(this.player.position)
    // console.log(this.camera)
  }

  getIdealOffset() {
    const idealOffset = new THREE.Vector3(-0.5, 2.0, -1.5)
    const playerRotation = this.player.rotation.clone()
    // playerRotation.x += this.input.lookY
    idealOffset.applyEuler(playerRotation)
    idealOffset.add(this.player.position)
    return idealOffset
  }

  getIdealLookAt() {
    const idealLookAt = new THREE.Vector3(0, 1, 2.5)
    const playerRotation = this.player.rotation.clone()
    // playerRotation.x += this.input.lookY
    idealLookAt.applyEuler(playerRotation)
    idealLookAt.add(this.player.position)
    return idealLookAt
  }

  update() {

    // console.log(this.target)

    // this.target.x = Math.PI / 2
    // this.target.setFromEuler(new THREE.Euler(this.input.lookY, 0, 0, 'YXZ'))
    // const cameraPosition = this.player.position.clone() + this.xcameraOffset.clone()
    // console.log(this.target)

    const idealOffset = this.getIdealOffset()
    const idealLookAt = this.getIdealLookAt()

    // idealLookAt.add(0.2, 0, 0)

    this.camera.position.copy(idealOffset)
    this.camera.lookAt(idealLookAt)
  }

}