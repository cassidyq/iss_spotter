// will require and run our main fetch function

const { fetchMyIP } = require("./iss");
const { fetchCoordsByIP } = require("./iss");
const { fetchISSFlyOverTimes } = require("./iss");
const { nextISSTimesForMyLocation } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("216.232.132.90", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned coordinates:", coords);
// });

// const coords = { latitude: "43.63190", longitude: "-79.37160" };

// fetchISSFlyOverTimes(coords, (error, flyByTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   for (const times of flyByTimes) {
//     const riseTime = times.risetime;
//     const duration = times.duration;
//     console.log(`Next pass at ${riseTime} for ${duration} seconds!`);
//   }
// });
//

const printPassTimes = function(passes) {
  for (const pass of passes) {
    const riseTime = new Date(0);
    riseTime.setUTCSeconds(pass.risetime);

    const duration = pass.duration;
    console.log(`Next pass at ${riseTime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
