var EARTH_RADIUS = 200;
var ORIGIN = new THREE.Vector3(0, 0, 0);
var CAM_ZOOM_TIME = 2000;
var CAM_ROTATE_SPEED = 1.0;
var STARTING_BLOOM = 7.11;
var WAIT_TO_ZOOM_TIME = 2000;


function randomHex(){
  return Math.floor(Math.random()*16777215).toString(16);
}

var randFloat = THREE.Math.randFloat;