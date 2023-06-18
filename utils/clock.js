import * as THREE from 'three';

let clockInstance = null

export const initClock = () => {
  const clock = new THREE.Clock()
  clockInstance = clock
  return clock
}

export const getClock = () => {
  if (clockInstance) return clockInstance
  return initClock()
}