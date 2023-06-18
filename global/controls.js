
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const initControls = (camera, domElement) => {
  return new OrbitControls(camera, domElement)
}