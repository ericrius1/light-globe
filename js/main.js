console.log('yo');
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 10000);
camera.position.z = 20;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


var sphere = new THREE.Mesh(new THREE.SphereGeometry(5));
scene.add(sphere);

animate();

function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

