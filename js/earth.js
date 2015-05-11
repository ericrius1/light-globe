
var Earth = function() {
  this.opacity = 0.6
  this.camToCenterDistance = null;
  this.timing = {
    castIntervalMin: 100,
    castIntervalMax: 1000,
    shineTimeMin: 10000,
    shineTimeMax: 100000

  }
  this.earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
      'texture': {
        type: 't',
        value: THREE.ImageUtils.loadTexture('assets/world.jpg')
      },
      'opacity': {
        type: 'f',
        value: this.opacity
      }
    },
    vertexShader: shaders.vertexShaders.earth,
    fragmentShader: shaders.fragmentShaders.earth,
    transparent: true,
  });

  var earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 60, 40);
  var earthMesh = new THREE.Mesh(earthGeo, this.earthMaterial);
  scene.add(earthMesh);
  earthMesh.rotation.y = Math.PI;

  this.atmosphereMaterial = new THREE.ShaderMaterial({
    vertexShader: shaders.vertexShaders.atmosphere,
    fragmentShader: shaders.fragmentShaders.atmosphere,
    side: THREE.BackSide,
    // blending: THREE.AdditiveBlending,
    transparent: true,
  });

  this.atmosphereMesh = new THREE.Mesh(earthGeo, this.atmosphereMaterial);
  this.atmosphereMesh.scale.set(1.1, 1.1, 1.1);
  scene.add(this.atmosphereMesh);

  var earthFolder = gui.addFolder('Earth');
  earthFolder.add(this, 'opacity', 0, 1).onChange(function(value) {
    this.earthMaterial.uniforms.opacity.value = value;
  }.bind(this));
  earthFolder.add(this.timing, 'castIntervalMin', 100, 10000);
  earthFolder.add(this.timing, 'castIntervalMax', 1000, 10000);
  earthFolder.add(this.timing, 'shineTimeMin', 1000, 100000);
  earthFolder.add(this.timing, 'shineTimeMax', 10000, 100000);

}

Earth.prototype.yehior = function() {
  this.castTimeout = setTimeout(function() {
    this.prepareBeam();
    this.yehior();
  }.bind(this), _.random(this.timing.castIntervalMin, this.timing.castIntervalMax));
}

Earth.prototype.update = function() {
  this.camToCenterDistance = camera.position.distanceTo(ORIGIN);
  if (this.camToCenterDistance < EARTH_RADIUS && this.atmosphereMesh.visible) {
    this.atmosphereMesh.visible = false;
  } else if (this.camToCenterDistance > EARTH_RADIUS && !this.atmosphereMesh.visible) {
    this.atmosphereMesh.visible = true;
  }
}

Earth.prototype.prepareBeam = function() {
  var locationPair = fakeDataServer.generateLocationPair();
  var startPoint = this.mapPoint(locationPair.start.latitude, locationPair.start.longitude);
  var endPoint = this.mapPoint(locationPair.end.latitude, locationPair.end.longitude);
  light.castBeam(startPoint, endPoint, _.random(this.timing.shineTimeMin, this.timing.shineTimeMax));
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
