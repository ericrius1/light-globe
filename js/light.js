var Light = function() {
  var numEmitters = 10;
  this.emitterIndex = 0;
  this.richness = 10;
  this.debug = false;
  this.emitters = [];
  var lightFolder = gui.addFolder("Light");

  this.pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
    maxAge: 2
  });

  this.emitterParams = {
    sizeStart: 50,
    sizeMiddle: 30,
    sizeEnd: 50,
    particleCount: 10000,
    opacityStart: 0.5,
    opacityEnd: 0.5,
    colorStart: new THREE.Color(0x050afa),
    colorEnd: new THREE.Color(0xff00ff),
    alive: 1
  }

  for (var i = 0; i < numEmitters; i++) {
    var emitter = new SPE.Emitter(this.emitterParams);
    emitter.disable();
    this.emitters.push(emitter);
    this.pGroup.addEmitter(emitter);
  }
  this.pGroup.mesh.frustumCulled = false;
  scene.add(this.pGroup.mesh);

  lightFolder.add(this.emitterParams, 'alive', 0, 1).onChange(function(value) {
    _.each(this.emitters, function(emitter) {
      emitter.alive = value;
    }.bind(this));
  }.bind(this));
}



Light.prototype.castBeam = function(startPoint, endPoint) {

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

  var startBox, endBox;

  if (this.debug) {
    startBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));
    startBox.position.copy(startPoint);
    endBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));
    endBox.position.copy(endPoint);
    scene.add(startBox, endBox);
  }

  setTimeout(function() {
    emitter.disable()
    if (this.debug) {
      scene.remove(startBox, endBox);
    }
  }.bind(this), _.random(5000, 15000))

}

Light.prototype.update = function() {
  this.pGroup.tick();
}