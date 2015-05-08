var Light = function(){
  var numEmitters = 100;
  this.emitterIndex = 0;
  this.richness = 10;
  this.debug = true;
  var lightFolder = gui.addFolder("Light");
  lightFolder.add(this, 'richness', 1, 10);

  this.pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 1
  });

  this.emitters = [];
  for(var i = 0; i < numEmitters; i++){
    var emitter = new SPE.Emitter({
      sizeStart: 50,
      particleCount: 100
    });
    this.emitters.push(emitter);
    this.pGroup.addEmitter(emitter);
  }
  scene.add(this.pGroup.mesh);
}



Light.prototype.castBeam = function(startPoint, endPoint){

  //get velocity direction

  var emitter = this.emitters[this.emitterIndex++];
  var velDir = new THREE.Vector3().subVectors(endPoint, startPoint);
  emitter.velocity = velDir;
  emitter.position.copy(startPoint);
  


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