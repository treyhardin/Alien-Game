import * as THREE from 'three';

export const initRenderer = (camera) => {

  // Create Renderer
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    toneMapping: THREE.ACESFilmicToneMapping,
    physicallyCorrectLights: true,
    logarithmicDepthBuffer: true,
    pixelRatio: devicePixelRatio,
    shadowMap: {
      enabled: true,
      type: THREE.PCFSoftShadowMap
    }
  })
  
  // Handle Window Resize
  const resizeCanvas = () => {
    renderer.setSize( window.innerWidth, window.innerHeight );

    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  }
  
  window.addEventListener("resize", resizeCanvas)
  resizeCanvas()

  return renderer
}