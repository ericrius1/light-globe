var Light = function() {
  this.numEmitters = 30;
  this.emitterIndex = 0;
  this.emitters = [];
  var lightFolder = gui.addFolder("Light");
  this.params = {
    startColor: [0.8, 0.1, 0.8],
    alive: 1.0
  }

  lightFolder.addColor(this.params, 'startColor').onChange(function(value) {
    this.changeColor();
  }.bind(this));

  lightFolder.add(this.params, 'alive', .1, 1).onChange(function(value) {
    this.updateParticleCount(value);
  }.bind(this));
}

Light.prototype.changeColor = function(){
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
    sizeStart: 10,
    sizeMiddle: 10,
    sizeEnd: 10,
    particleCount: 2000,
    opacityStart: 0.2,
    opacityEnd: 0.2,
    // colorStart: new THREE.Color().setRGB(this.params.startColor[0], this.params.startColor[1], this.params.startColor[2]),
    alive: this.params.alive,
  }

  for (var i = 0; i < this.numEmitters; i++) {
    var emitter = new SPE.Emitter(emitterParams);
    emitter.disable();
    this.emitters.push(emitter);
    this.pGroup.addEmitter(emitter);
  }
  this.pGroup.mesh.frustumCulled = false;
  this.pGroup.mesh.renderOrder = -10;
  scene.add(this.pGroup.mesh);
}

Light.prototype.destroyLightsBeams = function() {
  scene.remove(this.pGroup.mesh);
  this.pGroup = [];
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
      // scene.remove(startBox);
      // scene.remove(endBox);
  }.bind(this), shineTime)

}

Light.prototype.update = function() {
  this.pGroup.tick();
}