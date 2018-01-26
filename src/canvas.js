import React, { Component } from 'react'
import {
  Scene,
  Math,
  WebGLRenderer,
  Clock,
  PerspectiveCamera,
  //  Fog,
  LoadingManager,
  // TextureLoader,
  // CubeTextureLoader,
  // CubeGeometry,
  // LineBasicMaterial,
  // Line,
  // Geometry,
  // Color,
  MeshBasicMaterial,
  BoxGeometry,
  Mesh,
} from 'three'
import { TweenLite, TimelineMax, TweenMax, Power4, Power1 } from 'gsap'
import $ from 'qwery'
// import GyroNorm from 'gyronorm/dist/gyronorm.complete.min'
import settings from './shared/settings'

export default class Canvas extends Component {
  constructor(props) {
    super()
    this.props = props
    const width = window.innerWidth
    const height = window.innerHeight
    const canvasEl = $('canvas')[0]

    canvasEl.style.left = 0
    canvasEl.style.top = 0
    canvasEl.style.position = 'absolute'

    this.renderer = new WebGLRenderer({
      antialising: false,
      alpha: false,
      canvas: canvasEl,
    })

    this.renderer.setSize(width, height)
    // this.renderer.setPixelRatio(window.devicePixelRatio)

    this.clock = new Clock()
    this.scene = new Scene()

    this.performance = {
      start: 0,
      end: 0,
      timer: 0,
      state: '',
      condition: false,
    }

    const aspect = width / height
    this.camera = new PerspectiveCamera(75, aspect, 0.1, 1000)

    // this.scene.background = new Color(0x474759)
    // this.scene.fog = new Fog(this.scene.background, 100, 1000)

    this.material = new MeshBasicMaterial({
      wireframe: true,
      color: 0xD45DCA,
    })
    this.box = new Mesh(new BoxGeometry(30, 30, 30), this.material)
    this.scene.add(this.box)
    this.geometry = new BoxGeometry(1, 1, 1)
    this.material2 = new MeshBasicMaterial({ color: 0x00ff00 })
    this.cube = new Mesh(this.geometry, this.material2)
    this.scene.add(this.cube)
    this.camera.position.z = 5

    this.animate()
    /*
    this.composer = new EffectComposer(this.renderer, {
      stencilBuffer: true,
      depthTexture: true
    })
    this.composer.addPass(new RenderPass(this.scene, this.camera))
    this.bokehPass = new BokehPass(this.camera, {
      focus: 0.04,
      dof: 0.03,
      aperture: 1.0,
      maxBlur: 0.005,
      radius: 0.48,
      smoothness: 0.6,
      vignette: true,
      bokeh: false,
      time: 0.0,
      grainsize: 0.01,
      factorNoise: 0.04,
      factorVignette: 0.60,
    })
    this.bokehPass.renderToScreen = true
    this.composer.addPass(this.bokehPass)
*/
    this.setWindowSize()
    this.onWindowResize = this.onWindowResize.bind(this)

    this.settings = settings
    this.settings.camera.rotation.x = -0.54
    this.settings.camera.rotation.y = 0.68
    this.events()
  }

  componentWillMount() {
  }
  componentDidMount() {
    /*
    this.particles = new Particles({
      scene: this.scene,
      count: 2000,
    })
    this.scene.add(this.particles)
    */
  }
  componentDidUpdate(prevProps) {
    if (this.props.loaded !== prevProps.loaded) {
      if (this.props.loaded === 2) {
        this.props.setReady(true)
      }
    }
    if (this.props.ready !== prevProps.ready) {
      if (this.props.ready) {
        this.ready()
      }
    }
    if (this.props.show !== prevProps.show) {
      if (this.props.show) {
        this.timeline.play().timeScale(1)
        this.onChangeTrack()
      } else {
        this.timeline.pause().reverse().timeScale(3)
      }
    }
    if (this.props.debug !== prevProps.debug) {
      if (this.props.debug) {
        this.controls()
        this.phongAshima.props.debug = true
        this.soapBalls[this.props.currentTrack].props.debug = true
        this.debug = true
      }
    }
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  /*
  initScroll() {
    const soapBallsCount = this.props.team.length - 1
    const self = this
    this.scroll = {
      y: 0
    }
    wheel((dx,dy) => {
      if (this.props.show && !this.props.bubbleIsOpen && !this.props.inAnimation) {
        if (dy > 60) {
          if (this.props.currentTrack < soapBallsCount) {
            this.props.setCurrentTrack(this.props.currentTrack + 1)
          }
        }
        if (dy < -60) {
          if (this.props.currentTrack > 0) {
            this.props.setCurrentTrack(this.props.currentTrack - 1)
          }
        }
      }
    })
    var domNode = document.querySelector('.js-app');

    var touch = touchwipe(domNode, {
      wipeUp: () => {
        this.nextTrack(true)
      },
      wipeDown: () => {
        this.nextTrack(false)
      },
      min_move_x: 20,
      min_move_y: 20,
      preventDefaultEvents: true,
    })
  }

  */
  /**
   * Resize method
   * @method onWindowResize
   * @return {Void}
   */
  onWindowResize() {
    const width = window.innerWidth
    const height = window.innerHeight
    this.camera.aspect = width / height
    // this.camera.updateProjectionMatrix()
    this.renderer.setSize(width, height)
    this.composer.setSize(width, height)
    this.renderer.clear()
    this.renderer.setViewport(0, 0, width, height)
    /*
    this.composer.render( 0.5 )
    */
  }
  /**
   * Timeline of every canvas object (in and out of balls, lines, sounds)
   * @method setTimeline
   * @return {Void}
   */
  setTimeline() {
    this.line.visible = true
    this.timeline = new TimelineMax({
      paused: true,
      onComplete: () => {
        console.log('end timeline')
      },
    })
  /*
    this.timeline
      .fromTo(this.line.material, 4,
        { opacity: 0 },
        { opacity: 0.1 },
        1
      )
  */
  }

  setWindowSize() {
    this.screenWidth = window.screen.width
  }
  /**
   * Starting all loaders togheter by loaderManager
   * @method startLoaders
   * @return {[type]}     [description]
   */
  startLoaders() {
    this.loaderManager = new LoadingManager()
    this.loader()
  }
  /**
   * All methods of draw call is here (not for particles)
   * @method ready
   * @return {Void}
   */
  ready() {
    this.camera.rotation.x = this.settings.camera.rotation.x
    this.camera.rotation.y = this.settings.camera.rotation.y

    this.setTimeline()

    if (this.props.show) {
      this.timeline.play()
    }

    this.isReady = true
  }
  tweenCamera (state) {
    // TweenMax.killTweensOf(this.camera.rotation)
    // TweenMax.killTweensOf(this.camera.zoom)
    if (state) {
      let pos = {
        x: -0.54,
        y: 0.88,
      }
      let zoom = 7
      pos = {
        x: this.settings.camera.rotation.x,
        y: this.settings.camera.rotation.y,
      }
      zoom = 3
      TweenLite.to(this.camera.rotation, 2, {
        x: pos.x,
        y: pos.y,
        ease: Power1.easeInOut,
      })

      TweenLite.to(this.camera, 4, {
        zoom,
        ease: Power4.easeInOut,
      })
    } else {
      TweenLite.to(this.camera.rotation, 4, {
        x: this.settings.camera.rotation.x,
        y: this.settings.camera.rotation.y,
        ease: Power4.easeInOut,
      })
      TweenLite.to(this.camera, 4, {
        zoom: 1,
        ease: Power4.easeOut,
      })
    }
  }
  scrollTo(current) {
    this.sectionHeight = 10000
    const distance = -this.sectionHeight / 10

    TweenMax.to(this.scroll, 1, { y: distance * current, ease: Power4.easeOut })
  }
  /**
   * Events of app
   * @method events
   * @return {Void}
   */
  events() {
    document.addEventListener('keypress', (event) => {
      const keyName = event.key
      if (keyName === 'q') {
        console.log('Bravo hai pigiato la Q')
      }
    })
    window.addEventListener('resize', this.onWindowResize, false)
    window.addEventListener('mousemove', () => {
      /*
      if (!this.props.bubbleIsOpen && this.camera.zoom === 1) {
        self.cameraTilt(e.pageX, e.pageY, e.type)
      }
      */
      // console.log(e.pageX, e.pageY, e.type)
    })
    window.addEventListener('touchstart', () => {
      /*
      if (this.props.loaded) {
        this.setState({
          isPlayable: true
        })
      }
      */
    })
  }
  /**
   * Camera tilt animation by mouse and gyroscope
   * @method cameraTilt
   * @param  {Float}   x x-axis
   * @param  {Float}   y y-axis
   * @param  {String}   type mousemove or deviceorientation
   * @return {Void}
   */
  cameraTilt(x, y, type) {
    const cameraYawRange = this.settings.cameraTilt.cameraYawRange * 0.5
    let nx = 0
    let ny = 0
    let ry = 0
    let rx = 0
    if (type === 'mousemove') {
      nx = (x / (window.innerWidth * 2)) - 1
      ny = (-y / (window.innerHeight * 2)) + 1
      ry = -Math.mapLinear(nx, -1, 1, cameraYawRange * -0.5, cameraYawRange * 0.5)
      rx = Math.mapLinear(ny, -1, 1, cameraYawRange * -0.5, cameraYawRange * 0.5)
    }
    if (type === 'deviceorientation') {
      // if (Math.radToDeg(x) >  Math.degToRad(90)) { x =  Math.degToRad(90)}
      // if (Math.radToDeg(x) < Math.degToRad(-90)) { x = Math.degToRad(-90)}
      // x += 90
      // y += 90
      // cameraYawRange = cameraYawRange * 5
      // ry = (window.innerWidth*x/Math.degToRad(180) - 10)
      // rx = (window.innerWidth*y/Math.degToRad(180) - 10)
      rx = Math.degToRad(x * 0.01)
      ry = Math.degToRad(y * 0.01)
    }
    TweenLite.to(this.camera.rotation, 4, {
      x: rx + this.settings.camera.rotation.x,
      y: ry + this.settings.camera.rotation.y,
      ease: Power4.easeOut,
    })

    // TweenLite.to(this.camera.position, 4, {
    //   x: (this.camera.position.x + rx),
    //   y: (this.camera.position.y + ry),
    //   ease: Power4.easeOut
    // })
    // console.log(this.camera.rotation)
    // console.log(this.camera.position)
  }
  animate() {
    const self = this
    requestAnimationFrame(self.animate)
    self.renderer.render(self.scene, self.camera)
  }
  render() {
    return (
      <div className="fps" />
    )
  }
}
