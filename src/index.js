const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const prefix = "-";

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

function setupCommands() {
    return new Promise(function(resolve, reject) {
        fs.readdir(`${__dirname}/commands`, (err, categories) => {
            if(err)return reject(err);
            categories.forEach(category => {
                if(category !== "CommandHandler.js") {
                    fs.readdir(`${__dirname}/commands/${category}`, (err, commands) => {
                        if(err)return reject(err);
                        commands.forEach(command => {
                            if(!(command.split(".").pop() == "js")) return;
                            let cmd = require(`${__dirname}/commands/${category}/${command}`);
                            let comando = new cmd();
                            client.commands.set(comando.commandName(), require(`${__dirname}/commands/${category}/${command}`));
                            console.log("[INFO] Registrered "+comando.commandName());
                            comando.command().aliases.forEach(alias => {
                                client.aliases.set(alias, require(`${__dirname}/commands/${category}/${command}`));
                                console.log("[INFO] (Alias) Registrered "+alias);
                            });
                            resolve(true);
                        });
                    });
                }
                
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
    let Command = new comando();
    Command._proccessCommand(client, msg);
    console.log(msg.author.tag+" Executed the command: "+command)
});

client.login('NjYyOTg0ODk4MTg4OTM1MTc4.XhB8Rg.6aNoMiWbYd_nfwZiHzR5ZVh1UtE');

module.exports = {
    client: client,
    prefix: prefix
}