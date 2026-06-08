function parseMessage(message) {
  const text = message.trim();

  const lowerText = text.toLowerCase();

  if (lowerText === "hi" || lowerText === "hello" || lowerText === "menu") {
    return {
      type: "menu"
    };
  }

  if (lowerText.startsWith("timing") || lowerText.startsWith("timings")) {
    const station = text.replace(/timings?/i, "").trim();

    return {
      type: "timings",
      station
    };
  }

  if (lowerText.includes("fare")) {
    const cleaned = text.replace(/fare from/i, "").replace(/fare/i, "").trim();
    const parts = cleaned.split(/\s+to\s+/i);

    return {
      type: "fare",
      from: parts[0]?.trim(),
      to: parts[1]?.trim()
    };
  }

  if (lowerText.includes("time")) {
    const cleaned = text.replace(/time from/i, "").replace(/time/i, "").trim();
    const parts = cleaned.split(/\s+to\s+/i);

    return {
      type: "time",
      from: parts[0]?.trim(),
      to: parts[1]?.trim()
    };
  }

  if (lowerText.includes(" to ")) {
    const parts = text.split(/\s+to\s+/i);

    return {
      type: "route",
      from: parts[0]?.trim(),
      to: parts[1]?.trim()
    };
  }

  return {
    type: "unknown"
  };
}

module.exports = {
  parseMessage
};