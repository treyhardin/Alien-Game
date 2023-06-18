import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

let fbxLoaderInstance = null

export const initFBXLoader = () => {
  const fbxLoader = new FBXLoader()
  fbxLoaderInstance = fbxLoader
  return fbxLoader
}

export const getFBXLoader = () => {
  if (fbxLoaderInstance) return fbxLoaderInstance
  return initFBXLoader()
}