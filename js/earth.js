
var Earth = function() {
  this.radius = 200;
  this.opacity = 0.8
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
    transparent: true
  });

  var earthGeo = new THREE.SphereGeometry(this.radius, 40, 30);
  var earthMesh = new THREE.Mesh(earthGeo, this.earthMaterial);
  scene.add(earthMesh);
  earthMesh.rotation.y = Math.PI;
  this.castInterval = 500;

  var earthFolder = gui.addFolder('Earth');
  earthFolder.add(this, 'opacity', 0, 1).onChange(function(value){
    console.log(this)
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

  var point = {
    x: this.radius * Math.sin(phi) * Math.cos(theta),
    y: this.radius * Math.cos(phi),
    z: this.radius * Math.sin(phi) * Math.sin(theta)
  };

  return point;

}


