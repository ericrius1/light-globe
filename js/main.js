var scene, camera, renderer, composer, earth, light, stars, controls, textSpawner, postParams, stats;
var renderModel, effectBloom, effectCopy, effectFXAA;

var fakeDataServer = new FakeDataServer();

var randFloat = THREE.Math.randFloat;

var shaders = new ShaderLoader('shaders');
shaders.load('earth_vert', 'earth', 'vertex');
shaders.load('earth_frag', 'earth', 'fragment');
shaders.load('atmosphere_vert', 'atmosphere', 'vertex');
shaders.load('atmosphere_frag', 'atmosphere', 'fragment');
shaders.shaderSetLoaded = function() {
  init();
}


function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 700;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.autoClear = false;
  var glContainer = document.getElementById('glCanvasContainer');
  glCanvasContainer.appendChild(renderer.domElement);
  controls = new THREE.OrbitControls(camera, glCanvasContainer);
  // controls.minDistance = 400;
  controls.maxDistance = 3000;
  controls.zoomSpeed = 0.2;

  postParams = {
    bloom: 1.1
  }
  renderer.autoClear = false;
  renderModel = new THREE.RenderPass(scene, camera);
  effectBloom = new THREE.BloomPass(postParams.bloom);
  effectCopy = new THREE.ShaderPass(THREE.CopyShader);
  effectFXAA = new THREE.ShaderPass(THREE.FXAAShader);
  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  effectCopy.renderToScreen = true;

  composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderModel);
  composer.addPass(effectFXAA);
  composer.addPass(effectBloom);
  composer.addPass(effectCopy);

  gui = new dat.GUI({
    autoplace: false
  });
  guiContainer = document.getElementById('GUI');
  guiContainer.appendChild(gui.domElement);




  var postFolder = gui.addFolder("Post Processing");
  postFolder.add(postParams, 'bloom', 0, 5).onChange(function() {
    effectBloom.copyUniforms.opacity.value = postParams.bloom;
  })

  stats = new Stats();
  document.body.appendChild(stats.domElement);

  textSpawner = new TextCreator(100);
  var textMesh = textSpawner.createMesh('yo!', {});
  textMesh.scale.divideScalar(5);
  textMesh.position.z = EARTH_RADIUS + 200
  scene.add(textMesh);

  stars = new Stars();
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
  stars.update();
  light.update();
  earth.update();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  composer.reset();
}



window.addEventListener('resize', onResize, false);