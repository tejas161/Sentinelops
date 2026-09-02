const events = {
  LOGIN_SUCCESS: {
    severity: "INFO",
    type: "LOGIN_SUCCESS",
  },

  LOGIN_FAILURE: {
    severity: "WARN",
    type: "LOGIN_FAILURE",
  },

  BRUTE_FORCE: {
    severity: "CRITICAL",
    type: "BRUTE_FORCE",
  },

  PORT_SCAN: {
    severity: "HIGH",
    type: "PORT_SCAN",
  },

  PRIVILEGE_ESCALATION: {
    severity: "HIGH",
    type: "PRIVILEGE_ESCALATION",
  },

  MALWARE_DETECTED: {
    severity: "CRITICAL",
    type: "MALWARE_DETECTED",
  },
};

module.exports = events;