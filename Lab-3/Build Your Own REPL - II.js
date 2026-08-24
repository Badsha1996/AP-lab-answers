const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function startREPL() {
  rl.question("> ", (input) => {
    switch (input) {
      case "/help":
        console.log(`Commands:
          /help
          /time
          /exit`);
        startREPL();
        break;

      case "/time":
        console.log(new Date().toString());
        startREPL();
        break;

      case "/exit":
        console.log("Bye!");
        rl.close();

      default:
        try {
          const result = eval(input);
          console.log(result);
        } catch (err) {
          console.log("Error:", err.message);
        }

        startREPL();
    }
  });
}

startREPL();

// YOU CAN REPLACE 'SWITCH' with if-else also and it will still work
