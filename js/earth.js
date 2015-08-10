var Earth = function() {
  this.activeSessionURL = "http://aqueous-dawn-6247.herokuapp.com/api/active_sessions";
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
    waterColor: [10, 10, 200],
    waterNormalsScaleX: 1,
    waterNormalsScaleY: 1,
  };


  var earthTexture = THREE.ImageUtils.loadTexture('assets/newearth.png');
  earthTexture.minFilter = THREE.NearestFilter;

  var specularTexture = THREE.ImageUtils.loadTexture('assets/earth-specular.jpg');
  specularTexture.minFilter = THREE.NearestFilter;

  //OUTER EARTH
  this.earthMaterial = new THREE.MeshPhongMaterial({
    map: earthTexture,
    color: new THREE.Color(0x0a960a),
    specular: new THREE.Color(0x0a0ac8),
    transparent: true,
    opacity: this.opacity,
    shininess: this.params.shininess,
    specularMap: specularTexture,
    normalMap: THREE.ImageUtils.loadTexture('assets/waternormals.jpg'),
    normalScale: new THREE.Vector2(this.params.waterNormalsScaleX, this.params.waterNormalsScaleY),
  });
  var earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 60, 40);
  var earthMesh = new THREE.Mesh(earthGeo, this.earthMaterial);
  earthMesh.rotation.y = Math.PI;
  scene.add(earthMesh);

  //INNER EARTH
  this.innerEarthMaterial = new THREE.MeshBasicMaterial({
    map: earthTexture,
    color: new THREE.Color(0x0a960a),
    specular: new THREE.Color(0x0a0ac8),
    transparent: true,
    opacity: 0.2,
    shininess: this.params.shininess,
    specularMap: specularTexture,
    normalMap: THREE.ImageUtils.loadTexture('assets/waternormals.jpg'),
    side: THREE.BackSide,
    depthTest: false,
  });
  var innerEarthMesh = new THREE.Mesh(earthGeo, this.innerEarthMaterial);
  innerEarthMesh.scale.set(1.1, 1.1, 1.1)
  scene.add(innerEarthMesh);
  innerEarthMesh.rotation.y = Math.PI



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

    if (Array.isArray(value)) {
      this.earthMaterial.color.setRGB(value[0] / 255, value[1] / 255, value[2] / 255);
      this.innerEarthMaterial.color.setRGB(value[0] / 255, value[1] / 255, value[2] / 255);
    } else {
      var hex = value.substr(1);
      hex = parseInt(hex, 16);
      this.earthMaterial.color.setHex(hex);
      this.innerEarthMaterial.color.setHex(hex)
    }
  }.bind(this));
  earthFolder.addColor(this.params, 'atmosphereColor').onChange(function(value) {
    if (Array.isArray(value)) {
      this.atmosphereMaterial.uniforms.atmosphereColor.value.set(value[0] / 255, value[1] / 255, value[2] / 255);

    } else {
      var rgb = hexToRgb(value);
      this.atmosphereMaterial.uniforms.atmosphereColor.value.set(rgb.r / 255, rgb.g / 255, rgb.b / 255);

    }
  }.bind(this));
  earthFolder.add(this.params, 'atmosphereIntensity', 0, 10).onChange(function(value) {
    this.atmosphereMaterial.uniforms.intensity.value = (10 - value);
  }.bind(this));
  earthFolder.addColor(this.params, "waterColor").onChange(function(value) {

    if (Array.isArray(value)) {
      this.earthMaterial.specular.setRGB(value[0] / 255, value[1] / 255, value[2] / 255);
    } else {
      var hex = value.substr(1);
      hex = parseInt(hex, 16);
      this.earthMaterial.color.setHex(hex);
      this.innerEarthMaterial.color.setHex(hex)
      this.earthMaterial.specular.setHex(hex);
    }
  }.bind(this));
  earthFolder.add(this.params, 'waterNormalsScaleX', 0, 2).onChange(function(value) {
    this.earthMaterial.normalScale.x = value;
  }.bind(this));
  earthFolder.add(this.params, 'waterNormalsScaleX', 0, 2).onChange(function(value) {
    this.earthMaterial.normalScale.y = value;
  }.bind(this));
  earthFolder.add(this.params, "shininess", 0, 100).onChange(function(value) {
    this.earthMaterial.shininess = value
  }.bind(this));

}

Earth.prototype.yehior = function() {
  $.ajax({
    url: this.activeSessionURL,
    method: 'GET',
    dataType: 'json',
    success: function(data) {
      this.processData(data)
    }.bind(this),
    xhrFields: {
      withCredentials: true
    }
  });
}

Earth.prototype.processData = function(data) {
  console.log("AJAX DATA ", data)
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
  this.locationPair = fakeDataServer.generateLocationPair();
  this.startPoint = this.mapPoint(this.locationPair.start.latitude, this.locationPair.start.longitude);
  this.endPoint = this.mapPoint(this.locationPair.end.latitude, this.locationPair.end.longitude);
  light.castBeam(this.startPoint, this.endPoint, _.random(this.params.shineTimeMin, this.params.shineTimeMax));
}


Earth.prototype.mapPoint = function(latitude, longitude) {

  this.phi = (90 - latitude) * Math.PI / 180;
  this.theta = (180 - longitude) * Math.PI / 180;

  return new THREE.Vector3(
    EARTH_RADIUS * Math.sin(this.phi) * Math.cos(this.theta),
    EARTH_RADIUS * Math.cos(this.phi),
    EARTH_RADIUS * Math.sin(this.phi) * Math.sin(this.theta)
  )


}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}