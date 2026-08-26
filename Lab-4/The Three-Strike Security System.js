const { EventEmitter } = require("events");

const securitySystem = new EventEmitter();

let failedAttempts = 0;

securitySystem.on("failedLogin", () => {
    failedAttempts++;
    console.log(`Failed login attempt #${failedAttempts}`);

    if (failedAttempts === 3) {
        securitySystem.emit("lockout");
    }
});

securitySystem.on("lockout", () => {
    console.log("SECURITY CRITICAL: 3 failed attempts. Account locked down!");
});

securitySystem.emit("failedLogin");
securitySystem.emit("failedLogin");
securitySystem.emit("failedLogin");

module.exports = { securitySystem };
