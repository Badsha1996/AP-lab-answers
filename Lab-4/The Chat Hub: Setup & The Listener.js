const EventEmitter = require('events');

// TODO 1: 
const chatSystem = new EventEmitter();

// TODO 2: 
chatSystem.on('messageReceived', ({ username, text }) => {
    console.log(`[Notification]: New message from ${username}!`);
    console.log(`"${text}"`);
    console.log('----------------------------------------');
});

// DO NOT MODIFY BELOW THIS LINE
if (typeof chatSystem !== 'undefined') {
    chatSystem.emit('messageReceived', {
        username: 'TestUser',
        text: 'Hello Chunk 1!'
    });
}

module.exports = {
    chatSystem: typeof chatSystem !== 'undefined' ? chatSystem : null
};