### Tower of Fantasy Discord Boss Tracker Bot (AN Edition)
## About

This is a fork of SloneFallion's original [World Boss Tracker Bot](https://github.com/SloneFallion/tof-boss-tracker) for Tower of Fantasy, which has been heavily modified for Aestral Noa's English Community Discord server.

**Changes from the original:**

#### Interface
* Replaced sorted-by-time view with a status update system.
* Boss timers are shown in `time left to respawn` rather than `time of last reported defeat`
* To mitigate misclick and fat-finger errors, marking kills now requires a two step process of selecting a channel and then pushing a confirmation button.
* Added a `Missing` button to alert others when a boss in a particular channel was sniped without corresponding a kill report. Helps prevent TPs from going to waste.
#### New commands
* Added a `/setup` command to be used in place of `/say` for setting up boss status timers in their respective threads.
* Added a `/clear` command to remove old tracker setups during updates.
* Boss Message IDs are automatically loaded into a seperate .json file, so no manual copy-pasting is required. Simply restart the bot once everything is set up.
#### Documentation
* Updated setup instructions specific to this fork.

## Pre-requisites
A Discord account with [developer mode enabled](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) and Node.JS.
If you're not familiar with Node.JS or working with developer applications and Bots on Discord, please see [this guide](https://discordjs.guide/preparations) and follow the sections below.  
* [Installing Node.js](https://discordjs.guide/preparations/#installing-node-js)  
* [Setting up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html)  
* [Adding your bot to servers](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

## Initial Bot Setup
1. Clone or [download](https://github.com/SloneFallion/tof-boss-tracker/archive/refs/heads/main.zip) the repository.
2. Edit `.env` to supply the necessary values.
3. In a terminal, change to the directory.
4. Run `npm install discord.js dotenv`.
5. Run `node deploy.js` to deploy commands.
6. Run `node index.js` to start the bot (for automatic startup and recovery, I recommend [PM2](https://pm2.keymetrics.io)).

## Configuring the Bot
1. Find out beforehand how many channels your in-game server has for each region. By default, the bot is configured for:
  * Aesperia (16)
  * Artificial Island (2)
  * Vera (10)
  * Confounding Abyss (8)
  * Innars (20)
  
2. Edit `exports/bossMessageIDTemplates.js`, `commands/setup.js` and `commands/interaction.js` if you need to change the number of channels or add new bosses. Follow the instructions containted within the comments of each .js file. Then, restart the bot.

## Discord Setup
1. Create a new forum in your Discord server and give it the following permissions:  
* Everyone:
  * Deny ALL
* Bot
  * Deny ALL
  * Allow View Channel
  * Allow Read Post History
  * Allow Create Invite at your discretion

2. Start the bot if it has not yet been started.

3. For each boss:

   Create a forum post with the title of the boss and your preferred picture of the boss.  
  
    >Optional: If you want the boss tracker forum to be sorted alphabetically, it is recommended that you set the forum sort order to Creation Time, then post the bosses  in alphabetically reversed order (Z-A). 
    
    > Alternatively, you can create a pinned thread / channel containing links to each boss thread for one-stop navigation. Tagging the bosses based on region also helps.

    Use the `/setup` command to issue placeholder messages. Provide the boss and number of channels required in the sub-command fields. 

    `/setup boss:<boss> channels:<channels>`  

4. For each boss:

    Use the /interaction command after the placeholder messages have been created.  
    `/interaction create:Boss Timer bossmenu:<boss>`


## Production
1. Start the bot.
2. Set the forum permissions as follows:
* Everyone:
  * Deny ALL
  * Allow View Channel
  * Allow Read Post History
  * Allow Create Invite at your discretion
* Bot
  * No changes

3. You're ready to go!

## Testing and debugging
It is recommended to test out each button on one of the bosses to ensure that the buttons are working properly and boss statuses are being updated. 

In the event that boss status updates are not being reflected on the bot messages, try restarting or re-inviting the bot.

## Future Changes
#### Channels
If and when channels are removed or added from servers (usually after a patch), the files `commands/interaction.js` and `exports/bossMessageID.js` will need to be updated to reflect the channel availability.  

Specifically for adding new channels, placeholder messages may need to be regenerated for formatting reasons, as it will not show contiguously if new messages are added. Step 3 and 4 of Discord Setup will need to be repeated.  

#### Bosses
If and when new bosses are added to the game, you will need to update the files `commands/interaction.js`, `commands/setup.js` and `exports/bossMessageID.js`.

## Suggestion
Using an internal persistent database would save a lot of manual work on future updates regarding channel changes. Additionally, a single message embed could be used rather than many individual messages, which would allow for easy formatting changes. At this time, such a change is not being actively developed.

## Screenshots
[![](https://i.imgur.com/kirOWGB.png)](https://i.imgur.com/kirOWGB.png)
[![](https://i.imgur.com/8EQi9Lz.png)](https://i.imgur.com/8EQi9Lz.png)
[![](https://i.imgur.com/SIt1skc.png)](https://i.imgur.com/SIt1skc.png)

## License
[MPL-2.0](https://choosealicense.com/licenses/mpl-2.0/)