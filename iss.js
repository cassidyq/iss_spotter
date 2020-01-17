//will contain most logic for fetching the data from each API endpoint
const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) {
  request("https://api.ipify.org/?format=json", (error, response, body) => {
    if (error) return callback(error, null); //check if request returned an error and return error via callback

    if (response.statusCode !== 200) {
      //check response to ensure no error
      callback(
        Error(`Status Code ${response.statusCode} when fetching IP: ${body}`),
        null
      ); //return error message via callback
      return;
    }
    // if everything ran successfully parse body for IP Address
    const ipAddress = JSON.parse(body).ip;
    callback(null, ipAddress.ip); //return IP via callback
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {
    if (error) return callback(error, null); //check if request returned an error and return error via callback

    if (response.statusCode !== 200) {
      //check response to ensure no error
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`
        ),
        null
      ); //return error message via callback
      return;
    }
    // if everything ran successfully parse body for IP Address info
    const ipInfo = JSON.parse(body);

    const coords = {
      latitude: ipInfo.data.latitude,
      longitude: ipInfo.data.longitude
    };
    callback(null, coords); //return IP via callback
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) return callback(error, null); //check if request returned an error and return error via callback

    if (response.statusCode !== 200) {
      //check response to ensure no error
      callback(
        Error(
          `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`
        ),
        null
      ); //return error message via callback
      return;
    }
    // if everything ran successfully parse body for flyby times
    const passes = JSON.parse(body).response;

    callback(null, passes); //return IP via callback
  });
};

module.exports = {
  // fetchMyIP,
  // fetchCoordsByIP,
  fetchISSFlyOverTimes
};
