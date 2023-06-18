import * as THREE from 'three';

let textureLoaderInstance = null

export const initTextureLoader = () => {
  const textureLoader = new THREE.TextureLoader()
  textureLoaderInstance = textureLoader
  return textureLoader
}

export const getTextureLoader = () => {
  if (textureLoaderInstance) return textureLoaderInstance
  return initTextureLoader()
}