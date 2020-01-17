// const { fetchMyIP } = require("./iss_promised");
// const { fetchCoordsByIP } = require("./iss_promised");
// const { fetchISSFlyOverTimes } = require("./iss_promised");
const { nextISSTimesForMyLocation } = require("./iss_promised");

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));
const printPassTimes = function(passes) {
  for (const pass of passes) {
    const riseTime = new Date(0);
    riseTime.setUTCSeconds(pass.risetime);

    const duration = pass.duration;
    console.log(`Next pass at ${riseTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then(passTimes => {
    printPassTimes(passTimes);
  })
  .catch(error => {
    console.log("It did't work: " + error.message);
  });
