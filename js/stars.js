var Stars = function(){
  this.color = [200, 200, 200];
  var starFolder = gui.addFolder('Stars');
  starFolder.addColor(this, 'color').onChange(_.debounce(function(value){
    this.changeColor();
  }.bind(this), 200));
}

Stars.prototype.changeColor = function() {
  this.destroyStars();
  this.createStars();
}

Stars.prototype.destroyStars = function() {
  scene.remove(this.pGroup.mesh); 
}

Stars.prototype.createStars = function() {
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
    colorStart:  new THREE.Color().setRGB(this.color[0]/255, this.color[1]/255, this.color[2]/255),
    colorStartSpread: new THREE.Vector3(0.1, 0.1, 0.1),
    opacityStart: 0,
    opacityMiddle: 0.8,
    opacityEnd: 0
  });

  this.pGroup.addEmitter(pEmitter);
  scene.add(this.pGroup.mesh);

}

Stars.prototype.update = function() {
  this.pGroup.tick();
}