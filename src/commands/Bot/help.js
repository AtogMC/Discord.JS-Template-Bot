const Discord = require('discord.js');

module.exports = class Command extends require('../CommandHandler') {
    constructor() {
        super("help");
    }

    command() {
        return {
            aliases: ["ayuda"],
            usage: this._dontChange().prefix + this.name,
            group: "bot",
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
                let embed = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle("This is a **"+client.user.username+"**'s Help")
                .addField("__Commands:__", "**· `avatar` - View your discord avatar**", true)
                .setFooter(client.user.tag);
                msg.channel.send(embed);
            }
        }
    }
}
