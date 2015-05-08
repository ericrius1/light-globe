
var Earth = function() {
  this.radius = 200;
  var earthMaterial = new THREE.ShaderMaterial({
    uniforms: {
      'texture': {
        type: 't',
        value: THREE.ImageUtils.loadTexture('assets/world.jpg')
      },
    },
    vertexShader: shaders.vertexShaders.earth,
    fragmentShader: shaders.fragmentShaders.earth,
    transparent: true
  });

  var earthGeo = new THREE.SphereGeometry(this.radius, 40, 30);
  var earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
  scene.add(earthMesh);
  earthMesh.rotation.y = Math.PI;

}


Earth.prototype.yehior = function(){
  var locationPair = fakeDataServer.generateLocationPair();

  this.mapPoint(locationPair.start.latitude, locationPair.start.longitude);
  this.mapPoint(locationPair.end.latitude, locationPair.end.longitude);

}


Earth.prototype.mapPoint = function(latitude, longitude){
  
  var test = new THREE.Mesh(new THREE.BoxGeometry(20, 20, 20));
  scene.add(test)


  var phi = (90 - latitude) * Math.PI/ 180;
  var theta = (180 - longitude) * Math.PI/180;

  test.position.x = this.radius * Math.sin(phi) * Math.cos(theta);
  test.position.y = this.radius * Math.cos(phi);
  test.position.z = this.radius * Math.sin(phi) * Math.sin(theta);

}


