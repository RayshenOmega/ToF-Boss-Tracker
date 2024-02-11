### Tower of Fantasy Discord Boss Tracker Bot
## About

This is a fork of SloneFallion's original [World Boss Tracker Bot](https://github.com/SloneFallion/tof-boss-tracker) for Tower of Fantasy, which has been heavily modified by Aestral Noa's English Community Discord server. And futher modded by Raysen.

**Changes from the original:**

#### Interface
* Replaced sorted-by-time view with a status update system.
* Boss timers are shown in `time left to respawn` rather than `time of last reported defeat`
* To mitigate misclick and fat-finger errors, marking kills now requires a two step process of selecting a channel and then pushing a confirmation button.
* Added a `Missing` button to alert others when a boss in a particular channel was sniped without a corresponding kill report. Helps prevent TPs from going to waste.
#### New commands
* Added a `/setup` command to be used in place of `/say` for setting up boss status timers in their respective threads.
* Added a `/clear` command to remove old tracker setups during updates.
* Boss Message IDs are automatically loaded into a seperate .json file, so no manual copy-pasting is required. Simply restart the bot once everything is set up.
#### Documentation
* Updated setup instructions specific to this fork.

## Changelog



### Fixes to V1.1.5
  *  Added Domain Nine bosses Fei Lian & Pod 8 Ying Zhao.

<details>
  <summary> 
 V1.1.4
  </summary>
 
 Fixes to V1.1.4:
  *  Added Domain Nine bosses Merbelle, Xingtian.
  *  Edited the `/about` To include my info.
 </details>

<details>
  <summary> 
 V1.1.3
  </summary>
 
 Fixes to V1.1.3:
  *  Added Domain Nine bosses Zhuyan, Black Crow and Taotie.
  *  Reworked interaction code to support expanded channel capacity (up to 50 channels)
 </details>
    
<details>
  <summary> 
 V1.1.2
  </summary>
 
 Fixes to V1.1.2:
  *  Removed old setup code that was casuing `/setup` to not execute properly.
 </details>
 
<details>
  <summary> 
  V1.1.1
  </summary>
 
  Fixes to V1.1.1:
  * Fixed an error in the readme containing wrong instructions on setting bot permissions.
  * Fixed respawn timer for bosses being set to 60s.
 </details>

<details>
  <summary> 
  V1.1.0 
  </summary>
 
  * Further modified the method of obtaining and updating boss info and message IDs. 
  * Now, future updates and modifications such as channel changes and addition of new bosses can be done from a single file bossConfig.js, which will be loaded dynamically upon command execution.
  * Readme was updated to reflect the changes.
</details>

<details>
  <summary> 
  V1.0.0 
  </summary>

  * Initial release

</details>

## Pre-requisites
A Discord account with [developer mode enabled](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) and Node.JS.
If you're not familiar with Node.JS or working with developer applications and Bots on Discord, please see [this guide](https://discordjs.guide/preparations) and follow the sections below.  
* [Installing Node.js](https://discordjs.guide/preparations/#installing-node-js)  
* [Setting up a bot application](https://discordjs.guide/preparations/setting-up-a-bot-application.html)  
* [Adding your bot to servers](https://discordjs.guide/preparations/adding-your-bot-to-servers.html)

## Initial Bot Setup
1. Clone or [download](https://github.com/Jokoril/tof-boss-tracker-AN/archive/refs/heads/main.zip) the repository.
2. Edit `.env` to supply the necessary values.
3. In a terminal, change to the directory.
4. Run `npm install discord.js dotenv`.
5. Run `node deploy.js` to deploy commands.
6. Run `node index.js` to start the bot (for automatic startup and recovery, I recommend [PM2](https://pm2.keymetrics.io)).

## Configuring the Bot
1. Find out beforehand how many channels your in-game server has for each region. By default, the bot is configured for:
  * Aesperia bosses (16)
  * Artificial Island bosses (2)
  * Vera bosses (10)
  * Confounding Abyss bosses (8)
  * Innars bosses (20)
  
2. Edit `exports/bossConfig.js` if boss properties need to be updated or modified . Then, restart the bot.

## Discord Setup
1. Create a new forum in your Discord server and give it the following permissions:  
* Everyone:
  * Deny ALL
* Bot
  * Allow Send Messages in Posts
  * Allow Embed Links
  * Allow Manage Messages
  * Allow Read Post History

2. Start the bot if it has not yet been started.

3. For each boss:

   Create a forum post with the title of the boss and your preferred picture of the boss.  
  
    >Optional: If you want the boss tracker forum to be sorted alphabetically, it is recommended that you set the forum sort order to Creation Time, then post the bosses  in alphabetically reversed order (Z-A). <br /> <br />
    Alternatively, you can create a pinned thread / channel containing links to each boss thread for one-stop navigation. Tagging the bosses based on region also helps.

   Use the `/setup` command to generate placeholder messages.
   
   `/setup boss:<boss>`

4. For each boss:

    Use the /interaction command after the placeholder messages have been created.

    `/interaction boss_menu:<boss>`


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

## Updating bosses and channels
**Bosses**

All required boss properties are stored within `exports/bossConfig.js`. If there are changes to the channels present, or new bosses are added in the future, simply add, remove or modify the required properties and array entries.

**Status Messages**

Boss Message IDs are stored within the `exports/BossMessageMap.json` file, but do not require manual editing and can be updated via the `/setup` command.

If additional channels are opened (i.e Artificial Island goes from 2 channels to 4), it is recommended to `/clear` and recreate the existing messages and interaction menus on the affected boss threads in order to preserve formatting.

If channels for a region are closed, simply delete the excess messages from the affected boss thread. Then, delete and recreate the interaction menu to update the number of selectable channels.

## Screenshots
[![](https://i.imgur.com/kirOWGB.png)](https://i.imgur.com/kirOWGB.png)
[![](https://i.imgur.com/8EQi9Lz.png)](https://i.imgur.com/8EQi9Lz.png)
[![](https://i.imgur.com/SIt1skc.png)](https://i.imgur.com/SIt1skc.png)

## License
[MPL-2.0](https://choosealicense.com/licenses/mpl-2.0/)
