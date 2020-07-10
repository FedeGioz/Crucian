const Command = require('../../structures/Command.js');
const moment = require('moment');

class Reminder extends Command {
    constructor(file) {
        super(file);
    }

    async run(message, args) {
        if (!args.length) {
            let { reminders } = message.member.info;

            if (!reminders.length) {
                message.reply(bot.lang.reminderEmpty);
                
                return;
            }
            
            let list = reminders
                .map(reminder => `${reminder.todo} - ${moment(reminder.timestamp).fromNow()}`)
                .join('\n');
            
            message.channel.send(bot.lang.reminderList.format(list), { split: true });
            
            return;
        }
        
        let todo = args.join(' '),
            id = message.author.id,
            timestamp = message.createdTimestamp;
        
        bot.info.push(message.member.fullId, { id, todo, timestamp }, 'reminders');
        
        message.reply(bot.lang.reminderSet.format(todo));
    }
}

module.exports = Reminder;
