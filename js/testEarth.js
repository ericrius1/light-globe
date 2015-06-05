var TestEarth = function() {

  var earthMaterial = new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/world.jpg'),
    // color: new THREE.Color(0xff00ff),
    side: THREE.BackSide,
    transparent: true,
    opacity: 0.5,
    // depthWrite: false
  });

  var earthGeo = new THREE.SphereGeometry(EARTH_RADIUS, 60, 40);
  // var earthGeo = new THREE.DodecahedronGeometry(200, 1);
  var earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
  scene.add(earthMesh);
  // earthMesh.rotation.y = Math.PI;
  earthMesh.rotation.y += Math.PI/2;

} 