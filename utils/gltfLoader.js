import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'


let gltfLoaderInstance = null

export const initGLTFLoader = () => {

  const gltfLoader = new GLTFLoader()

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath( 'decoders/draco/gltf/', () => {
    return null 
  });
  gltfLoader.setDRACOLoader(dracoLoader)

  gltfLoaderInstance = gltfLoader
  return gltfLoader
}

export const getGLTFLoader = () => {
  if (gltfLoaderInstance) return gltfLoaderInstance
  return initGLTFLoader()
}