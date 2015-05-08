
var Earth = function() {
  this.radius = 200;
  this.opacity = 0.6
  this.castInterval = 500;
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

  var earthGeo = new THREE.SphereGeometry(this.radius, 40, 30);
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

  var atmosphereMesh = new THREE.Mesh(earthGeo, this.atmosphereMaterial);
  // atmosphereMesh.scale.set(1.1, 1.1, 1.1);
  scene.add(atmosphereMesh);

  var earthFolder = gui.addFolder('Earth');
  earthFolder.add(this, 'opacity', 0, 1).onChange(function(value){
    this.earthMaterial.uniforms.opacity.value =  value;

  }.bind(this));

}



Earth.prototype.yehior = function(){

  this.castInterval = setInterval(function(){
    this.prepareBeam();
  }.bind(this), this.castInterval);
}


//earth is in charge of casting light beams, but has no conception of how those beams look.
//light class is in control of that...
Earth.prototype.prepareBeam = function(){
  var locationPair = fakeDataServer.generateLocationPair();
  var startPoint = this.mapPoint(locationPair.start.latitude, locationPair.start.longitude);
  var endPoint = this.mapPoint(locationPair.end.latitude, locationPair.end.longitude);
  light.castBeam(startPoint, endPoint);
}


Earth.prototype.mapPoint = function(latitude, longitude){

  var phi = (90 - latitude) * Math.PI/ 180;
  var theta = (180 - longitude) * Math.PI/180;

  var point = new THREE.Vector3(
     this.radius * Math.sin(phi) * Math.cos(theta),
     this.radius * Math.cos(phi),
     this.radius * Math.sin(phi) * Math.sin(theta)
  )

  return point;

}


