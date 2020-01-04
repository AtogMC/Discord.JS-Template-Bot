class CommandPrompt { // CopyRigth Atog/ 647594401203224586
    constructor(name) {
      this.name = name;
    }
    
    command() {
      return {
        aliases: [this.name],
        usage: "!"+this.name,
        group: "command",
        arguments() {
          return {
            minArgs: 0,
            maxArgs: -1
          }
        },
        permissions() {
          return [];
        },
        roles(){
            return [];
        },
        run(client, msg, args) {
          throw new Error("Please, add run(Class, Variable, String[]) to your command");
        }
      }
    }
    
    settings() {
        return {
            enabled: true,
            description: "A simple Atog Command",
            guildOnly: true
        }
    }
    
    _dontChange() {
        return {
            Discord() {
              return require('discord.js');
            },
            ms: require('ms'),
            prefix: require('../../src/index').prefix
        }
    }
    
    _proccessCommand(client, msg) {
      if(this.settings().enabled) {
          if(msg.channel.type === ("dm") && this.settings().guildOnly)return;
          const Discord = this._dontChange().Discord();
          let or = "or "+this.command().roles().join('`, `');
          let s = "";
          if(this.command().roles().length < 1)s = s+or;
          const err = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(":x: You no have permissions to execute this command.\nMissing: `"+this.command().permissions().join('`, `')+"` "+s);
          let alias = '';
          if(this.command().aliases.length < 1) {
              alias = 'No aliases detected';
          }else{
              alias = this.command().aliases.join(', ');
          }
          let requireRoles = '';
          if(this.command().roles().length < 1) {
              requireRoles = 'Role/s Required (Optional): `'+this.command().roles().join('`, `')+'`';
          }
          let usage = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setDescription(':warning: Correct Usage: **'+this.command().usage+'**\nAliases: `'+alias+'`\nPermissions: `'+this.command().permissions().join('`, `')+'`\n'+requireRoles)
          let permissed = true;
          let roled = true;
          let args = msg.content.split(' ').slice(1);
          this.command().permissions().forEach(permission => {if(permission.trim() != ""){permissed = msg.member.hasPermission(permission.toUpperCase());}});
          this.command().roles().forEach(role => {if(role.trim() != ""){roled = msg.member.roles.find(r => r.name === role)}});
          if(permissed || roled) {
          if((this.command().arguments().maxArgs == -1 ? false : args.length > this.command().arguments().maxArgs) || args.length < this.command().arguments().minArgs) return msg.channel.send(usage);
          this.command().run(client, msg, args);
          }else{
              msg.channel.send(err);
          }
      }else{
          msg.channel.send("This command is disabled.");
      }
      
    }
    
    commandName() {
      return this.name;
    }
    
  }
  module.exports = CommandPrompt;