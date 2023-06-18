import * as THREE from 'three';

export class Input {

  constructor(player) {
    this.player = player

    this.inputX = 0
    this.inputY = 0
    this.inputZ = 0
    this.shift = false

    this.lookX = 0
    this.lookY = 0

    this._init()
  }

  _init() {
  
    window.addEventListener("keydown", (event) => {
      
      switch (event.key) {
        case "w":
          this.inputZ = 1
          break
        case "a":
          this.inputX = 1
          break
        case "s":
          this.inputZ = -1
          break
        case "d":
          this.inputX = -1
          break
        case "Shift":
          this.sprint = true
          break
        case " ":
          this.inputY = 0
          break
        default:
          break
      }
    })

    window.addEventListener("keyup", (event) => {
      
      switch (event.key) {
        case "w":
          this.inputZ = 0
          break
        case "a":
          this.inputX = 0
          break
        case "s":
          this.inputZ = 0
          break
        case "d":
          this.inputX = 0
          break
        case "Shift":
          this.sprint = false
          break
        case " ":
          this.inputY = 0
          break
        default:
          break
      }
    })

    window.addEventListener("mousemove", (event) => {

      this.lookX = event.clientX / window.innerWidth * 2 - 1
      this.lookY = event.clientY / window.innerHeight * 2 - 1
      
    })
  }

}