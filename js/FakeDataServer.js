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
}


//returns an latidude and longitude tuple
FakeDataServer.prototype.generateLocation = function() {
  return {
    latitude: randFloat(this.latitudeRange.min, this.latitudeRange.max),
    longitude: randFloat(this.longitudeRange.min, this.latitudeRange.max)
  };
}

//returns a start and end location pair
FakeDataServer.prototype.generateLocationPair = function() {
  return {
    start: this.generateLocation(),
    end: this.generateLocation()
  }
}