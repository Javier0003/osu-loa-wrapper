# osu-loa-wrapper 🎶🖱️💀🔥💯

[![NPM Version](https://img.shields.io/npm/v/osu-loa-wrapper.svg)](https://www.npmjs.com/package/osu-loa-wrapper)
[![License](https://img.shields.io/npm/l/osu-loa-wrapper.svg)](https://opensource.org/licenses/ISC)
<!-- Add other badges lol idk ✨💅 -->

AYOOO 👋 It's a TypeScript wrapper for the osu! API v2 thingy 🤯, making it like, *way* easier to grab beatmap and user data 🙏. It even does the whole OAuth token dance for you AUTOMATICALLY ✨💃. No cap 🧢.

_(Disclaimer tho 📢: The package.json lowkey says "it isn't done yet" 🚧 so like, don't blame me if it's kinda scuffed 💀)_

## Features 🚀📈🤯 WHAT IT DOES THO??

*   ✅ Easy setup with your osu! API v2 Client ID and Secret 🤫 (don't leak ittt)
*   🔑 Auto token fetching AND refreshing 💅. It just *works* ✨ (most of the time? 🤔)
*   ♻️ If the token expires 💀? It retries. Like, calm down bro, it's got this 🙏💯.
*   📊 GET ALL THE THINGS 👇:
    *   Beatmap details by ID (`GetMapById`) 👉🗺️
    *   Beatmap difficulty with mods/rulesets (`checkDifficultyRating`) 👉💪⭐
    *   User data by ID (`getUserData`) 👉👤📈
    *   User recent scores (`getOsuRecent`) 👉⏱️🏆
    *   User scores on a specific map (`userScores`) 👉🎯💯
    *   User recent activity (`getUserRecentActivity`) 👉📰👀
*   📘 FULL TypeScript support 🤓📚 cuz we smart like that (allegedly).
*   🔢 Lil' helper `addPointToNumbers` to make big numbers look ✨pretty✨ (commas ftw).

## Installation 📦📥 GET IT NOWWW

```bash
npm install osu-loa-wrapper 😩🙏
# or maybe likeeee
yarn add osu-loa-wrapper ✨💅
```

## Prerequisites 🔑 YOU NEED THIS STUFF FR FR

Gotta get an OAuth app on the osu! website for that Client ID / Secret combo 😤.

1.  Go here 👉 `https://osu.ppy.sh/home/account/edit` (your osu! settings obvi)
2.  Scroll waaaay down to "OAuth" 🖱️👇.
3.  Smash that "New OAuth Application" button 🔥.
4.  Type some stuff ⌨️ (App Name, Website - just put `http://localhost` who cares lol).
5.  BOOM 💥 You get a **Client ID** (number 🔢) and **Client Secret** (text 🤫). **GUARD THAT SECRET WITH YOUR LIFE** 🔒💀 For real tho.

## Usage 💻⌨️🖱️ HOW TO USE IT (PAY ATTENTION‼️)

Bestie, put your ID and Secret in a `.env` file, okay? Don't just paste it in your code 🤮.

```typescript
// Import the things ✨
import { OsuClient, addPointToNumbers } from 'osu-loa-wrapper';
import dotenv from 'dotenv'; // Get this if you wanna use .env files 🙏

// Load the .env stuff (if you have it)
dotenv.config();

// Snag your secrets from the env ✨🤫
const clientId = Number(process.env.OSU_CLIENT_ID); // It's a number, remember? 🔢
const clientSecret = process.env.OSU_CLIENT_SECRET; // The secret text 🤫

// If you forgot them... 💀 Bruh.
if (!clientId || !clientSecret) {
  throw new Error('🚨 BRO WHERE ARE YOUR OSU_CLIENT_ID OR OSU_CLIENT_SECRET?? check your .env 😩');
}

// MAKE THE CLIENT OBJECT 🤖✨
const osuClient = new OsuClient(clientId, clientSecret);

// --- Okay now the fun part --- LETS GOOOO 🔥🔥🔥

async function runExamples() {
  try {
    // --- Beatmap Stuff 🗺️ ---
    const beatmapId = 4942323; // Some map idk 🤷‍♀️ Sidetracked Day maybe?

    // Get map deets 📝
    console.log(`\nFetching map ${beatmapId}... 🗺️👀`);
    const beatmap = await osuClient.beatmap.GetMapById(beatmapId);
    console.log(`  Map Name: ${beatmap.beatmapset.title} [${beatmap.version}] 🔥`);
    console.log(`  Stars?: ${beatmap.difficulty_rating}* ✨`);
    console.log(`  Made by: ${beatmap.beatmapset.creator} 🙏`);

    // Get map stats WITH MODS 🤯 (DT + HD? Let's see 👀)
    console.log('\nCalculating DT + HD diff... 💪⭐');
    const attributes = await osuClient.beatmap.checkDifficultyRating(beatmapId, ['DT', 'HD'], 'osu');
    console.log(`  Star Rating (DT+HD): ${attributes.attributes.star_rating.toFixed(2)}* 📈`);
    console.log(`  Max Combo (DT+HD): ${attributes.attributes.max_combo} combo! 💯`);

    // --- User Stuff 👤 ---
    const userId = 2; // peppy? a legend fr fr 👑

    // Get user profile ✨
    console.log(`\nGetting user info for ID ${userId}... 👤🔍`);
    const userData = await osuClient.user.getUserData(userId);
    console.log(`  Username: ${userData.username} 🗣️`);
    console.log(`  Global Rank: ${userData.statistics.global_rank ? '#' + addPointToNumbers(userData.statistics.global_rank) : 'unranked? 💀'}`);
    console.log(`  PP: ${addPointToNumbers(Math.round(userData.statistics.pp))}pp 🚀`);
    console.log(`  Playcount: ${addPointToNumbers(userData.statistics.play_count)} plays 🤯`);

    // Get recent plays 🎮⏱️
    console.log(`\nChecking ${userData.username}'s recent plays... ⏱️👀`);
    const recentScores = await osuClient.user.getOsuRecent(userId);
    if (recentScores.length > 0) {
      const score = recentScores[0]; // The latest one ✨
      console.log(`  Latest play:`);
      console.log(`    🗺️ Map: ${score.beatmapset.title} [${score.beatmap.version}]`);
      console.log(`    📈 Score: ${addPointToNumbers(score.score)} (${score.rank}) +${score.mods.join('')}`);
      console.log(`    💸 PP: ${score.pp ? score.pp.toFixed(2) + 'pp' : 'No PP? 😭'}`);
    } else {
      console.log('  Bruh has no recent plays 💀😂');
    }

    // Get scores on THAT ONE MAP 🎯
    console.log(`\nDid ${userData.username} play map ${beatmapId}? Let's see... 🏆🤔`);
    const userScoresOnMap = await osuClient.user.userScores(beatmapId, userId);
    if (userScoresOnMap.scores.length > 0) {
        const bestScore = userScoresOnMap.scores[0]; // Their best try probably 🙏
        console.log(`  Best score on this map:`);
        console.log(`    📈 Score: ${addPointToNumbers(bestScore.score)} (${bestScore.rank}) +${bestScore.mods.join('')}`);
        console.log(`    💸 PP: ${bestScore.pp ? bestScore.pp.toFixed(2) + 'pp' : 'No PP 😭'}`);
    } else {
        console.log(`  Nah, ${userData.username} didn't play map ${beatmapId}. 💀 L`);
    }

    // Get recent activity feed 📰👀
    console.log(`\nWhat has ${userData.username} been up to?? 📰🕵️`);
    const recentActivity = await osuClient.user.getUserRecentActivity(userId, { limit: 5 }); // Just the last 5 things pls 🙏
    if (recentActivity.length > 0) {
         console.log('  Recent stuff:');
         recentActivity.forEach(activity => {
            let detail = '';
            if (activity.beatmap) {
                detail = `on map "${activity.beatmap.title}" 🗺️`;
            } else if (activity.user) {
                detail = `with user ${activity.user.username} 🤝`; // lol imagine friends
            }
            // This looks kinda weird but whatever 🤪
            console.log(`    - [${activity.type}] Rank ${activity.rank || 'N/A'} ${detail} (${new Date(activity.createdAt).toLocaleDateString()}) 📅`);
         });
    } else {
         console.log('  User is AFK? 😴 No recent activity.');
    }

  } catch (error) {
    // OOF 💀 something broke
    console.error('\n--- ❌😭 ERROR ALERT 😭❌ ---');
    console.error(error); // Log the bad stuff 📝
  }
}

runExamples(); // RUN ITTTT 💨💨💨

// --- Utility Function Example --- Just showing off ✨
const largeScore = 123456789; // Big number! 🤯
console.log(`\nBig number formatted: ${addPointToNumbers(largeScore)} ✨`); // Output: 123,456,789 (wow! 🤩)
```

## API Reference 📚🤓 (The Boring Stuff)

Main thing is `OsuClient` class. Got it? Good 👍.

*   `new OsuClient(clientId: number, clientSecret: string)`: Makes the client 🤖. You need ID and Secret 🔑.
*   `osuClient.beatmap`: For map stuff 🗺️.
    *   `GetMapById(id: number)`: Get map by ID 🔢.
    *   `checkDifficultyRating(id: number, mods: mods[], ruleset: Ruleset)`: Calculate diff with mods 💪⭐.
*   `osuClient.user`: For user stuff 👤.
    *   `getOsuRecent(userId: number)`: User's last plays ⏱️.
    *   `userScores(mapId: number, osuId: number)`: User's scores on one map 🎯.
    *   `getUserData(userId: number)`: Get user profile info ✨.
    *   `getUserRecentActivity(userId: number, params?)`: What they did recently 📰👀.
*   `addPointToNumbers(num: number)`: Makes numbers pretty with commas ✨🔢.

Need more deets? Check the `src/types/` folder 📁 or the `dist/index.d.ts` file 📄. Go read 🤓.

## Development 🛠️💻 (If you wanna mess with the code)

1.  Clone the repo: `git clone <repository-url>` duh 🙄.
2.  `cd javier0003-osu-loa-wrapper` 📂.
3.  Install the node_modules stuff 📦:
    ```bash
    pnpm install # classic 🙏
    ```
4.  Make a `.env` file in the main folder 📄. Put your secrets in it:
    ```env
    OSU_CLIENT_ID=YOUR_ID_HERE_123
    OSU_CLIENT_SECRET=YOUR_SECRET_HERE_🤫
    ```
5.  **Run Tests:**🧪 Does it even work? 🤔
    ```bash
    pnpm test
    ```
6.  **Build:**🏗️ Make the JS files for the plebs ✨.
    ```bash
    pnpm build
    ```
7.  **Run Dev:** ▶️ Test your changes live 🔥.
    ```bash
    pnpm dev
    ```

## Contributing 🤝🥺👉👈

Wanna help? Cool beans 😎. Found a bug 🐛? Make an issue. Got code 💻? Make a PR 🙏. Let's make this thing less scuffed together 💪🔥💯.

## License 📄⚖️

It's [ISC License](LICENSE). Idk what that means but it's there 👍. Free to use ig? 🤷‍♀️
