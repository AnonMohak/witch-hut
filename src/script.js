import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import Stats from 'stats.js'

/**
 * Base
 */
// 1 3JS unit == 1m

//Stats
const stats=new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

// Debug
const gui = new GUI()
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Meshes

//floor gang
const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20), new THREE.MeshStandardMaterial())
floor.rotation.x=-Math.PI*0.5

scene.add(floor)

/**
 * House
 */

//Dr. House
const house=new THREE.Group()
scene.add(house)

//Walls
const walls=new THREE.Mesh(new THREE.BoxGeometry(4,2.5,4), new THREE.MeshStandardMaterial())
walls.position.y+=1.25
house.add(walls)

//Roof
const roof=new THREE.Mesh(new THREE.ConeGeometry(3.5,1.5,4), new THREE.MeshStandardMaterial())
roof.position.y=2.5+0.75
roof.rotation.y=Math.PI*0.25
house.add(roof)

//Door
const door=new THREE.Mesh(new THREE.PlaneGeometry(), new THREE.MeshStandardMaterial())
house.add(door)


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
window.addEventListener('dblclick', ()=>{
    if(!document.fullscreenElement){
        canvas.requestFullscreen()
    }
    else{
            document.exitFullscreen()
        }
    
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//controls restrictions

//controls.maxPolarAngle=Math.PI*0.5 -0.05
//controls.minPolarAngle=0
//controls.minDistance=3.5
//controls.maxDistance=22


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()
    
    stats.begin()
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)
    
    stats.end()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
