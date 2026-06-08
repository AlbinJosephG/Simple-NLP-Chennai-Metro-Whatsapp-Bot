const express = require("express");
const cors = require("cors");
require("dotenv").config();

const metroLines = require("./data/stations");
const { findRoute, formatRouteMessage } = require("./services/routeFinder");
const timings = require("./data/timings");
const { parseMessage } = require("./services/chatParser");
const { suggestStation } = require("./services/stationHelper");

const twilio = require("twilio");

const MessagingResponse = twilio.twiml.MessagingResponse;

const app = express();
const userSessions = {};

function getSuggestionMessage(from, to) {
  const suggestions = [];

  const fromSuggestion = suggestStation(from);
  const toSuggestion = suggestStation(to);

  if (
    fromSuggestion &&
    fromSuggestion.toLowerCase() !== from.toLowerCase()
  ) {
    suggestions.push(
      `Did you mean "${fromSuggestion}" instead of "${from}"?`
    );
  }

  if (
    toSuggestion &&
    toSuggestion.toLowerCase() !== to.toLowerCase()
  ) {
    suggestions.push(
      `Did you mean "${toSuggestion}" instead of "${to}"?`
    );
  }

  return suggestions.length > 0
    ? suggestions.join("\n")
    : "Please check station names.";
}
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Chennai Metro WhatsApp Bot Backend Running 🚇");
});

app.get("/stations", (req, res) => {
  res.json(metroLines);
});

app.post("/route", (req, res) => {
  const { from, to } = req.body;

  const result = findRoute(from, to);

  if (!result) {
    return res.status(404).json({
      message: "Route not found. Please check station names."
    });
  }

  res.json({
    from: result.from,
    to: result.to,
    route: result.path,
    totalStations: result.path.length,
    stops: result.stops,
    distance: `${result.distance} km`,
    travelTime: `${result.travelTime} mins`,
    fare: `₹${result.fare}`,
    interchanges: result.interchanges,
    linesUsed: result.linesUsed,
    message: formatRouteMessage(result)
  });
});

app.post("/fare", (req, res) => {
  const { from, to } = req.body;

  const result = findRoute(from, to);

  if (!result) {
    return res.status(404).json({
      message: "Fare not found. Please check station names."
    });
  }

  res.json({
    from: result.from,
    to: result.to,
    distance: `${result.distance} km`,
    stops: result.stops,
    fare: `₹${result.fare}`,
    message: `💰 Fare Details

From: ${result.from}
To: ${result.to}

Distance: ${result.distance} km
Stops: ${result.stops}
Fare: ₹${result.fare}`
  });
});

app.post("/time", (req, res) => {
  const { from, to } = req.body;

  const result = findRoute(from, to);

  if (!result) {
    return res.status(404).json({
      message: "Travel time not found. Please check station names."
    });
  }

  res.json({
    from: result.from,
    to: result.to,
    stops: result.stops,
    travelTime: `${result.travelTime} mins`,
    interchanges: result.interchanges,
    message: `⏱️ Travel Time Details

From: ${result.from}
To: ${result.to}

Stops: ${result.stops}
Interchanges: ${
      result.interchanges.length > 0
        ? result.interchanges.join(", ")
        : "No interchange"
    }
Approx Travel Time: ${result.travelTime} mins`
  });
});

app.post("/timings", (req, res) => {
  const { station } = req.body;

  const stationTiming = timings[station] || timings.default;

  res.json({
    station,
    firstTrain: stationTiming.firstTrain,
    lastTrain: stationTiming.lastTrain,
    message: `🚆 Train Timings

Station: ${station}

First Train: ${stationTiming.firstTrain}
Last Train: ${stationTiming.lastTrain}`
  });
});


app.post("/chat", (req, res) => {
  const { message, lat, lng } = req.body;

  if (!message) {
    return res.status(400).json({
      reply: "Please send a message."
    });
  }

  const parsed = parseMessage(message);

  if (parsed.type === "menu") {
    return res.json({
      reply: `🚇 Chennai Metro Bot

Choose an option:
1. Find Route
2. Check Fare
3. Travel Time
4. First & Last Train

You can also type:
Airport to Vadapalani
Fare from Airport to Vadapalani
Time from Airport to Vadapalani
Timings Airport`
    });
  }


  if (parsed.type === "timings") {
    const stationTiming = timings[parsed.station] || timings.default;

    return res.json({
      reply: `🚆 Train Timings

Station: ${parsed.station}

First Train: ${stationTiming.firstTrain}
Last Train: ${stationTiming.lastTrain}`
    });
  }

  if (parsed.type === "fare") {
    const result = findRoute(parsed.from, parsed.to);

    if (!result) {
      return res.json({
        reply: "Fare not found. Please check station names."
      });
    }

    return res.json({
      reply: `💰 Fare Details

From: ${result.from}
To: ${result.to}

Distance: ${result.distance} km
Stops: ${result.stops}
Fare: ₹${result.fare}

Reply:
0 - Main Menu
9 - Back`
    });
  }

  if (parsed.type === "time") {
    const result = findRoute(parsed.from, parsed.to);

    if (!result) {
      return res.json({
        reply: "Travel time not found. Please check station names."
      });
    }

    return res.json({
      reply: `⏱️ Travel Time Details

From: ${result.from}
To: ${result.to}

Stops: ${result.stops}
Approx Travel Time: ${result.travelTime} mins

Reply:
0 - Main Menu
9 - Back`    });
  }

  if (parsed.type === "route") {
    const result = findRoute(parsed.from, parsed.to);

    if (!result) {
  return res.json({
    reply: `❌ Route not found.

${getSuggestionMessage(parsed.from, parsed.to)}`
  });
}

    return res.json({
      reply: formatRouteMessage(result)
    });
  }

  res.json({
  reply: `Sorry, I couldn't understand.

Try:
Airport to Vadapalani
Fare from Airport to Vadapalani
Time from Airport to Vadapalani
Timings Airport`
});
});
function handleBotMessage(userId, incomingMessage) {
  const text = incomingMessage.trim();
  const lowerText = text.toLowerCase();

  if (!userSessions[userId]) {
    userSessions[userId] = {};
  }

  const session = userSessions[userId];
  if (text === "0") {
  userSessions[userId] = {};

  return `🚇 Chennai Metro Bot

Choose an option:
1. Find Route
2. Check Fare
3. Travel Time
4. First & Last Train

You can also type:
Airport to Vadapalani
Fare from Airport to Vadapalani
Time from Airport to Vadapalani
Timings Airport`;
}

if (text === "9") {
  if (session.action) {
    userSessions[userId] = {};
  }

  return `🚇 Chennai Metro Bot

Choose an option:
1. Find Route
2. Check Fare
3. Travel Time
4. First & Last Train`;
}
  if (lowerText === "hi" || lowerText === "hello" || lowerText === "menu") {
    userSessions[userId] = {};

    return `🚇 Chennai Metro Bot

Choose an option:
1. Find Route
2. Check Fare
3. Travel Time
4. First & Last Train

You can also type:
Airport to Vadapalani
Fare from Airport to Vadapalani
Time from Airport to Vadapalani
Timings Airport`;
  }

  if (text === "1") {
    session.action = "route";
    session.step = "from";

    return `Enter starting station:

Reply:
0 - Main Menu
9 - Back`;
  }

  if (text === "2") {
    session.action = "fare";
    session.step = "from";

    return `Enter starting station:

Reply:
0 - Main Menu
9 - Back`;
  }

  if (text === "3") {
    session.action = "time";
    session.step = "from";

    return `Enter starting station:

Reply:
0 - Main Menu
9 - Back`;
  }

  if (text === "4") {
    session.action = "timings";
    session.step = "station";

    return `Enter station name:

Reply:
0 - Main Menu
9 - Back`;
  }

  

  if (session.action === "route" && session.step === "from") {
    session.from = text;
    session.step = "to";

    return `Enter destination station:

Reply:
0 - Main Menu
9 - Back`;
  }

  if (session.action === "route" && session.step === "to") {
    const result = findRoute(session.from, text);
    userSessions[userId] = {};

    return result
      ? formatRouteMessage(result)
      : `❌ Route not found.

${getSuggestionMessage(session.from, text)}`;
  }

  if (session.action === "fare" && session.step === "from") {
    session.from = text;
    session.step = "to";

    return `Enter destination station:

Reply:
0 - Main Menu
9 - Back`;
  }

  if (session.action === "fare" && session.step === "to") {
    const result = findRoute(session.from, text);
    userSessions[userId] = {};

    return result
      ? `💰 Fare Details

From: ${result.from}
To: ${result.to}

Distance: ${result.distance} km
Stops: ${result.stops}
Fare: ₹${result.fare}

Reply:
0 - Main Menu
9 - Back`
      : `❌ Fare not found.

${getSuggestionMessage(session.from, text)}`;
  }

  if (session.action === "time" && session.step === "from") {
    session.from = text;
    session.step = "to";

    return `Enter destination station:

Reply:
0 - Main Menu
9 - Back`;
  }

  if (session.action === "time" && session.step === "to") {
  const result = findRoute(session.from, text);
  userSessions[userId] = {};

  return result
    ? `⏱️ Travel Time Details

From: ${result.from}
To: ${result.to}

Stops: ${result.stops}
Approx Travel Time: ${result.travelTime} mins

Reply:
0 - Main Menu
9 - Back`
    : `❌ Travel time not found.

${getSuggestionMessage(session.from, text)}`;
}

  if (session.action === "timings" && session.step === "station") {
    const stationTiming = timings[text] || timings.default;
    userSessions[userId] = {};

    return `🚆 Train Timings

Station: ${text}

First Train: ${stationTiming.firstTrain}
Last Train: ${stationTiming.lastTrain}

Reply:
0 - Main Menu
9 - Back`;
  }

  const parsed = parseMessage(text);

  if (parsed.type === "route") {
    const result = findRoute(parsed.from, parsed.to);

    return result
      ? formatRouteMessage(result)
      : `❌ Route not found.

${getSuggestionMessage(parsed.from, parsed.to)}`;
  }

  if (parsed.type === "fare") {
  const result = findRoute(parsed.from, parsed.to);

  return result
    ? `💰 Fare Details

From: ${result.from}
To: ${result.to}

Distance: ${result.distance} km
Stops: ${result.stops}
Fare: ₹${result.fare}

Reply:
0 - Main Menu
9 - Back`
    : `❌ Fare not found.

${getSuggestionMessage(parsed.from, parsed.to)}`;
}

  if (parsed.type === "time") {
  const result = findRoute(parsed.from, parsed.to);

  return result
    ? `⏱️ Travel Time Details

From: ${result.from}
To: ${result.to}

Stops: ${result.stops}
Approx Travel Time: ${result.travelTime} mins

Reply:
0 - Main Menu
9 - Back`
    : `❌ Travel time not found.

${getSuggestionMessage(parsed.from, parsed.to)}`;
}

  if (parsed.type === "timings") {
    const stationTiming = timings[parsed.station] || timings.default;

    return `🚆 Train Timings

Station: ${parsed.station}

First Train: ${stationTiming.firstTrain}
Last Train: ${stationTiming.lastTrain}

Reply:
0 - Main Menu
9 - Back`;
  }

  return `Sorry, I couldn't understand.

Try:
Airport to Vadapalani
Fare from Airport to Vadapalani
Time from Airport to Vadapalani
Timings Airport

or type "menu"`;
}
app.post(["/whatsapp", "/webhook"], express.urlencoded({ extended: false }), (req, res) => {
  const incomingMessage = req.body.Body || "";
  const userId = req.body.From || "unknown-user";

  const twiml = new MessagingResponse();

  let reply = "";

  try {
    reply = handleBotMessage(userId, incomingMessage);
  } catch (error) {
    console.error("Bot error:", error);
    reply = "Sorry, something went wrong. Type menu to restart.";
  }

  console.log("Incoming:", incomingMessage);
  console.log("User:", userId);
  console.log("Reply:", reply);

  twiml.message(reply);

  res.type("text/xml");
  res.send(twiml.toString());
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});