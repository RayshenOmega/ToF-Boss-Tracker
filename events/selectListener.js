const { EmbedBuilder, Events, GuildMemberManager, GuildMemberRoleManager, ComponentType, SlashCommandBuilder } = require('discord.js');
var fs = require('fs');

//Respawn time (in seconds). Default is 3600 (1 hour). 
let seconds = 3600 //For debugging during setup, seconds = 60 is suggested. Don't forget to change it back afterwards!

// Create objects to store temporary timers and identifiers.
var timeouts = [];
var selected = {};
var reportMap = new Map ([]);

// \/\/\/\/\/\/\/\/\/\/\ Channel Selection \/\/\/\/\/\/\/\/\/\/\
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isStringSelectMenu()) return;        
        try {
            await interaction.deferUpdate();                // Acknowledge menu interaction.
            selected = interaction.values[0]                // get selected boss & channel request
            reportMap.set(interaction.user.id, selected)    // add request to global list of requests, with user id as the key
            //LogReportInfo();                              // Remove comment marker from this command if you prefer to recieve logs.

            // set a new 3s timer on the selection menu. If 3s pass without a followup button press, interaction expires and the request is deleted.
            ResetRequestTimer();
    } catch (error) {
        console.log(error);
        return
    }

    function LogReportInfo() {
        console.log(interaction.user.id + ` is issuing a report for ` + selected);
        console.log('PENDING REQUESTS');
        for (let requests of reportMap)
            console.log(requests);
    }

    function ResetRequestTimer() {
        const thread = interaction.customId;
        timeouts.indexOf(thread) === -1 ? timeouts.push(thread) : {};

        clearTimeout(timeouts[thread]);
        timeouts[thread] = setTimeout(function () {
            interaction.editReply({ content: '' });
            reportMap.delete(interaction.user.id);
        }, 3000);
    }
})

// \/\/\/\/\/\/\/\/\/\/\ 'Killed' button \/\/\/\/\/\/\/\/\/\/\
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'markDefeated')
        try {
            //Check that the user pressing the button has a pending request via the channel selection menu.
            const buttonUser = interaction.user.id;
            if (reportMap.has(buttonUser) === false) {   // Reject in case of missing or expired request.
                interaction.reply({content: prompt[interaction.locale] ?? `:flag_gb: You have not selected a Channel or took too long to push a button!
:flag_id:Kamu belum memilih saluran / channel atau terlalu lama untuk mengeklik tombol!`, ephemeral:true });
            return;}
            await interaction.deferUpdate();            // Acknowledge the menu interaction.
            const target = reportMap.get(buttonUser)    // Fetch button user's request from the reportMap.
            //console.log ('match found for ' + buttonUser + ', updating ' + target + '...')

            var { channel, bossTimerID, channelString, timestamp } = generateReport(interaction, target);
            await sendKillReport(channel, bossTimerID, channelString, timestamp, interaction);

        } catch(error) {
            return console.log(error);
    }
})      

// \/\/\/\/\/\/\/\/\/\/\ 'Mark Missing' Button \/\/\/\/\/\/\/\/\/\/\
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isButton()) return;
    if (interaction.customId === 'markMissing')
        try {
            //Check that the user pressing the button has a pending request via the channel selection menu.
            const buttonUser = interaction.user.id;
            if (reportMap.has(buttonUser) === false) {  // Reject in case of missing or expired request.
                interaction.reply({content: prompt[interaction.locale] ?? `:flag_gb: You have not selected a Channel or took too long to push a button!
:flag_id:Kamu belum memilih saluran / channel atau terlalu lama untuk mengeklik tombol!`, ephemeral:true });
            return;}

            await interaction.deferUpdate();            // Acknowledge the menu interaction.
            const target = reportMap.get(buttonUser)    // Fetch button user's request from the reportMap.
            //console.log ('match found for ' + buttonUser + ', updating ' + target + '...')

            var { channel, bossTimerID, channelString, timestamp } = generateReport(interaction, target);
            await sendMissingReport(channel, bossTimerID, channelString, timestamp, interaction);

        } catch(error) {
            return console.log(error);
    }
})
async function sendMissingReport(channel, bossTimerID, channelString, timestamp, interaction) {
    // Fetch the message by ID and update status.
    await channel.messages.fetch(bossTimerID).then(async (message) => {
        // Report Channel, status, relative and absolute reporting time(timezone-agnostic), and reporting user.
        (await message.edit(channelString + `:warning:   **[ 📣 : <t:${Math.floor(timestamp / 1000)}:R> ]**  (<@!${interaction.user.id}>)`));
        // Clear any old ongoing timers for the selected message.
        clearTimers(bossTimerID);;
    });
}

async function sendKillReport(channel, bossTimerID, channelString, timestamp, interaction) {
    // Fetch the message by ID and update status.
    await channel.messages.fetch(bossTimerID).then(async (message) => {
        // Report Channel, status, relative and absolute respawn time(timezone-agnostic), and reporting user.
        (await message.edit(channelString + `⚰️   **[╍╍╍╍╍╍]   🌱 <t:${Math.floor(timestamp / 1000) + seconds}:R> **   (<@!${interaction.user.id}>)`));
        // Clear any old ongoing timers for the selected message.
        clearTimers(bossTimerID);

        // Start a new timer to update status to "respawned" after (seconds + 5s buffer time) + progress bar that updates every 10 mins.        
        updateProgressBar(bossTimerID, message, channelString, timestamp, interaction);
    });
}

function updateProgressBar(bossTimerID, message, channelString, timestamp, interaction) {
    //10mins
    timeouts[bossTimerID + `1`] = setTimeout(async function () {
        (await message.edit(channelString + `⚰️   **[▰╍╍╍╍╍]   🌱 <t:${Math.floor(timestamp / 1000) + seconds}:R> **   (<@!${interaction.user.id}>)`));
    }, (1000 * (seconds * (1 / 6)))
    );

    //20mins
    timeouts[bossTimerID + `2`] = setTimeout(async function () {
        (await message.edit(channelString + `⚰️   **[▰▰╍╍╍╍]   🌱 <t:${Math.floor(timestamp / 1000) + seconds}:R> **   (<@!${interaction.user.id}>)`));
    }, (1000 * (seconds * (2 / 6)))
    );

    //30mins
    timeouts[bossTimerID + `3`] = setTimeout(async function () {
        (await message.edit(channelString + `⚰️   **[▰▰▰╍╍╍]   🌱 <t:${Math.floor(timestamp / 1000) + seconds}:R> **   (<@!${interaction.user.id}>)`));
    }, (1000 * (seconds * (3 / 6)))
    );

    //40mins
    timeouts[bossTimerID + `4`] = setTimeout(async function () {
        (await message.edit(channelString + `⚰️   **[▰▰▰▰╍╍]   🌱 <t:${Math.floor(timestamp / 1000) + seconds}:R> **   (<@!${interaction.user.id}>)`));
    }, (1000 * (seconds * (4 / 6)))
    );

    //50mins
    timeouts[bossTimerID + `5`] = setTimeout(async function () {
        (await message.edit(channelString + `⚰️   **[▰▰▰▰▰╍]   🌱 <t:${Math.floor(timestamp / 1000) + seconds}:R> **   (<@!${interaction.user.id}>)`));
    }, (1000 * (seconds * (5 / 6)))
    );

    //60mins
    timeouts[bossTimerID + `6`] = setTimeout(async function () {
        (await message.edit(channelString + `⚰️   **[▰▰▰▰▰▰]   🌱 <t:${Math.floor(timestamp / 1000) + seconds}:R> **   (<@!${interaction.user.id}>)`));
        await message.edit(channelString + `✅`);
    }, (1000 * seconds)
    );
}

function clearTimers(bossTimerID) {
    clearTimeout(timeouts[bossTimerID + `1`]);
    clearTimeout(timeouts[bossTimerID + `2`]);
    clearTimeout(timeouts[bossTimerID + `3`]);
    clearTimeout(timeouts[bossTimerID + `4`]);
    clearTimeout(timeouts[bossTimerID + `5`]);
    clearTimeout(timeouts[bossTimerID + `6`]);
}

function generateReport(interaction, target) {
    let rawdata = fs.readFileSync('./exports/BossMessageMap.json');
    let objdata = JSON.parse(rawdata);
    const bossTimers = new Map(Object.entries(objdata));
    // Generate elements to update the boss status message...
    // Timestamp
    const timestamp = Date.now();
    // Channel number
    const channel = client.channels.cache.get(interaction.channelId);
    const channelNumber = String(target.match(/\d+/g));
    let channelString = ``;
    switch (channelNumber) {
        case '1': {channelString = `**Ch 1:        ** `} break;
        case '2': {channelString = `**Ch 2:       ** `} break;
        case '3': {channelString = `**Ch 3:       ** `} break;
        case '4': {channelString = `**Ch 4:       ** `} break;
        case '5': {channelString = `**Ch 5:       ** `} break;
        case '6': {channelString = `**Ch 6:       ** `} break;
        case '7': {channelString = `**Ch 7:       ** `} break;
        case '8': {channelString = `**Ch 8:       ** `} break;
        case '9': {channelString = `**Ch 9:       ** `} break;
        case '10': {channelString = `**Ch 10:     ** `} break;
        case '11': {channelString = `**Ch 11:      ** `} break;
        case '12': {channelString = `**Ch 12:     ** `} break;
        case '13': {channelString = `**Ch 13:     ** `} break;
        case '14': {channelString = `**Ch 14:     ** `} break;
        case '15': {channelString = `**Ch 15:     ** `} break;
        case '16': {channelString = `**Ch 16:     ** `} break;
        case '17': {channelString = `**Ch 17:     ** `} break;
        case '18': {channelString = `**Ch 18:     ** `} break;
        case '19': {channelString = `**Ch 19:     ** `} break;
        case '20': {channelString = `**Ch 20:    ** `} break;
        case '21': {channelString = `**Ch 21:     ** `} break;
        case '22': {channelString = `**Ch 22:    ** `} break;
        case '23': {channelString = `**Ch 23:    ** `} break;
        case '24': {channelString = `**Ch 24:    ** `} break;
        case '25': {channelString = `**Ch 25:    ** `} break;
        case '26': {channelString = `**Ch 26:    ** `} break;
        case '27': {channelString = `**Ch 27:    ** `} break;
        case '28': {channelString = `**Ch 28:    ** `} break;
        case '29': {channelString = `**Ch 29:    ** `} break;
        case '30': {channelString = `**Ch 30:    ** `} break;
        case '31': {channelString = `**Ch 31:     ** `} break;
        case '32': {channelString = `**Ch 32:    ** `} break;
        case '33': {channelString = `**Ch 33:    ** `} break;
        case '34': {channelString = `**Ch 34:    ** `} break;
        case '35': {channelString = `**Ch 35:    ** `} break;
        case '36': {channelString = `**Ch 36:    ** `} break;
        case '37': {channelString = `**Ch 37:    ** `} break;
        case '38': {channelString = `**Ch 38:    ** `} break;
        case '39': {channelString = `**Ch 39:    ** `} break;
        case '40': {channelString = `**Ch 40:    ** `} break;
        case '41': {channelString = `**Ch 41:     ** `} break;
        case '42': {channelString = `**Ch 42:    ** `} break;
        case '43': {channelString = `**Ch 43:    ** `} break;
        case '44': {channelString = `**Ch 44:    ** `} break;
        case '45': {channelString = `**Ch 45:    ** `} break;
        case '46': {channelString = `**Ch 46:    ** `} break;
        case '47': {channelString = `**Ch 47:    ** `} break;
        case '48': {channelString = `**Ch 48:    ** `} break;
        case '49': {channelString = `**Ch 49:    ** `} break;
        case '50': {channelString = `**Ch 50:    ** `} break;
    }
    // Message ID
    let bossTimerID = bossTimers.get(target);
    return { channel, bossTimerID, channelString, timestamp };
}

const prompt = {
    fr: `Vous n'avez pas sélectionné un canal ou vous avez pris trop de temps pour sélectionner un bouton`,
	vi: `Bạn đã không chọn channel/mất quá nhiều thời gian để chọn`,
	th: `คุณไม่ได้เลือกแชนแนล หรือใช้เวลานานเกินไปในการกดปุ่ม`,
	ja: `チャンネルを選択していない・ボタンを押すの時間がかかりすぎた！`,
	'zh-CN': `您没有选择频道或按下按钮的时间过长！`,
	'zh-TW': `您没有选择频道或按下按钮的时间过长！`
}
