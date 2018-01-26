export default {
  cameraTilt: {
    cameraPanRange: 0.1,
    cameraYawRange: 0.3,
  },
  camera: {
    position: {
      x: 0,
      y: 0,
      z: 80,
    },
    rotation: {
      x: -0.4,
      y: 0.46,
      z: 0,
    },
  },
  mouse: {
    x: 0,
    y: 0,
  },
  world: {
    width: window.innerWidth,
    height: window.innerHeight,
    depth: 1000,
    start: 0,
    end: -400,
  },
  sounds: {
    refDistance: 100,
    rolloffFactor: 8,
    maxDistance: 16,
    volumeStart: 0.8,
  },
}
