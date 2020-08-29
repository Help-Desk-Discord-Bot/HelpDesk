const Discord = require("discord.js");

module.exports = {
    // Info
    name: 'delquestion',
    description: 'Delete a question from the #help-desk embed.',
    aliases: ['dquestion'],
    args: true,
    usage: '<question number>',
    cooldown: 5,
    // Basic checks
    guildOnly: true,
    // Command Category
    helpdesk: true,
    async execute(data, member, message, args, index) {
        let indexToDelete = args[0];
        if(isNaN(indexToDelete)) {
            message.client.errorEmbed.setDescription('You need to provide a correct number.');
            return message.channel.send(message.client.errorEmbed);
        }
        indexToDelete--;
        data.helpDesks[index].embedProperties.fields.splice(indexToDelete, 1);
        data.helpDesks[index].fieldsReplies.splice(indexToDelete, 1);
        await message.client.guildSchema.updateOne({guildID: message.guild.id}, {$set: { ['helpDesks.'+index]: data.helpDesks[index] }});
        message.client.replyEmbed.setDescription('Question deleted. Use `hd?update` to apply the changes.');
        await message.channel.send(message.client.replyEmbed);
    },
};