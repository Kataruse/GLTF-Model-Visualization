import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// sets up the scene & camera
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.rotateX(-.75);

// renders window
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// adds lighting to the scene
const light = new THREE.AmbientLight( 0xD0D0D0 );
scene.add( light );

// loads in the gltf model
var chunk;
const loader = new GLTFLoader();

loader.load( '/tc_gltf.gltf', function ( gltf ) {

    chunk = gltf.scene;
    scene.add( chunk );
    chunk.position.set(0, -50, -65);

}, undefined, function ( error ) {

	console.error( error );

} );

//animates the scene
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