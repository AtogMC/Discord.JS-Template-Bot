const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const prefix = "-";

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function setupCommands() {
    return new Promise(function(resolve, reject) {
        fs.readdir(`${__dirname}/commands`, (err, commands) => {
            if(err)return reject(err);
            commands.forEach(command => {
                if(!(command.split(".").pop() == "js")) return;
                let comando = require(`${__dirname}/commands/${command}`);
                client.commands.set(comando.help.name, require(`${__dirname}/commands/${command}`));
                console.log("[INFO] Registrered "+comando.help.name);
                comando.help.aliases.forEach(alias => {
                    client.aliases.set(alias, require(`${__dirname}/commands/${command}`));
                    console.log("[INFO] (Alias) Registrered "+alias);
                });
                resolve(true);
            });
        });
    });
}

client.on("ready", () => {
    setupCommands().then(() => {
        console.log("All commands has been registrered.");
    }).catch((err) => {
        console.error(err);
    });
    console.log("Started");
});

client.on("message", (msg) => {
    if(msg.author.bot || !msg.guild)return;

    let command = msg.content.split(" ")[0].slice(prefix.length);
    let args = msg.content.split(" ").slice(1);

    if(!client.commands.has(command) && !client.aliases.has(command))return msg.channel.send("Command not found");
    let comando = client.commands.get(command) || client.aliases.get(command);

    comando.run(client, msg, args);
    console.log(msg.author.tag+" Executed the command: "+command)
});

client.login('?');

module.exports = {
    client: client
}
