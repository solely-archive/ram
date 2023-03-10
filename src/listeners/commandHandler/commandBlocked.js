const { Listener } = require('discord-akairo');
const Logger = require('../../util/Logger');

class CommandBlockedListener extends Listener {
  constructor() {
    super('commandBlocked', {
      event: 'commandBlocked',
      emitter: 'commandHandler',
      category: 'commandHandler',
    });
  }

  exec(message, command, reason) {
    const text = {
      owner: () => 'You must be the owner to use this command.',
      guild: () => 'You must be in a guild to use this command.',
    }[reason];

    Logger.log(`=> ${command.id} ~ ${reason}`, {
      tag: message.guild
        ? `${message.guild.name} (${message.guild.id}) by ${message.author.tag} (${message.author.id})`
        : `${message.author.tag}/PM`,
    });

    if (!text) return;
    if (message.guild ? message.channel.permissionsFor(this.client.user).has('SEND_MESSAGES') : true) {
      message.reply(`**::** ${text()}`);
    }
  }
}

module.exports = CommandBlockedListener;
