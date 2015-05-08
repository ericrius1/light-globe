var scene, camera, renderer, composer, earth, light, controls, stats;
var renderModel, effectBloom, effectCopy, effectFXAA;


var fakeDataServer = new FakeDataServer();

var randFloat = THREE.Math.randFloat;

var shaders = new ShaderLoader('shaders');
shaders.load('earth_vert', 'earth', 'vertex');
shaders.load('earth_frag', 'earth', 'fragment');
shaders.shaderSetLoaded = function() {
  init();
}


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 1000;

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  var glContainer = document.getElementById('glCanvasContainer');
  glCanvasContainer.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls(camera, glCanvasContainer);

  renderer.autoClear = false;
  renderModel = new THREE.RenderPass(scene, camera);
  effectBloom = new THREE.BloomPass(1);
  effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  effectCopy.renderToScreen = true;

  composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderModel);
  composer.addPass(effectFXAA);
  composer.addPass(effectBloom);
  composer.addPass(effectCopy);

  stats = new Stats();
  document.body.appendChild(stats.domElement);

  gui = new dat.GUI({
    autoplace: false
  });
  guiContainer = document.getElementById('GUI');
  guiContainer.appendChild(gui.domElement);

  light = new Light();

  earth = new Earth();
  earth.yehior();
  animate();



}


function animate() {
  requestAnimationFrame(animate);
  // renderer.render(scene, camera);
  renderer.clear();
  composer.render();
  controls.update();
  stats.update()
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  effectFXAA.uniforms['resolution'].value.set(1/window.innerWidth, 1/window.innerHeight);
}


window.addEventListener('resize', onResize, false);
