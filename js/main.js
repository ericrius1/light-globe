var scene, camera, renderer, composer, earth, light, stars, controls, objectControls, textSpawner, postParams, stats, testEarth;
var renderModel, effectBloom, effectCopy, effectFXAA;

var fakeDataServer = new FakeDataServer();

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
  camera.position.set(-37, 1800, -2344);

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
  controls.autoRotateSpeed = CAM_ROTATE_SPEED;


  objectControls = new ObjectControls(camera, glCanvasContainer);

  postParams = {
    bloom: STARTING_BLOOM
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

  // textSpawner = new TextCreator(100);
  // var textMesh = textSpawner.createMesh('yo!', {});
  // textMesh.scale.divideScalar(5);
  // textMesh.position.z = EARTH_RADIUS + 200
  // scene.add(textMesh);

  stars = new Stars();
  stars.createStars();
  light = new Light();
  light.createLightBeams();

  earth = new Earth();
  earth.yehior();
  animate();
  setTimeout(function(){
    zoomCam();
  }, WAIT_TO_ZOOM_TIME)
}

function zoomCam(){
  var curProps = {
    x: camera.position.x,
    y: camera.position.y,
    z: camera.position.z
  }

  var endProps = {
    x: -7,
    y: 352,
    z: -458
  }

  var zoomTween = new TWEEN.Tween(curProps).
    to(endProps, CAM_ZOOM_TIME).
    easing(TWEEN.Easing.Cubic.InOut).
    onUpdate(function(){
      camera.position.set(curProps.x, curProps.y, curProps.z);
    }).start();

    zoomTween.onComplete(function(){
      controls.autoRotate =true;
    })
}


function animate() {
  requestAnimationFrame(animate);
  // renderer.render(scene, camera);
  renderer.clear();
  composer.render();
  controls.update();
  objectControls.update();
  stats.update()
  stars.update();  
  light.update();
  earth.update();
  TWEEN.update();
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);

  effectFXAA.uniforms['resolution'].value.set(1 / window.innerWidth, 1 / window.innerHeight);
  composer.reset();
}

function map(value, min1, max1, min2, max2) {
  return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}



window.addEventListener('resize', onResize, false);