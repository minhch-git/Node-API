import NodeGeocoder from "node-geocoder"; // USE BABEL

// const NodeGeocoder = require("node-geocoder"); // NO USE BABEL

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpAdapter: "https",
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};

const geocoder = NodeGeocoder(options);

export default geocoder; // USE BABEL

// module.exports = geocoder; // NO USE BABEL
