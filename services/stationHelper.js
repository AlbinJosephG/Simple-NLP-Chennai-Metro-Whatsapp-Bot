const metroLines = require("../data/stations");
const stringSimilarity = require("string-similarity");

const aliases = {
  central: "MGR Central",
  mgr: "MGR Central",
  "mgr central": "MGR Central",
  airport: "Airport",
  cmbt: "CMBT",
  lic: "LIC",
  "st thomas mount": "St. Thomas Mount",
  "st. thomas mount": "St. Thomas Mount",
  "thomas mount": "St. Thomas Mount"
};

function getAllStations() {
  const stations = new Set();

  for (const line in metroLines) {
    metroLines[line].forEach((station) => stations.add(station));
  }

  return Array.from(stations);
}

function normalizeStationName(input) {
  if (!input) return null;

  const cleanedInput = input.trim().toLowerCase();

  if (aliases[cleanedInput]) {
    return aliases[cleanedInput];
  }

  const allStations = getAllStations();

  const exactMatch = allStations.find(
    station => station.toLowerCase() === cleanedInput
  );

  if (exactMatch) return exactMatch;

  const stationNamesLower = allStations.map(station => station.toLowerCase());
  const match = stringSimilarity.findBestMatch(cleanedInput, stationNamesLower);

  if (match.bestMatch.rating >= 0.55) {
    const index = stationNamesLower.indexOf(match.bestMatch.target);
    return allStations[index];
  }

  return null;
}

function suggestStation(input) {
  return normalizeStationName(input);
}

module.exports = {
  normalizeStationName,
  suggestStation
};