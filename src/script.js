import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
//import Stats from 'stats.js'
import {Sky} from 'three/addons/objects/Sky.js'

/**
 * Base
 */
// 1 3JS unit == 1m

//Stats
//const stats=new Stats()
//stats.showPanel(0)
//document.body.appendChild(stats.dom)

// Debug
const gui = new GUI()
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/**
 *Textures
 */

const textureLoader=new THREE.TextureLoader()

//floor
const floorTextureAlpha=textureLoader.load("./floor/alpha.webp")
const floorTextureColor=textureLoader.load("./floor/diff.webp")
const floorTextureArm=textureLoader.load("./floor/arm.webp")
const floorTextureDisp=textureLoader.load("./floor/disp.webp")
const floorTextureNor=textureLoader.load("./floor/nor.webp")

floorTextureColor.colorSpace=THREE.SRGBColorSpace

floorTextureColor.repeat.set(8,8)
floorTextureArm.repeat.set(8,8)
floorTextureDisp.repeat.set(8,8)
floorTextureNor.repeat.set(8,8)

floorTextureColor.wrapS=THREE.RepeatWrapping
floorTextureArm.wrapS=THREE.RepeatWrapping
floorTextureDisp.wrapS=THREE.RepeatWrapping
floorTextureNor.wrapS=THREE.RepeatWrapping

floorTextureColor.wrapT=THREE.RepeatWrapping
floorTextureArm.wrapT=THREE.RepeatWrapping
floorTextureDisp.wrapT=THREE.RepeatWrapping
floorTextureNor.wrapT=THREE.RepeatWrapping

//wall
const wallTextureColor=textureLoader.load("./wall/diff.webp")
const wallTextureArm=textureLoader.load("./wall/arm.webp")
const wallTextureNor=textureLoader.load("./wall/nor.webp")

wallTextureColor.colorSpace=THREE.SRGBColorSpace

//roof
const roofTextureColor=textureLoader.load("./roof/diff.webp")
const roofTextureArm=textureLoader.load("./roof/arm.webp")
const roofTextureNor=textureLoader.load("./roof/nor.webp")

roofTextureColor.colorSpace=THREE.SRGBColorSpace

roofTextureColor.repeat.set(3,1)
roofTextureArm.repeat.set(3,1)
roofTextureNor.repeat.set(3,1)

roofTextureColor.wrapS=THREE.RepeatWrapping
roofTextureArm.wrapS=THREE.RepeatWrapping
roofTextureNor.wrapS=THREE.RepeatWrapping

//bush
const bushTextureColor=textureLoader.load("./bush/diff.webp")
const bushTextureArm=textureLoader.load("./bush/arm.webp")
const bushTextureNor=textureLoader.load("./bush/nor.webp")

bushTextureColor.colorSpace=THREE.SRGBColorSpace

bushTextureColor.repeat.set(2,1)
bushTextureArm.repeat.set(2,1)
bushTextureNor.repeat.set(2,1)

bushTextureColor.wrapS=THREE.RepeatWrapping
bushTextureArm.wrapS=THREE.RepeatWrapping
bushTextureNor.wrapS=THREE.RepeatWrapping

//grave
const graveTextureColor=textureLoader.load("./grave/diff.webp")
const graveTextureArm=textureLoader.load("./grave/arm.webp")
const graveTextureNor=textureLoader.load("./grave/nor.webp")

graveTextureColor.colorSpace=THREE.SRGBColorSpace

graveTextureColor.repeat.set(0.3,0.4)
graveTextureArm.repeat.set(0.3,0.4)
graveTextureNor.repeat.set(0.3,0.4)

//door
const doorTextureAlpha=textureLoader.load("./door/alpha.webp")
const doorTextureColor=textureLoader.load("./door/color.webp")
const doorTextureAO=textureLoader.load("./door/ao.webp")
const doorTextureDisp=textureLoader.load("./door/height.webp")
const doorTextureNor=textureLoader.load("./door/normal.webp")
const doorTextureMe=textureLoader.load("./door/metalness.webp")
const doorTextureRo=textureLoader.load("./door/roughness.webp")

doorTextureColor.colorSpace=THREE.SRGBColorSpace


//Meshes

//floor gang
const floor=new THREE.Mesh(new THREE.PlaneGeometry(20,20,100,100), 
    new THREE.MeshStandardMaterial({
        transparent:true,
        alphaMap:floorTextureAlpha,
        map:floorTextureColor,
        aoMap:floorTextureArm,
        roughnessMap:floorTextureArm,
        metalnessMap:floorTextureArm,
        normalMap:floorTextureNor,
        displacementMap:floorTextureDisp,
        displacementScale:0.3,
        displacementBias:-0.2
}))
floor.rotation.x=-Math.PI*0.5

scene.add(floor)


/**
 * House
 */

//Dr. House
const house=new THREE.Group()
scene.add(house)

//Walls
const walls=new THREE.Mesh(new THREE.BoxGeometry(4,2.5,4), 
    new THREE.MeshStandardMaterial({
        map:wallTextureColor,
        aoMap:wallTextureArm,
        metalnessMap:wallTextureArm,
        roughnessMap:wallTextureArm,
        normalMap:wallTextureNor
    }))
walls.position.y+=1.25
house.add(walls)

//Roof
const roof=new THREE.Mesh(new THREE.ConeGeometry(3.5,1.5,4), 
    new THREE.MeshStandardMaterial({
        map:roofTextureColor,
        aoMap:roofTextureArm,
        metalnessMap:roofTextureArm,
        roughnessMap:roofTextureArm,
        normalMap:roofTextureNor
    }))
roof.position.y=2.5+0.75
roof.rotation.y=Math.PI*0.25
house.add(roof)

//Door
const door=new THREE.Mesh(new THREE.PlaneGeometry(2.2,2.2,40,40),
    new THREE.MeshStandardMaterial({
        map:doorTextureColor,
        alphaMap:doorTextureAlpha,
        aoMap:doorTextureAO,
        normalMap:doorTextureNor,
        displacementMap:doorTextureDisp,
        metalnessMap:doorTextureMe,
        roughnessMap:doorTextureRo,
        transparent:true,
        displacementScale:0.15,
        displacementBias:-0.04
    }))
door.position.z+=2+0.01
door.position.y+=1
house.add(door)

//bushes
const bushgeo=new THREE.SphereGeometry()
const bushmat=new THREE.MeshStandardMaterial({
    color:"#ccffcc",
    map:bushTextureColor,
    aoMap:bushTextureArm,
    metalnessMap:bushTextureArm,
    roughnessMap:bushTextureArm,
    normalMap:bushTextureNor
})

const bush1=new THREE.Mesh(bushgeo, bushmat)
bush1.scale.set(0.5,0.5,0.5)
bush1.position.set(0.8,0.2,2.2)
bush1.rotation.x=-0.75

const bush2=new THREE.Mesh(bushgeo, bushmat)
bush2.scale.set(0.25,0.25,0.25)
bush2.position.set(1.4,0.1,2.1)
bush2.rotation.x=-0.75

const bush3=new THREE.Mesh(bushgeo, bushmat)
bush3.scale.set(0.4,0.4,0.4)
bush3.position.set(-0.8,0.1,2.2)
bush3.rotation.x=-0.75

const bush4=new THREE.Mesh(bushgeo, bushmat)
bush4.scale.set(0.15,0.15,0.15)
bush4.position.set(-1,0.05,2.6)
bush4.rotation.x=-0.75


house.add(bush1,bush2,bush3,bush4)


//Graves
const gravegeo=new THREE.BoxGeometry(0.6,0.8,0.2)
const gravemat=new THREE.MeshStandardMaterial({
    map:graveTextureColor,
    aoMap:graveTextureArm,
    roughnessMap:graveTextureArm,
    metalnessMap:graveTextureArm,
    normalMap:graveTextureNor
})

const graves=new THREE.Group()
scene.add(graves)

for(let i=0; i<30; i++){
    const grave=new THREE.Mesh(gravegeo, gravemat)
    const angle=Math.random() * Math.PI * 2
    const radius=4 + Math.random()*4

    const posX=Math.sin(angle) * radius
    const posZ=Math.cos(angle) * radius
    const posY=Math.random()*0.4

    grave.position.x=posX
    grave.position.z=posZ
    grave.position.y=posY

    grave.rotation.x=(Math.random()-0.5)*0.4
    grave.rotation.y=(Math.random()-0.5)*0.4
    grave.rotation.z=(Math.random()-0.5)*0.4

    graves.add(grave)
}



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.25)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//doorlight
const doorLight=new THREE.PointLight('#ff7846',5)
doorLight.position.set(0,2.2,2.5)
house.add(doorLight)

//spirit light
const sp1=new THREE.PointLight('#8800ff',6)
const sp2=new THREE.PointLight('#ff0088',6)
const sp3=new THREE.PointLight('#ff0000',6)

scene.add(sp1,sp2,sp3)



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
camera.position.x = 0.3
camera.position.y = 2.3
camera.position.z = 11.5

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
//controls restrictions

controls.maxPolarAngle=Math.PI*0.5 -0.1
controls.minPolarAngle=0
controls.minDistance=3.5
controls.maxDistance=16


/**
 * Sounds
 */
const listener = new THREE.AudioListener();
camera.add(listener);

const audioLoader = new THREE.AudioLoader();

const sound = new THREE.Audio(listener);

audioLoader.load('sound/bg.mp3', function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true); // Set to true to loop the sound
    sound.setVolume(0.5); // Set the volume between 0 and 1
    sound.play(); // Play the sound
});



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.outputColorSpace = THREE.SRGBColorSpace
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 1.1



/**
 *Shadows
 */

//renderer
renderer.shadowMap.enabled=true
renderer.shadowMap.type=THREE.PCFSoftShadowMap

//cast and recieve
directionalLight.castShadow=true
sp1.castShadow=true
sp2.castShadow=true
sp3.castShadow=true
walls.castShadow=true
walls.receiveShadow=true
roof.castShadow=true
floor.receiveShadow=true

for(const grave of graves.children){
    grave.castShadow=true
    grave.receiveShadow=true
}

//mapping
directionalLight.shadow.mapSize.width=256
directionalLight.shadow.mapSize.height=256
directionalLight.shadow.camera.top=8
directionalLight.shadow.camera.right=8
directionalLight.shadow.camera.bottom=-8
directionalLight.shadow.camera.left=-8
directionalLight.shadow.camera.near=1
directionalLight.shadow.camera.far=20

sp1.shadow.mapSize.width=256
sp1.shadow.mapSize.height=256
sp1.shadow.camera.far=10

sp2.shadow.mapSize.width=256
sp2.shadow.mapSize.height=256
sp2.shadow.camera.far=10

sp3.shadow.mapSize.width=256
sp3.shadow.mapSize.height=256
sp3.shadow.camera.far=10

/**
 * Sky
 */
const sky=new Sky()
sky.scale.set(100,100,100)
scene.add(sky)

sky.material.uniforms['turbidity'].value=10
sky.material.uniforms['rayleigh'].value=3
sky.material.uniforms['mieCoefficient'].value=0.1
sky.material.uniforms['mieDirectionalG'].value=0.95
sky.material.uniforms['sunPosition'].value.set(0.3,-0.038,-0.95)

/**
 * Fog
 */
scene.fog=new THREE.FogExp2('#04343f', 0.1)


//light consts
const minIntensity = 0.5
const maxIntensity = 5


/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()
    
    //stats.begin()
    // Update controls
    controls.update()

    //light breathing
    const t=(Math.sin(elapsedTime*2)+1)*0.5
    doorLight.intensity=minIntensity+t * (maxIntensity-minIntensity)


    //Sprits
    const sp1Angle=elapsedTime*0.5
    sp1.position.x=Math.cos(sp1Angle)*4
    sp1.position.z=Math.sin(sp1Angle)*4
    sp1.position.y=Math.sin(sp1Angle)*Math.sin(sp1Angle*2.34)*Math.sin(sp1Angle*3.45)

    const sp2Angle=-elapsedTime*0.38
    sp2.position.x=Math.cos(sp2Angle)*5
    sp2.position.z=Math.sin(sp2Angle)*5
    sp2.position.y=Math.sin(sp2Angle)*Math.sin(sp2Angle*2.34)*Math.sin(sp2Angle*3.45)

    const sp3Angle=elapsedTime*0.23
    sp3.position.x=Math.cos(sp3Angle)*6
    sp3.position.z=Math.sin(sp3Angle)*6
    sp3.position.y=Math.sin(sp3Angle)*Math.sin(sp3Angle*2.34)*Math.sin(sp3Angle*3.45)



    // Render
    renderer.render(scene, camera)
    
    //stats.end()
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
