import * as THREE from 'three';
import { getClock } from '../../utils/clock';

export class Movement {

  constructor(mesh, input) {
    this.mesh = mesh
    this.input = input
    this.clock = getClock()

    this.direction = new THREE.Vector3(0, 0, 0)
    this.speed = 5
    this.sprintSpeed = 5

  }
  update() {

    const deltaTime = this.clock.getDelta()

    this.mesh.rotation.y = - this.input.lookX * Math.PI

    this.direction.x = this.input.inputX
    this.direction.y = this.input.inputY
    this.direction.z = this.input.inputZ
    this.direction.normalize()

    // console.log(this.direction)

    if (this.input.sprint) {
      this.mesh.translateX(this.direction.x * this.speed * deltaTime)
      this.mesh.translateZ(this.direction.z * this.speed * deltaTime)
    } else {
      this.mesh.translateX(this.direction.x * this.sprintSpeed * deltaTime)
      this.mesh.translateZ(this.direction.z * this.sprintSpeed * deltaTime)
    }

    // this.mesh.rotation.copy(this.direction)
  }

}