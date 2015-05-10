var Light = function(){
  var numEmitters = 100;
  this.emitterIndex = 0;
  this.richness = 10;
  this.debug = false;
  var lightFolder = gui.addFolder("Light");
  lightFolder.add(this, 'richness', 1, 10);

  this.pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
    maxAge: 2
  });

  this.emitters = [];
  for(var i = 0; i < numEmitters; i++){
    var emitter = new SPE.Emitter({
      sizeStart: 50,
      particleCount: 100,
      opacityEnd: 1,
      colorStart: new THREE.Color().setRGB(Math.random(), Math.random(), Math.random())
    });
    emitter.disable();
    this.emitters.push(emitter);
    this.pGroup.addEmitter(emitter);
  }
  this.pGroup.mesh.frustumCulled = false;
  scene.add(this.pGroup.mesh);
}



Light.prototype.castBeam = function(startPoint, endPoint){

  //get velocity direction
  if(this.emitterIndex >= this.emitters.length){
    this.emitterIndex = 0;
  }
  var emitter = this.emitters[this.emitterIndex++];
  var velDir = new THREE.Vector3().subVectors(endPoint, startPoint);
  velDir.divideScalar(2);
  emitter.velocity = velDir;
  emitter.position.copy(startPoint);
  emitter.enable();
  
  var startBox,endBox;

  if(this.debug){
    startBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));
    startBox.position.copy(startPoint);
    endBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));
    endBox.position.copy(endPoint);
    scene.add(startBox, endBox);
  }

  setTimeout(function(){
    emitter.disable()
    if(this.debug){
      scene.remove(startBox, endBox);
    }
  }.bind(this), _.random(5000, 15000))

}

Light.prototype.update = function(){
  this.pGroup.tick();
}