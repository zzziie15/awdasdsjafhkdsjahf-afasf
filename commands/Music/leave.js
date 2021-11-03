const { joinVoiceChannel } = require("@discordjs/voice")

module.exports = {
    name: "leave",
    description: "Leave voice channel",
    timeout: 5000,
    run: async (interaction, client) => {
        const voiceChannel = interaction.member.voice.channel
        if (!voiceChannel) {
            return interaction.reply({ content: "먼저 채널에 가입해주세요!", ephemeral: true })
        }
        if (interaction.member.guild.me.voice.channelId !== interaction.member.voice.channelId) {
            return interaction.reply({ content: "아직 채널에 안나갔습니다.", ephemeral: true })
        }

        const connection = joinVoiceChannel({
            channelId: interaction.member.voice.channelId,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator
        })
        connection.destroy()
        await interaction.reply("***성공적으로 채널에서 떠났습니다!***")
    }
}
