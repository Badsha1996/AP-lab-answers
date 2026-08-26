const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// TODO
rl.question("Enter sender name: ", (name) => {
  rl.question(`Type message for ${name}: `, (message) => {
    console.log(`Captured: ${name} wants to say "${message}"`);
    rl.close();
  });
});


module.exports = { rl };