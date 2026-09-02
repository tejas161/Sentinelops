const crypto = require("crypto");
const events = require("./events");

const users = [
  "alice",
  "bob",
  "charlie",
  "admin",
];

const sourceIps = [
  "10.0.0.21",
  "10.0.0.35",
  "10.0.0.42",
  "203.0.113.42",
  "198.51.100.17",
];

const services = [
  "auth-service",
  "payment-service",
  "customer-service",
];

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function generateEvent() {
  const eventTypes = Object.keys(events);
  const type = randomItem(eventTypes);
  const definition = events[type];

  const baseEvent = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    type: definition.type,
    severity: definition.severity,
  };

  switch (type) {
    case "LOGIN_SUCCESS":
      return {
        ...baseEvent,
        user: randomItem(users),
        source_ip: randomItem(sourceIps),
        status: "success",
      };

    case "LOGIN_FAILURE":
      return {
        ...baseEvent,
        user: randomItem(users),
        source_ip: randomItem(sourceIps),
        status: "failed",
      };

    case "BRUTE_FORCE":
      return {
        ...baseEvent,
        user: "admin",
        source_ip: randomItem(sourceIps),
        failed_attempts: Math.floor(Math.random() * 200) + 50,
      };

    case "PORT_SCAN":
      return {
        ...baseEvent,
        source_ip: randomItem(sourceIps),
        ports: [22, 80, 443, 8080],
      };

    case "PRIVILEGE_ESCALATION":
      return {
        ...baseEvent,
        user: randomItem(users),
        source_ip: randomItem(sourceIps),
        action: "sudo",
        target: "root",
      };

    case "MALWARE_DETECTED":
      return {
        ...baseEvent,
        service: randomItem(services),
        pod: `${randomItem(services)}-${Math.floor(Math.random() * 99999)}`,
        detection: "suspicious_process",
      };

    default:
      return baseEvent;
  }
}

function startEventGenerator(interval = 3000) {
  setInterval(() => {
    const event = generateEvent();

    console.log(JSON.stringify(event));
  }, interval);
}

module.exports = {
  generateEvent,
  startEventGenerator,
};