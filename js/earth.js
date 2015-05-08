
var Earth = function() {

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

  var earthGeo = new THREE.SphereGeometry(200, 40, 30);
  var earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
  scene.add(earthMesh);
  earthMesh.rotation.y = Math.PI;

}


Earth.prototype.mapPoint = function(latitude, longitude){
  
  var test = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1));
  scene.add(test)


  var phi = (90 - latitude) * Math.PI/ 180;
  var theta = (180 - longitude) * Math.PI/180;

  test.position.x = 200 * Math.sin(phi) * Math.cos(theta);
  test.position.y = 200 * Math.cos(phi);
  test.position.z = 200 * Math.sin(phi) * Math.sin(theta);

}