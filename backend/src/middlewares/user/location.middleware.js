const { UnauthorizedException } = require("@lib/utils/exceptions");
const { getDistanceInKm } = require("@lib/utils/utils");
var userService = require("@services/users/users.service");

module.exports = async (req, res, next) => {
  if (!req.user || !req.user.email) {
    throw UnauthorizedException("User not authenticated");
  }

  try {
      if (process.env.NODE_ENV === "production") {
        const ip =
          req.headers["x-forwarded-for"] || req.socket.remoteAddress.split(":")[3];
        const response = await fetch("http://ip-api.com/json/" + ip);
        const data = await response.json();
        const distance = getDistanceInKm(req.body.lat, req.body.lon, data.lat, data.lon);
        if (distance > 100) {
          userService.updateLocation(req.user.email, data.lon, data.lat);
        } else {
          userService.updateLocation(req.user.email, req.body.lon, req.body.lat);
        }
      } else {
        const user = await userService.updateLocation(req.user.email, req.body.lon || -7.5898, req.body.lat || 33.5731); // Default location is Casablanca
      }
      next();
  } catch (error) {
    console.error(error);
    next();
  }

};
