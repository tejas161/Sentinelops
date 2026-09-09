const express = require("express");
const { startEventGenerator } = require("./event-generator");

const expressPackage = require("express/package.json");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "SentinelOps",
    status: "online",
    message: "Cyber Incident Response Simulator",
  });
});

app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

app.get("/incident", (req, res) => {
  res.status(200).json({
    severity: "CRITICAL",
    type: "VULNERABILITY_DETECTED",
    package: "express",
    current_version: expressPackage.version,
    recommended_action: "upgrade",
    message:
      "Critical vulnerability found in express package. Please upgrade to the latest version available.",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`SentinelOps running on port ${PORT}`);

  // Generate a security event every 3 seconds.
  startEventGenerator(3000);
});