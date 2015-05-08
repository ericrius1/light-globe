var Light = function(){
  this.richness = 10;

  gui.add(this, 'richness', 1, 10);

}

Light.prototype.castBeam = function(startPoint, endPoint){

  var lineGeo  = new THREE.Geometry();
  lineGeo.vertices.push(startPoint);
  lineGeo.vertices.push(endPoint);

  var lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff00ff,
    linewidth: 5
  })

  var line = new THREE.Line(lineGeo, lineMaterial);

  scene.add(line);

}