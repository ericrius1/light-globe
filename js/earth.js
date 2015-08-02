var Earth = function() {
  this.opacity = 1;
  this.camToCenterDistance = null;
  this.prevCamToCenterDistance = null;
  this.params = {
    castIntervalMin: 100,
    castIntervalMax: 1000,
    shineTimeMin: 10000,
    shineTimeMax: 100000,
    earthColor: [10, 150, 10],
    skyColor: [15, 0, 0],
    skyAlpha: 0.2,
    atmosphereColor: [179, 179, 215],
    atmosphereIntensity: 5,
    shininess: 2,
    water: [10, 10, 200]
  };

  var earthTexture = THREE.ImageUtils.loadTexture('assets/newearth.png');



  this.earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    color: new THREE.Color(0x00ff00),
    specular: new THREE.Color(0x0a0ac8),
    transparent: true,
    opacity: this.opacity,
    shininess: this.params.shininess,
    specularMap: THREE.ImageUtils.loadTexture('assets/earth-specular.jpg'),
    normalMap: THREE.ImageUtils.loadTexture('assets/waternormals.jpg'),

  })

  this.skyColor = new THREE.Color().setRGB(this.params.skyColor[0] / 255, this.params.skyColor[1] / 255, this.params.skyColor[2] / 255);
  renderer.setClearColor(this.skyColor, this.params.skyAlpha);

  var earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 60, 40);
  var earthMesh = new THREE.Mesh(earthGeo, this.earthMaterial);
  earthMesh.rotation.y = Math.PI;
  scene.add(earthMesh);

  this.atmosphereMaterial = new THREE.ShaderMaterial({
    uniforms: {
      'atmosphereColor': {
        type: 'v3',
        value: new THREE.Vector3(this.params.atmosphereColor[0] / 255, this.params.atmosphereColor[1] / 255, this.params.atmosphereColor[2] / 255)
      },
      'intensity': {
        type: 'f',
        value: this.params.atmosphereIntensity
      }
    },
    vertexShader: shaders.vertexShaders.atmosphere,
    fragmentShader: shaders.fragmentShaders.atmosphere,
    side: THREE.BackSide,
    transparent: true,
  });

  this.atmosphereMesh = new THREE.Mesh(earthGeo, this.atmosphereMaterial);
  this.atmosphereMesh.scale.set(1.1, 1.1, 1.1);
  scene.add(this.atmosphereMesh);


  var earthFolder = gui.addFolder('Earth');
  earthFolder.add(this, 'opacity', 0, 1).onChange(function(value) {
    this.earthMaterial.opacity = value;
  }.bind(this));
  earthFolder.add(this.params, 'castIntervalMin', 100, 10000);
  earthFolder.add(this.params, 'castIntervalMax', 1000, 10000);
  earthFolder.add(this.params, 'shineTimeMin', 1000, 100000);
  earthFolder.add(this.params, 'shineTimeMax', 10000, 100000);
  earthFolder.addColor(this.params, 'earthColor').onChange(function(value) {
    this.earthMaterial.color.setRGB(value[0] / 255, value[1] / 255, value[2] / 255);
  }.bind(this));
  earthFolder.addColor(this.params, 'skyColor').onChange(function(value) {
    this.skyColor.setRGB(this.params.skyColor[0] / 255, this.params.skyColor[1] / 255, this.params.skyColor[2] / 255);
    renderer.setClearColor(this.skyColor, this.skyAlpha);
  }.bind(this));
  earthFolder.add(this.params, 'skyAlpha', 0, 1).onChange(function(value) {
    renderer.setClearColor(this.skyColor, value);
  });
  earthFolder.add(this.params, 'atmosphereIntensity', 0, 10).onChange(function(value) {
    this.atmosphereMaterial.uniforms.intensity.value = value;
  }.bind(this));
  earthFolder.addColor(this.params, 'atmosphereColor').onChange(function(value) {
    this.atmosphereMaterial.uniforms.atmosphereColor.value.set(value[0] / 255, value[1] / 255, value[2] / 255);
  }.bind(this));
  earthFolder.addColor(this.params, "water").onChange(function(value){
     this.earthMaterial.specular.setRGB(value[0] / 255, value[1] / 255, value[2] / 255);
  }.bind(this));
  earthFolder.add(this.params, "shininess", 0, 4).onChange(function(value) {
    this.earthMaterial.shininess = value
  }.bind(this));

}

Earth.prototype.yehior = function() {
  this.castTimeout = setTimeout(function() {
    this.prepareBeam();
    this.yehior();
  }.bind(this), _.random(this.params.castIntervalMin, this.params.castIntervalMax));
}

Earth.prototype.update = function() {
  this.camToCenterDistance = camera.position.distanceTo(ORIGIN);
  this.opacity = map(this.camToCenterDistance, EARTH_RADIUS, EARTH_RADIUS * 5, 0.6, 0.98);
  if (Math.abs(this.camToCenterDistance - this.prevCamToCenterDistance) > 1) {
    // this.earthMaterial.uniforms.opacity.value = this.opacity;
  }
  if (this.camToCenterDistance < EARTH_RADIUS && this.atmosphereMesh.visible) {
    this.atmosphereMesh.visible = false;
  } else if (this.camToCenterDistance > EARTH_RADIUS && !this.atmosphereMesh.visible) {
    this.atmosphereMesh.visible = true;
  }
  this.prevCamToCenterDistance = this.camToCenterDistance;
}

Earth.prototype.prepareBeam = function() {
  var locationPair = fakeDataServer.generateLocationPair();
  var startPoint = this.mapPoint(locationPair.start.latitude, locationPair.start.longitude);
  var endPoint = this.mapPoint(locationPair.end.latitude, locationPair.end.longitude);
  light.castBeam(startPoint, endPoint, _.random(this.params.shineTimeMin, this.params.shineTimeMax));
}


Earth.prototype.mapPoint = function(latitude, longitude) {

  var phi = (90 - latitude) * Math.PI / 180;
  var theta = (180 - longitude) * Math.PI / 180;

  var point = new THREE.Vector3(
    EARTH_RADIUS * Math.sin(phi) * Math.cos(theta),
    EARTH_RADIUS * Math.cos(phi),
    EARTH_RADIUS * Math.sin(phi) * Math.sin(theta)
  )

  return point;

}