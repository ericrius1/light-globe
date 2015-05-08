var Stars = function(){

  this.pGroup = new SPE.Group({
    texture: THREE.ImageUtils.loadTexture('assets/star.png'),
    maxAge: 10
  });

  var pEmitter = new SPE.Emitter({
    type: 'sphere',
    radius: EARTH_RADIUS * 10,
    radiusSpread: 200,
    sizeStart: 200,
    particleCount: 10000,
    colorStartSpread: new THREE.Vector3(200, 1, 1),
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