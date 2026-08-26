const EventEmitter = require('events');
const readline = require('readline');

const chatSystem = new EventEmitter();

chatSystem.on('messageReceived', (data) => {
    console.log(`\n🔔 [Notification]: New message from ${data.username}!`);
    console.log(`💬 "${data.text}"`);
    console.log(`----------------------------------------\n`);
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function handleNextMessage() {
    rl.question('Enter sender name (or type "exit" to quit): ', (nameInput) => {
        // EXIT CLOSE THE QUESTION PROCESS, and RETURN the function
        if (nameInput === "exit") {
            console.log("Goodbye!");
            rl.close();
            return;
        }

        const currentName = nameInput.trim() || 'Anonymous';

        rl.question(`Type message for ${currentName}: `, (messageInput) => {
            chatSystem.emit('messageReceived', {
                username: currentName,
                text: messageInput
            });
            

            // RECURSION CALL TO RUN THE CODE AGAIN AND AGAIN
            handleNextMessage();
        });
    });
}

console.log("=== WELCOME TO THE CHAT HUB ===");
handleNextMessage();

// DO NOT MODIFY BELOW THIS LINE
module.exports = { chatSystem, rl, handleNextMessage };