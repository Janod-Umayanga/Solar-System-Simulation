import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const texture = new THREE.TextureLoader().load('./Textures/saturnmap.jpg' );

const ringTexture = new THREE.TextureLoader().load('./Textures/small_ring_tex.png' );

const moonTexture = new THREE.TextureLoader().load('./Textures/moon.jpg' );

const sunTexture = new THREE.TextureLoader().load('./Textures/2k_sun.jpg' );

const saturnMesh = new THREE.SphereGeometry( 4, 32, 32 );
const saturnMaterial = new THREE.MeshStandardMaterial( { map:texture } );
const saturn = new THREE.Mesh( saturnMesh, saturnMaterial );
scene.add( saturn );
saturnMaterial.roughness = 0.75;

const ringMesh = new THREE.RingGeometry( 5, 7, 32 );
const ringMaterial = new THREE.MeshStandardMaterial( { map:ringTexture, side: THREE.DoubleSide } );
const ring = new THREE.Mesh( ringMesh, ringMaterial );
saturn.add( ring );

const atom1Mesh = new THREE.SphereGeometry( 1, 32, 32 );
const atom1Material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const atom1 = new THREE.Mesh( atom1Mesh, atom1Material );
scene.add( atom1 );
const moon1Mesh = new THREE.SphereGeometry( 1, 32, 32 );
const moon1Material = new THREE.MeshStandardMaterial( { map:moonTexture } );
const moon1 = new THREE.Mesh( moon1Mesh, moon1Material );
atom1.add( moon1 );
moon1.position.x = 10;
moon1Material.roughness = 0.5;

const atom2Mesh = new THREE.SphereGeometry( 1, 32, 32 );
const atom2Material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const atom2 = new THREE.Mesh( atom2Mesh, atom2Material );
scene.add( atom2 );
const moon2Mesh = new THREE.SphereGeometry( 0.5, 32, 32 );
const moon2Material = new THREE.MeshStandardMaterial( { map:moonTexture } );
const moon2 = new THREE.Mesh( moon2Mesh, moon2Material );
atom2.add( moon2 );
moon2.position.x = 8;
moon2Material.roughness = 0.4;

const sunMesh = new THREE.SphereGeometry( 10, 32, 32 );
const sunMaterial = new THREE.MeshBasicMaterial( { map:sunTexture } );
const sun = new THREE.Mesh( sunMesh, sunMaterial );
scene.add( sun );
sun.position.x = -50;

ring.rotation.x = Math.PI / 2;

const controls = new OrbitControls( camera, renderer.domElement );
// controls.addEventListener( 'change', renderer );

camera.position.x = -9.247615241407626;
camera.position.y = 1.4999999999999993;
camera.position.z = 14.999999999999993;
camera.rotation.x = -0.09966865249116204;
camera.rotation.y = -0.5502491512650314;
camera.rotation.z = -0.052242382288300075;

const materialArray = [];
const texture_ft = new THREE.TextureLoader().load( './Textures/skybox/1.png');
const texture_bk = new THREE.TextureLoader().load( './Textures/skybox/2.png');
const texture_up = new THREE.TextureLoader().load( './Textures/skybox/3.png');
const texture_dn = new THREE.TextureLoader().load( './Textures/skybox/4.png');
const texture_rt = new THREE.TextureLoader().load( './Textures/skybox/5.png');
const texture_lf = new THREE.TextureLoader().load( './Textures/skybox/6.png');

materialArray.push(new THREE.MeshBasicMaterial( { map: texture_ft }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_bk }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_up }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_dn }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_rt }));
materialArray.push(new THREE.MeshBasicMaterial( { map: texture_lf }));

for (let i = 0; i < 6; i++)
    materialArray[i].side = THREE.BackSide;

const skyboxGeo = new THREE.BoxGeometry( 256, 256, 256);
const skybox = new THREE.Mesh( skyboxGeo, materialArray );
scene.add( skybox );

const light = new THREE.PointLight( 0xffffff, 2048, 0 );
light.position.set( -50, 10, 0 );
scene.add( light );

const light2 = new THREE.AmbientLight( 0x404040, 0.5 ); // soft white light
scene.add( light2 );

// const BoxGeometry = new THREE.BoxGeometry( 5, 5, 5 );
// const BoxMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( BoxGeometry, BoxMaterial );
// scene.add( cube );
// cube.position.set( 10, 0, 0 );

const particlesGeometry = new THREE.BufferGeometry;
const particlesCount = 5000;

const posArray = new Float32Array( particlesCount * 3 );

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 256;
}

particlesGeometry.setAttribute( 'position', new THREE.BufferAttribute( posArray, 3 ) );
const particlesMaterial = new THREE.PointsMaterial( { 
    size: 0.1,
 } );
const particles = new THREE.Points( particlesGeometry, particlesMaterial );
scene.add( particles );

function animate() {
	requestAnimationFrame( animate );

    controls.update();

    saturn.rotation.y += 0.001;
    atom1.rotation.y += 0.01;
    atom2.rotation.y += 0.005;
    moon1.rotation.y += 0.005;
    moon2.rotation.y += 0.01;

	renderer.render( scene, camera );
    console.log(camera.position);
    console.log(camera.rotation);
}

animate();