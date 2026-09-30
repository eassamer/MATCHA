// Reverse geocoding (coordinates → city / region / country), best-effort.
//
// Provider: GEOCODER_PROVIDER env, else Google when GOOGLE_GEOCODE_API_KEY is
// set, else OpenStreetMap (no key). If the primary provider fails (e.g. an
// invalid Google key → REQUEST_DENIED) OpenStreetMap is tried once, and if
// that fails too the caller gets `null` — never an exception, because the
// coordinates themselves must still be saved.
const nodeGeocoder = require("node-geocoder");

function primaryProviderName() {
  if (process.env.GEOCODER_PROVIDER) return process.env.GEOCODER_PROVIDER;
  return process.env.GOOGLE_GEOCODE_API_KEY ? "google" : "openstreetmap";
}

function buildGeocoder(provider) {
  if (provider === "google") {
    return nodeGeocoder({ provider: "google", apiKey: process.env.GOOGLE_GEOCODE_API_KEY });
  }
  return nodeGeocoder({ provider: "openstreetmap", language: "en" });
}

const geocoders = new Map();
function getGeocoder(provider) {
  if (!geocoders.has(provider)) geocoders.set(provider, buildGeocoder(provider));
  return geocoders.get(provider);
}

function toPlace(result) {
  if (!result) return null;
  const levels = result.administrativeLevels || {};
  return {
    city: result.city || result.locality || result.name || null,
    region: levels.level1short || levels.level1long || result.state || null,
    country: result.country || null,
  };
}

async function lookup(provider, latitude, longitude) {
  const results = await getGeocoder(provider).reverse({ lat: latitude, lon: longitude });
  return toPlace(Array.isArray(results) ? results[0] : null);
}

/**
 * @returns {Promise<{city: string|null, region: string|null, country: string|null}|null>}
 */
async function reverseGeocode(latitude, longitude, { log = console.warn } = {}) {
  const primary = primaryProviderName();
  const chain = primary === "openstreetmap" ? [primary] : [primary, "openstreetmap"];
  for (const provider of chain) {
    try {
      const place = await lookup(provider, latitude, longitude);
      if (place) return place;
      log(`Geocode: ${provider} returned no result for ${latitude},${longitude}`);
    } catch (error) {
      log(`Geocode: ${provider} failed (${error.message})`);
    }
  }
  return null;
}

module.exports = { reverseGeocode, primaryProviderName, toPlace };
