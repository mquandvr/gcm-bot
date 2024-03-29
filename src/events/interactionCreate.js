
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        console.log("call interaction")
        if (interaction.isAutocomplete()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return;

            if (!command.autocomplete) {
                return console.error('No autocomplete handler was found');
            }

            try {
                console.log("run autocomplete");
                await command.autocomplete(interaction, client);
            } catch (error) {
                console.log(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true
                });
            }
        }

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return console.log('Command was not found');

            try {
                console.log("run execute input command")
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }

        if (interaction.isButton()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) return console.log('Command was not found');

            try {
                console.log("run execute button")
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: 'There was an error while executing this command!',
                    ephemeral: true,
                });
            }
        }

    },
};