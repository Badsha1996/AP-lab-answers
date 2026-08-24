const path = require("path");
const fs = require("fs");
const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// THIS KEY YOU CAN GET FROM https://console.groq.com/home
const API_KEY = ""; // here inside the ""

async function getAIResponse(message) {
  const response = await fetch(
  "https://api.groq.com/openai/v1/chat/completions",
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "user", content: message }
      ]
    })
  }
);

const data = await response.json();
return data.choices[0].message.content;
}

const CHAT_PATH = path.join(__dirname, "chat.txt");


// THIS IS THE FIRST FUNCTION YOU HAVE TO WRITE 
// I HAVE USED appendFileSync but appendFile also works
function saveToFile(text) {
  fs.appendFileSync(CHAT_PATH, text + "\n")
}

// THIS ONE HAS COUPLE OF THINGS, DO NOT BE AFRAID
function startChat() {
  rl.question("You: ", async (message) => {
    // Exit condition
    if (message === "/exit") {
      console.log("Chat ended")
      rl.close()
      return
    }

    // Save user message
    saveToFile(`You: ${message}`)

    try {
      // Get AI response
      const aiResponse = await getAIResponse(message);

      // Display AI response
      console.log(`AI: ${aiResponse}`);

      // Save AI response
      saveToFile(`AI: ${aiResponse}`);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }


    // Continue the chat loop
    startChat()
  });
}

console.log("AI Chat Application Started!");
console.log("Type '/exit' to end the conversation.\n");

startChat();

