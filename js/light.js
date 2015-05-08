var Light = function(){
  this.richness = 10;
  var lightFolder = gui.addFolder("Light");
  lightFolder.add(this, 'richness', 1, 10);
}



Light.prototype.castBeam = function(startPoint, endPoint){

  var beam = new THREE.Object3D();
  scene.add(beam)

  var canvas = this.generateTextureCanvas();
  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  var beamMaterial = new THREE.MeshBasicMaterial({
    // map: texture,
    blending: THREE.AdditiveBlending,
    color: 0x4444aa,
    side: THREE.DoubleSide, 
    depthTest: false,
    transparent: true,
  });

  var beamGeo = new THREE.PlaneGeometry(10, 10);
  var nPlanes = 10;
  for(var i = 0; i < nPlanes; i++){
    var beamStrand = new THREE.Mesh(beamGeo, beamMaterial);
    beamStrand.rotation.x = i/nPlanes * Math.PI;
    beam.add(beamStrand);
  }
}

Light.prototype.generateTextureCanvas = function() {

}