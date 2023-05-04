import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// npm install --save three
// npm install --save-dev vite
// npx vite in console to run

// Sets up the scene and camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotateX(-.75);

// Renders the window
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xC0C0C0, 0.5);
document.body.appendChild( renderer.domElement );

// Adds lighting to the scene
const light = new THREE.DirectionalLight(0xffffff, 2.5);
scene.add( light );

// Loads in the GLTF model and adds it to the scene
var chunk;
const loader = new GLTFLoader();

loader.load( '/tc_gltf.gltf', function ( gltf ) {

    chunk = gltf.scene;
    scene.add( chunk );
    chunk.position.set(0, -50, -65);

}, undefined, function ( error ) {

	console.error( error );

} );

// Animates the GLTF model in the scene
if ( WebGL.isWebGLAvailable() ) {

	function animate() {
        requestAnimationFrame( animate );

        chunk.rotation.y += 0.0025;
        
        renderer.render( scene, camera );
    }

	animate();

} else {

	const warning = WebGL.getWebGLErrorMessage();
	document.getElementById( 'container' ).appendChild( warning );

}