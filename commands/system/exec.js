const Command = require('../../structures/Command.js');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

class Exec extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        let cmd = args.join(' ');

        try {
            let { stdout: res } = await exec(cmd);

            message.channel.send(bot.lang.shellMessage.format(cmd, res), {
                split: true 
            });
        } catch (e) {
            bot.logger.error(e.stderr || e.message);
            message.channel.send(bot.lang.somethingWentWrong.random());
        }
    }
}

module.exports = Exec;
