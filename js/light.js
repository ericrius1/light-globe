var Light = function(){
  this.richness = 10;
  this.debug = true;
  var lightFolder = gui.addFolder("Light");
  lightFolder.add(this, 'richness', 1, 10);

  this.pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 1
  });
  scene.add(this.pGroup.mesh)

  //need to create a pool of emitters!
}



Light.prototype.castBeam = function(startPoint, endPoint){

  //get velocity direction

  var velDir = new THREE.Vector3().subVectors(endPoint, startPoint);
  var lightEmitter = new SPE.Emitter({
    position: startPoint,
    sizeStart: 50,
    particleCount: 1000,
    velocity: velDir
    // velocitySpread: new THREE.Vector3(10, 10, 10)
  });

  this.pGroup.addEmitter(lightEmitter);


  if(this.debug){
    var startBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));
    startBox.position.copy(startPoint);
    var endBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));
    endBox.position.copy(endPoint);
    scene.add(startBox, endBox);
  }

}

Light.prototype.update = function(){
  this.pGroup.tick();
}