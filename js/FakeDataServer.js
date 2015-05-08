var FakeDataServer = function() {
  this.latitudeRange = {
    min: 0,
    max: 90
  };
  this.longitudeRange = {
    min: 0,
    max: 180
  };
}


//returns an latidude and longitude tuple
FakeDataServer.prototype.generateLocation = function() {
  return {
    latitude: randFloat(0, 90),
    longitude: randFloat(0, 180)
  };
}

//returns a start and end location pair
FakeDataServer.prototype.generateLocationPair = function() {
  return {
    start: this.generateLocation(),
    end: this.generateLocation()
  }
}