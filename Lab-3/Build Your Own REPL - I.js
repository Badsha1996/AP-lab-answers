const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask() {
  rl.question(">", (input) => {
    try {
      const result = eval(input);
      console.log(result);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }

    ask();
  });
}

ask();


// Used recursion to take input agian and again