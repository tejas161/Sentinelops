const express = require("express");
const { startEventGenerator } = require("./event-generator");

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

app.listen(PORT, () => {
  console.log(`SentinelOps running on port ${PORT}`);

  // Generate a security event every 3 seconds.
  startEventGenerator(3000);
});