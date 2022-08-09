const { Client, Intents } = require('discord.js');
const { token } = require('../EdgarBot/config.json');

const discordClient = new Client({intents: [Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILDS],
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'MEMBERS'],
  });

discordClient.login(token);

  discordClient.on('ready', () => {
    console.log('Ready');


    (async function() {
        console.log('Okay');
        let guilds = discordClient.guilds.cache;
        
for (let guild of guilds.values()) {
    
    let role = guild.roles.cache.find(role => role.name === "Member");
    console.log(role.name);
    let c = await guild.members.fetch();
    guild.members.fetch().then(async members => {
        for (const member of members.values()) {
            console.log(member.user.username);
            console.log(member.roles.cache.has(role.id));
            if(member.roles.cache.has(role.id) == false) {
                await member.roles.add(role);
                await delay(3000);
            }
//            
        }
    });
    // c.forEach(async member => {
    //     console.log(member);
    //     // member.roles.add(role);
    //     // await delay(5000);
    //     await delay(2000);
       
    // })
  }
        // discordClient.guilds.cache.forEach(guild => {
        //     console.log(guild);
        //     let p = guild.members.fetch();
        //     console.log(p);
        //     let members = await p;
        //     console.log(members);
        //     guild.members.fetch().then(async members => {
        //         Object.entries(members).forEach(([k, v]) => {
        //             console.log(v);
        //         });
        //     });

        // });
  })()
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}