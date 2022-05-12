import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader.js'
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
import { Light } from 'three'

const parameters = {
    materialColor: '#ffeded'
}

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Models
const gltfLoader = new GLTFLoader()

let mixer = null
let mixer2 = null
let mixer3 = null

const firstG = gltfLoader.load(
    '/models/yard_grass/scene.gltf',
    (gltf) => {
        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])

        action.play()

        gltf.scene.scale.set(0.2, 0.2, 0.2)
        gltf.scene.position.x = 8
        gltf.scene.position.y = -3.0
        scene.add(gltf.scene)
    }
)

const secondG = gltfLoader.load(
    '/models/yard_grass/scene.gltf',
    (gltf) => {
        mixer2 = new THREE.AnimationMixer(gltf.scene)
        const action = mixer2.clipAction(gltf.animations[0])

        action.play()

        gltf.scene.scale.set(0.2, 0.2, 0.2)
        gltf.scene.position.x = 12
        gltf.scene.position.y = -3.0
        scene.add(gltf.scene)
    }
)

const city = gltfLoader.load(
    '/models/city/scene.gltf',
    (gltf) => {
        mixer3 = new THREE.AnimationMixer(gltf.scene)
        const action = mixer3.clipAction(gltf.animations[0])

        action.play()

        gltf.scene.scale.set(0.0019, 0.0019, 0.0019)
        gltf.scene.position.x = 18.5
        gltf.scene.position.y = -3
        gltf.scene.position.z = 1
        scene.add(gltf.scene)
    }
)

// Objects
// Texture
const textureLoader = new THREE.TextureLoader()
const gradientTexture = textureLoader.load('textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter


// Material
const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
})

const material2 = new THREE.MeshPhongMaterial()

const material3 = new THREE.MeshStandardMaterial({
    emissive: 0x292929,
    roughness: .5,
    meetalness: .5
})

material3.map = THREE.ImageUtils.loadTexture('img/sun.png')

// Meshes
const objectsDistance = 5
const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(3.5, 32, 32),
    material2
)

// const mesh2 = new THREE.Mesh(
//     new THREE.SphereGeometry(5, 32, 32),
//     material3
// )

material2.map = THREE.ImageUtils.loadTexture('img/earth.jpg')

mesh1.position.x = objectsDistance * 0
mesh1.position.z = -10
// mesh2.position.x = objectsDistance * 6
// mesh2.position.z = -30
// mesh2.position.y = 8


mesh1.material.transparent = true;
mesh1.material.opacity = 1

scene.add(mesh1)

const sectionMeshes = [ mesh1 ]

// Text
const loader = new FontLoader()
const loader2 = new FontLoader()

loader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/droid/droid_sans_bold.typeface.json', function (font) {

    const geometry = new TextGeometry('AARON', {
    font: font,
    size: 1.3,
    height: .2,
})

const textMaterial = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF
})
const mesh4 = new THREE.Mesh(geometry, material)

mesh4.position.x = -3.1
mesh4.position.y = -1

scene.add(mesh4)
})

loader2.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/fonts/droid/droid_sans_bold.typeface.json', function (font) {

    const geometry2 = new TextGeometry("HI, I'M", {
    font: font,
    size: .25,
    height: .2,
})
    
const mesh5 = new THREE.Mesh(geometry2, material)

mesh5.position.x = -.7
mesh5.position.y = .48

scene.add(mesh5)
})


// Lights
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.3)
directionalLight.position.set(1, 1, 0.1)

const sunLight = new THREE.PointLight(0xfeca9f, 1, -10)
sunLight.position.set(-1, 8, -10)

const otherLight = new THREE.PointLight(0xff0000, .5, -10)
otherLight.position.set(8000, -1, 1)

scene.add(directionalLight)
scene.add(sunLight)


// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

function resizing() {
    if (sizes.width <= 1100 && sizes.width > 1000) {
        camera.fov = 45
        document.getElementById('aboutme').style.zoom = ".85"
        document.getElementById('projectbox').style.zoom = ".85"
    } else if (sizes.width <= 1000 && sizes.width > 900) {
        camera.fov = 50
        document.getElementById('aboutme').style.zoom = ".75"
        document.getElementById('projectbox').style.zoom = ".75"
    } else if (sizes.width <= 900 && sizes.width > 800) {
        camera.fov = 55
        document.getElementById('aboutme').style.zoom = ".65"
        document.getElementById('projectbox').style.zoom = ".75"
    } else if (sizes.width <= 800 && sizes.width > 700) {
        camera.fov = 60
        document.getElementById('aboutme').style.zoom = ".55"
        document.getElementById('projectbox').style.zoom = ".75"
        camera.position.y = 0
    } else if (sizes.width <= 700 && sizes.width > 600) {
        camera.fov = 70
        document.getElementById('aboutme').style.zoom = ".45"
        document.getElementById('projectbox').style.zoom = ".75"
        camera.position.y = .5
    } else if (sizes.width < 600) {
        camera.fov = 80
        document.getElementById('aboutme').style.zoom = ".35"
        document.getElementById('projectbox').style.zoom = ".75"
    } else {
        camera.fov = 40
    }
}



window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    // if (sizes.width <= 1100 && sizes.width > 1000) {
    //     camera.fov = 45
    // } else if (sizes.width <= 1000 && sizes.width > 900) {
    //     camera.fov = 50
    // } else if (sizes.width <= 900 && sizes.width > 800) {
    //     camera.fov = 55
    // } else if (sizes.width <= 800 && sizes.width > 700) {
    //     camera.fov = 60
    // } else if (sizes.width <= 700 && sizes.width > 600) {
    //     camera.fov = 70
    // } else if (sizes.width < 600) {
    //     camera.fov = 80
    // } else {
    //     camera.fov = 40
    // }
    resizing()
    // camera.fov = 57
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


// Camera
// Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
sizes.width = window.innerWidth
sizes.height = window.innerHeight
let theDegree = 35
if (sizes.width <= 1100 && sizes.width > 1000) {
    theDegree = 45
    document.getElementById('aboutme').style.zoom = ".85"
} else if (sizes.width <= 1000 && sizes.width > 900) {
    theDegree = 50
    document.getElementById('aboutme').style.zoom = ".75"
} else if (sizes.width <= 900 && sizes.width > 800) {
    theDegree = 55
    document.getElementById('aboutme').style.zoom = ".65"
} else if (sizes.width <= 800 && sizes.width > 700) {
    theDegree = 60
    document.getElementById('aboutme').style.zoom = ".55"
} else if (sizes.width <= 700 && sizes.width > 600) {
    theDegree = 70
    document.getElementById('aboutme').style.zoom = ".45"
} else if (sizes.width < 600) {
    theDegree = 80
    document.getElementById('aboutme').style.zoom = ".35"
} else {
    theDegree = 40
}
const camera = new THREE.PerspectiveCamera(theDegree, sizes.width / sizes.height, 0.1, 100)

camera.position.z = 6
cameraGroup.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


// Scroll
let scrollY = window.scrollY
let currentSection = 0

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    scrollX = window.scrollX

    const newSection = Math.round(scrollY / sizes.width)
    console.log(scrollY)
    console.log(sizes.width)
    console.log(scrollX)
    console.log(sizes.height)
    console.log(camera.zoom)
    

    if(newSection != currentSection) {
        currentSection = newSection

        document.body.style.backgroundImage = "linear-gradient(to bottom right, black, black, black, black, black, red, orange)"
        scene.add(otherLight)
    }
})

function showAbout() {
    document.getElementById('aboutme').style.opacity = "1"
    document.getElementById('aboutme').style.animation = "fadeIn 1s forwards"
}

document.addEventListener("scroll", () => {
    let y = window.scrollY
    let one = Math.round(scrollY / sizes.width)
    let two = scrollY / sizes.width
    if (two != .67 && two < .67) {
        document.getElementById('aboutme').style.opacity = "0"
        document.getElementById('aboutme').style.animation = "none"
    } else if (two >= .67 && two < 1.3) {
        showAbout()
    } else {
        document.getElementById('aboutme').style.opacity = "0"
        document.getElementById('aboutme').style.animation = "fadeOut 1s forwards"
    // } else if (one < 1) {
    //     document.getElementById('aboutme').style.opacity = "0"
    //     document.getElementById('aboutme').style.animation = "fadeOut 1s forwards"
    }
    if (two != 1.5 && two < 1.5) {
        document.getElementById('projectbox').style.opacity = "0"
        document.getElementById('projectbox').style.animation = "none"
    } else if (two >= 1.5 && two < 2.2) {
        document.getElementById('projectbox').style.opacity = "1"
        document.getElementById('projectbox').style.animation = "fadeIn 1s forwards"
    } else {
        document.getElementById('projectbox').style.opacity = "0"
        document.getElementById('projectbox').style.animation = "fadeOut 1s forwards"
    // } else if (one < 1) {
    //     document.getElementById('aboutme').style.opacity = "0"
    //     document.getElementById('aboutme').style.animation = "fadeOut 1s forwards"
    }
})

// Cursor
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

// Animate
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

        // update mixer
        if(mixer !== null) {
            mixer.update(.002)
            }
            if(mixer2 !== null) {
                mixer2.update(.002)
                }
        
            // animate camera
            camera.position.x = scrollY / sizes.width * 10
            // if (camera.position.x > 20) {
            //     camera.position.z = ((scrollY+1) - scrollY) 
            // } else {
            //     camera.position.x = scrollY/sizes.width*10
            // }
        
            const parallaxX = cursor.x
            const parallaxY = - cursor.y
            cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 2 * deltaTime
            cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 2 * deltaTime
        
            // animate meshes
            for(const mesh of sectionMeshes)
            {
                // mesh.rotation.x += deltaTime * 0.1
                mesh.rotation.y += deltaTime * 0.12
            }
        
            // Render
            renderer.render(scene, camera)
        
            // Call tick again on the next frame
            window.requestAnimationFrame(tick)
        }
        
        tick()
        