var FakeDataServer = function() {
  //latidude: N = Positive, S = Negative
  //longitude: E = Positive, W = Negative
  this.randomFactor = .1;

  this.hotLocations = [{
      latitude: 31.795735, //Israel
      longitude: 35.187032
    }, {
      latitude: 34.062603, //LA
      longitude: -118.241444
    }, {
      latitude: 40.890964, //New York
      longitude: -73.886297
    }, {
      latitude: -32.584743, //South Africa
      longitude: 27.946152
    }, {
      latitude: 51.549569, //London
      longitude: -0.107092
    }, {
      latitude: 32.083081, //Tel Aviv
      longitude: 34.792954
    }, {
      latitude: 48.845982, //Paris
      longitude: 2.367316
    }, {
      latitude: 25.820188, //Miami
      longitude: -80.293565
    }, 
    {
      latitude: 40.061721, //Philadelphia
      longitude: -75.082553
    },
    {
      latitude: 38.949563, //Washington DC
      longitude: -76.994139
    },
    {
      latitude: 55.877497, //Moscow
      longitude: 37.652408
    },
     {
      latitude: 47.531771, //Budapest
      longitude: 19.121033
    },
     {
      latitude: -23.566029, //San Paulo
      longitude: -46.573327
    },
    {
      latitude: 37.752678, //San Francisco
      longitude:-122.441892
    },
    {
      latitude: 41.840384, //Chicago
      longitude:  -87.701256
    },
     {
      latitude: 43.932247, //Toronto
      longitude:  -79.387671
    },
     {
      latitude: 45.494242, //Montreal
      longitude:  -73.607026
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
  pair[0].latitude += randFloat(-this.randomFactor, this.randomFactor);
  pair[0].longitude += randFloat(-this.randomFactor, this.randomFactor);
  
  pair[1].latitude += randFloat(-this.randomFactor, this.randomFactor);
  pair[1].longitude += randFloat(-this.randomFactor, this.randomFactor);
  return {
    start: pair[0],
    end: pair[1]
  }
}