const mineflayer = require('mineflayer');
const accounts = [
    { username: 'name1' },
    { username: 'name2' },
    { username: 'name3'}]

function createBot(account) {
    const bot = mineflayer.createBot({
        host: 'mc.hypixel.net',
        auth: 'microsoft', 
        username: account.username,
        version: '1.8.9'
    });

    bot.once('spawn', () => {
        console.log(`${account.username} has logged in!`);
        
        setTimeout(() => {
            bot.chat('/play duels_sumo_duel');
        }, 2000 + Math.random() * 1000);
    });

    bot.on('message', (jsonMsg) => {
        const message = jsonMsg.toString();
        
        if (message.includes('The game starts in 1 second!')) {
            console.log(`${account.username}'s game almost starts..`);
            setTimeout(() => {
                bot.chat('/play duels_sumo_duel'); 
            }, 2000 + Math.random() * 1000);
        }
    });

    bot.on('error', (err) => {
        if (err.message.includes("Cannot read properties of undefined (reading 'passengers')")) {
            console.log(`${account.username} encountered a known entity error. Ignoring...`);
        } else {
            console.log(`${account.username} encountered an error: ${err.message}`);
        }
    });
    

    bot.on('end', (reason) => {
        console.log(`${account.username} disconnected: ${reason}`);
        setTimeout(() => {
            console.log(`${account.username} reconnecting...`);
            createBot(account);
        }, 5000);
    });
}

accounts.forEach(createBot);
