var Stars = function(){

  this.pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/smokeparticle.png'),
    maxAge: 4
  });

  var pEmitter = new SPE.Emitter({
    type: 'sphere',
    radius: EARTH_RADIUS * 10,
    radiusSpread: 2000,
    sizeStart: 50,
    sizeSpread: 30,
    particleCount: 5000,
    colorStartSpread: new THREE.Vector3(1, 1, 1),
    colorEndSpread: new THREE.Vector3(1, 1, 1),
    opacityStart: 0,
    opacityMiddle: 0.8,
    opacityEnd: 0
  });

  this.pGroup.addEmitter(pEmitter);
  scene.add(this.pGroup.mesh);
}

Stars.prototype.update = function(){
  this.pGroup.tick();
}