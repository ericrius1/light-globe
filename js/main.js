var scene, camera, renderer, earth, controls;


var shaders = new ShaderLoader('shaders');
shaders.load('earth_vert', 'earth', 'vertex');
shaders.load('earth_frag', 'earth', 'fragment');
shaders.shaderSetLoaded = function(){
  init();
}


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera);

  earth = new Earth();
  earth.mapPoint(37.763493, -122.454349);
  animate();

  

}


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
