const metroLines = require("../data/stations");
const { normalizeStationName } = require("./stationHelper");

function buildGraph() {
  const graph = {};

  for (const lineName in metroLines) {
    const stations = metroLines[lineName];

    for (let i = 0; i < stations.length; i++) {
      const station = stations[i];

      if (!graph[station]) {
        graph[station] = [];
      }

      if (i > 0) {
        graph[station].push(stations[i - 1]);
      }

      if (i < stations.length - 1) {
        graph[station].push(stations[i + 1]);
      }
    }
  }

  return graph;
}

function findInterchanges(path) {
  const interchanges = [];

  for (let i = 1; i < path.length - 1; i++) {
    const station = path[i];

    const stationLines = [];

    for (const lineName in metroLines) {
      if (metroLines[lineName].includes(station)) {
        stationLines.push(lineName);
      }
    }

    if (stationLines.length > 1) {
      interchanges.push(station);
    }
  }

  return [...new Set(interchanges)];
}

function findLinesUsed(path) {
  const linesUsed = new Set();

  for (const station of path) {
    for (const lineName in metroLines) {
      if (metroLines[lineName].includes(station)) {
        linesUsed.add(lineName);
      }
    }
  }

  return Array.from(linesUsed);
}

function findRoute(source, destination) {
  source = normalizeStationName(source);
  destination = normalizeStationName(destination);

  const graph = buildGraph();

  if (!source || !destination || !graph[source] || !graph[destination]) {
    return null;
  }

  const queue = [[source]];
  const visited = new Set();

  while (queue.length > 0) {
    const path = queue.shift();
    const station = path[path.length - 1];

    if (station === destination) {
      const stops = path.length - 1;
      const distance = stops * 1.5;
      const travelTime = stops * 2;

      let fare = 10;

      if (distance > 5) fare = 20;
      if (distance > 10) fare = 30;
      if (distance > 15) fare = 40;
      if (distance > 20) fare = 50;

      return {
        from: source,
        to: destination,
        path,
        stops,
        distance,
        travelTime,
        fare,
        interchanges: findInterchanges(path),
        linesUsed: findLinesUsed(path)
      };
    }

    if (!visited.has(station)) {
      visited.add(station);

      for (const nextStation of graph[station]) {
        if (!visited.has(nextStation)) {
          queue.push([...path, nextStation]);
        }
      }
    }
  }

  return null;
}
function getLineForConnection(stationA, stationB) {
  for (const lineName in metroLines) {
    const stations = metroLines[lineName];

    const indexA = stations.indexOf(stationA);
    const indexB = stations.indexOf(stationB);

    if (indexA !== -1 && indexB !== -1 && Math.abs(indexA - indexB) === 1) {
      return lineName;
    }
  }

  return null;
}

function getLineEmoji(lineName) {
  const emojis = {
    blue: "🔵 Blue Line",
    green: "🟢 Green Line",
    purple: "🟣 Purple Line",
    yellow: "🟡 Yellow Line",
    red: "🔴 Red Line"
  };

  return emojis[lineName] || lineName;
}

function formatRouteByLine(path) {
  if (!path || path.length === 0) return "";

  let message = "";
  let currentLine = null;

  for (let i = 0; i < path.length; i++) {
    const currentStation = path[i];
    const nextStation = path[i + 1];

    if (i === 0 && nextStation) {
      currentLine = getLineForConnection(currentStation, nextStation);
      message += `${getLineEmoji(currentLine)}\n`;
      message += `${currentStation}\n`;
      continue;
    }

    if (nextStation) {
      const nextLine = getLineForConnection(currentStation, nextStation);

      if (nextLine !== currentLine) {
        message += `↓\n${currentStation}\n\n`;
        message += `🔄 Change Here at ${currentStation}\n\n`;
        message += `${getLineEmoji(nextLine)}\n`;
        message += `${currentStation}\n`;
        currentLine = nextLine;
      } else {
        message += `↓\n${currentStation}\n`;
      }
    } else {
      message += `↓\n${currentStation}`;
    }
  }

  return message;
}
function formatRouteMessage(result) {
  return `🚇 Route Summary

From: ${result.from}
To: ${result.to}

${formatRouteByLine(result.path)}

Interchanges: ${
    result.interchanges.length > 0
      ? result.interchanges.join(", ")
      : "No interchange"
  }

Stops: ${result.stops}
Distance: ${result.distance} km
Travel Time: ${result.travelTime} mins
Fare: ₹${result.fare}

Reply:
0 - Main Menu
9 - Back`;
}

module.exports = {
  findRoute,
  formatRouteMessage
};