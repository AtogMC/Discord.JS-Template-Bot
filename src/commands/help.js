const Discord = require('discord.js');

module.exports.run = async(client, msg, args) => {
    if(args.length > 0)return msg.channel.send(":x: Incorrect usage");
    let embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle("This is a "+client.user.username+"'s Help")
    .addField("__Commands:__", "Soon", true)
    .setFooter(client.user.tag);
    msg.channel.send(embed);
}

module.exports.help = {
    name: "help",
    aliases: ["ayuda"]
}