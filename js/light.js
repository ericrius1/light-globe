var Light = function() {
  var numEmitters = 30;
  this.emitterIndex = 0;
  this.emitters = [];
  var lightFolder = gui.addFolder("Light");

  this.pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
    maxAge: 2
  });

  this.emitterParams = {
    sizeStart: 10,
    sizeMiddle: 10,
    sizeEnd: 10,
    particleCount: 2000,
    opacityStart: 0.2,
    opacityEnd: 0.2,
    colorStart: new THREE.Color(0xFFFF66),
    colorEnd: new THREE.Color(0xFFFF66),
    // colorMiddle: new THREE.Color(0xFFFCF1),
    // colorEnd: new THREE.Color(0xFFFCF1),
    alive: 1.0
  }

  for (var i = 0; i < numEmitters; i++) {
    var emitter = new SPE.Emitter(this.emitterParams);
    emitter.disable();
    this.emitters.push(emitter);
    this.pGroup.addEmitter(emitter);
  }
  this.pGroup.mesh.frustumCulled = false;
  scene.add(this.pGroup.mesh);

  lightFolder.add(this.emitterParams, 'alive', .1, 1).onChange(function(value) {
    _.each(this.emitters, function(emitter) {
      emitter.alive = value;
    }.bind(this));
  }.bind(this));
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

  // var startBox, endBox;

  // startBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));
  // startBox.position.copy(startPoint);
  // endBox = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));
  // endBox.position.copy(endPoint);
  // scene.add(startBox, endBox);

  // objectControls.add(startBox);
  // startBox.select = function(){
  //   console.log("SHNUUR")
  // }

  setTimeout(function() {
    emitter.disable()
    // scene.remove(startBox);
    // scene.remove(endBox);
  }.bind(this), shineTime)

}

Light.prototype.update = function() {
  this.pGroup.tick();
}