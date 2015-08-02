var Light = function() {
  this.numEmitters = 30;
  this.emitterIndex = 0;
  this.emitters = [];
  var lightFolder = gui.addFolder("Light");
  this.camLight = new THREE.DirectionalLight(0xffffff, 1.5);
  this.camDirVector = new THREE.Vector3(0, 0, -1);
  this.shnur = 1;

  this.params = {
    color: [214, 220, 170],
    alive: 1.0,
    size: 10
  }

  lightFolder.addColor(this.params, 'color').onChange(_.debounce(function(value) {
    //Since we're destroying and creating particle group and all emitters on every color change,
    //we need to debounce to give garbage collector some breathing room and avoid stuttering
    this.changeColor();
  }.bind(this), 200));

  lightFolder.add(this.params, 'alive', .1, 1).onChange(function(value) {
    this.updateParticleCount(value);
  }.bind(this));

  lightFolder.add(this.params, 'size', 5, 30).onChange(function(value){
    this.changeSize(value);
  }.bind(this));




  this.camLight = new THREE.DirectionalLight( 0xffffff, .5 )

  scene.add( this.camLight ) 




}

Light.prototype.changeColor = function(){
  this.destroyLightsBeams();
  this.createLightBeams();
};

Light.prototype.changeSize = function(value){
  this.destroyLightsBeams();
  this.createLightBeams();
}
Light.prototype.updateParticleCount = function(value) {
  _.each(this.emitters, function(emitter) {
    emitter.alive = value;
  }.bind(this));
}

Light.prototype.createLightBeams = function() {
  this.pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
    maxAge: 2
  });

  var emitterParams = {
    sizeStart: this.params.size,
    particleCount: 2000,
    opacityStart: 0.2,
    opacityEnd: 0.2,
    colorStart: new THREE.Color().setRGB(this.params.color[0]/255, this.params.color[1]/255, this.params.color[2]/255),
    alive: this.params.alive,
  }

  for (var i = 0; i < this.numEmitters; i++) {
    var emitter = new SPE.Emitter(emitterParams);
    emitter.disable();
    this.emitters.push(emitter);
    this.pGroup.addEmitter(emitter);
  }
  this.pGroup.mesh.frustumCulled = false;
  //need this to be negative so even when we later add pMesh again, it renders after earth and lines shows up
  this.pGroup.mesh.renderOrder = -10;
  scene.add(this.pGroup.mesh);
}

Light.prototype.destroyLightsBeams = function() {
  scene.remove(this.pGroup.mesh);
  this.emitters = [];
}



Light.prototype.castBeam = function(startPoint, endPoint, shineTime) {

  //get velocity direction
  if (this.emitterIndex >= this.emitters.length) {
    this.emitterIndex = 0;
  }
  var emitter = this.emitters[this.emitterIndex++];
  var velDir = new THREE.Vector3().subVectors(endPoint, startPoint);
  velDir.divideScalar(2);
  emitter.velocity = velDir;
  emitter.position.copy(startPoint);
  emitter.enable();


  setTimeout(function() {
    emitter.disable()
  }.bind(this), shineTime)

}

Light.prototype.update = function() {
  this.camDirVector.set(0, 0, 1);
  this.camDirVector.applyQuaternion(camera.quaternion);
  this.camLight.position.set(this.camDirVector.x, this.camDirVector.y, this.camDirVector.z)
  this.pGroup.tick();
}