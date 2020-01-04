module.exports = class Bonzi extends require('../CommandHandler') {
    constructor() {
        super("bonzi");
    }

    command() {
        return {
            aliases: ["fact"],
            usage: this._dontChange().prefix + this.name + " <Text>",
            group: "memes",
            arguments() {
                return {
                    minArgs: 1,
                    maxArgs: -1
                }
            },
            permissions() {
                return [];
            },
            roles() {
                return [];
            },
            async run(client, msg, args) {
                const Jimp = require('jimp');
                if(!args[0])return msg.channel.send("Please provide something for Bonzi to say!")

                await msg.channel.startTyping()

                var text = msg.content.split(/\s+/g).slice(1).join(" ");
                var bonzi = await Jimp.read('src/assets/images/bonzi.png');
                var blank = await Jimp.read('src/assets/images/blank.png');
        
                var font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
        
                blank.resize(175, 120);
                var fact = blank.print(font, 0, 0, text, 175);
        
                bonzi.composite(fact, 23, 12);
                bonzi.getBuffer(Jimp.MIME_PNG, async(err, buffer) => {
                    if(err)return console.error(err);
                    await msg.channel.send({
                        files: [{
                            name: 'bonzi.png',
                            attachment: buffer
                        }]
                    })
                    await msg.channel.stopTyping()
                })
        
                return null;
            }
        }
    }
}