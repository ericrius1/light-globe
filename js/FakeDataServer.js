var FakeDataServer = function() {
  //latidude: N = Positive, S = Negative
  //longitude: E = Positive, W = Negative
  this.latitudeRange = {
    min: -90,
    max: 90
  };
  this.longitudeRange = {
    min: -180,
    max: 180
  };


  this.hotLocations = [{
      latitude: 31.795735,
      longitude: 35.187032
    },
    {
      latitude: 34.062603,
      longitude: -118.241444
    }

  ]
}


//returns an latidude and longitude tuple
// FakeDataServer.prototype.generateLocation = function() {
//   _.random()
// }

//returns a start and end location pair
FakeDataServer.prototype.generateLocationPair = function() {
  var pair = _.sample(this.hotLocations, 2);
  return {
    start: pair[0],
    end: pair[1]
  }
}