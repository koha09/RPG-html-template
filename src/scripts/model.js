import * as $ from 'jquery'
import * as THREE from "three";
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'


const modelContainer = $('.inventory-hero__model')

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera( 75, modelContainer.width() / modelContainer.height(), 0.1, 1000 );

let renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x181313,1)
renderer.setSize( modelContainer.width(), modelContainer.height() )
console.log(modelContainer.width(), modelContainer.height())
modelContainer.append( renderer.domElement )

let geometry = new THREE.BoxGeometry();
let material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
let cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 2


let light = new THREE.DirectionalLight('#ffffff',1);
light.position.set(-10,20,40);
scene.add(light);

var manager = new THREE.LoadingManager();
manager.onStart = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onLoad = function ( ) {
	console.log( 'Loading complete!');
};


manager.onProgress = function ( url, itemsLoaded, itemsTotal ) {
	console.log( 'Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
};

manager.onError = function ( url ) {
	console.log( 'There was an error loading ' + url );
};
var loader = new GLTFLoader( manager );

loader.load(
    'models/scene.gltf',
    function(gltf){
        scene.add(gltf.scene);
        const model = gltf.scene;
        console.log(model)
        let animate = function () {
            model.rotation.y += 0.01;
            gltf.scene.updateMatrixWorld();

            renderer.render( model, camera );
            requestAnimationFrame( animate );
        };
        requestAnimationFrame( animate );
    },
    function(xhr){
        console.log(xhr.loaded);
    },
    function(error){
        console.error('error on load gltf models',error);
    }
)
