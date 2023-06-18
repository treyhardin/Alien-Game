import * as THREE from 'three';
import { getClock } from '../../utils/clock';

export class Movement {

  constructor(mesh, input) {
    this.mesh = mesh
    this.input = input
    this.clock = getClock()

    this.direction = new THREE.Vector3(0, 0, 0)
    this.speed = 5

    this.sprint = false

  }
  update() {

    const deltaTime = this.clock.getDelta()

    // console.log(this.mesh.rotation)

    this.mesh.rotation.y = - this.input.lookX * Math.PI

    this.direction.x = this.input.inputX
    this.direction.y = this.input.inputY
    this.direction.z = this.input.inputZ
    this.direction.normalize()
    // this.direction *= this.mesh.rotation

    // this.mesh.position.x += this.direction.x * this.speed * deltaTime
    // this.mesh.position.y += this.direction.y * this.speed * deltaTime
    // this.mesh.position.z += this.direction.z * this.speed * deltaTime
    this.mesh.translateX(this.direction.x * this.speed * deltaTime)
    this.mesh.translateZ(this.direction.z * this.speed * deltaTime)
  }

}