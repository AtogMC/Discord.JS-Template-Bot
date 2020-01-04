const Discord = require('discord.js');

module.exports = class Command extends require('../CommandHandler') {
    constructor() {
        super("avatar");
    }

    command() {
        return {
            aliases: [],
            usage: this._dontChange().prefix + this.name + " [mention]",
            group: "misc",
            arguments() {
                return {
                    minArgs: 0,
                    maxArgs: 1
                }
            },
            permissions() {
                return [];
            },
            roles() {
                return [];
            },

            run(client, msg, args) {
                let mention = msg.mentions.users.first() || client.users.get(args[0]);
                if(mention) {
                    let yourAvatar = new Discord.RichEmbed()
                    .setDescription("The avatar is [here]("+mention.displayAvatarURL+")")
                    .setImage(mention.displayAvatarURL)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                    .setTimestamp(new Date())
                    msg.channel.send(yourAvatar);
                }else{
                    let myAvatar = new Discord.RichEmbed()
                    .setDescription("Your avatar is [here]("+msg.author.displayAvatarURL+")")
                    .setImage(msg.author.displayAvatarURL)
                    .setAuthor(msg.author.tag, msg.author.displayAvatarURL)
                    .setTimestamp(new Date())
                    msg.channel.send(myAvatar);
                }
            }
        }
    }
}