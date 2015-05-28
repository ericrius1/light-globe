
var Earth = function() {
  this.opacity = 0.6;
  this.camToCenterDistance = null;
  this.prevCamToCenterDistance = null;
  this.params = {
    castIntervalMin: 100,
    castIntervalMax: 1000,
    shineTimeMin: 10000,
    shineTimeMax: 100000,
    earthColor: [200, 10, 00]
  };
  this.earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
      'texture': {
        type: 't',
        value: THREE.ImageUtils.loadTexture('assets/world.jpg')
      },
      'opacity': {
        type: 'f',
        value: this.opacity
      },
      'earthColor' : {
        type: 'v3',
        value: new THREE.Vector3(this.params.earthColor[0]/255, this.params.earthColor[1]/255, this.params.earthColor[2]/255)
      }
    },
    vertexShader: shaders.vertexShaders.earth,
    fragmentShader: shaders.fragmentShaders.earth,
    transparent: true
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
  earthFolder.add(this.params, 'castIntervalMin', 100, 10000);
  earthFolder.add(this.params, 'castIntervalMax', 1000, 10000);
  earthFolder.add(this.params, 'shineTimeMin', 1000, 100000);
  earthFolder.add(this.params, 'shineTimeMax', 10000, 100000);
  earthFolder.addColor(this.params, 'earthColor').onChange(function(value){
    this.earthMaterial.uniforms.earthColor.value.set(value[0]/255, value[1]/255, value[2]/255);
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
  if(Math.abs(this.camToCenterDistance - this.prevCamToCenterDistance) > 1){
    this.earthMaterial.uniforms.opacity.value = this.opacity;
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
