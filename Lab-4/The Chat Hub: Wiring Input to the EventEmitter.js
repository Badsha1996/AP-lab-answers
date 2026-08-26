const EventEmitter = require('events');
const readline = require('readline');

// The EventEmitter instance
const chatSystem = new EventEmitter();

// 1. The Listener
chatSystem.on('messageReceived', (data) => {
    console.log(`\n[Notification]: New message from ${data.username}!`);
    console.log(`"${data.text}"`);
    console.log(`----------------------------------------`);
});

// 2. The Input Interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// 3. Ask questions and Emit
rl.question('Enter sender name: ', (nameInput) => {
    const currentName = nameInput.trim() || 'Anonymous';

    rl.question(`Type message for ${currentName}: `, (messageInput) => {
        // LET US PASS the object that has username and text
        chatSystem.emit("messageReceived",{username: currentName, text: messageInput})

        rl.close();
    });
});

// DO NOT MODIFY BELOW THIS LINE
module.exports = { chatSystem, rl };