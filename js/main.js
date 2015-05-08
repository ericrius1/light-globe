var scene, camera, renderer, earth, controls, stats;


var fakeDataServer = new FakeDataServer();

var randFloat = THREE.Math.randFloat;

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

  stats = new Stats();
  document.body.appendChild(stats.domElement);

  controls = new THREE.OrbitControls(camera);

  earth = new Earth();
  earth.yehior();
  animate();

  

}


function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  stats.update()
}


