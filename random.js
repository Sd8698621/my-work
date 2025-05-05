const fs = require('fs');
const simpleGit = require('simple-git');
const moment = require('moment');

const FILE_PATH = './data.json';
const REPO_PATH = '.';
const git = simpleGit(REPO_PATH);

// Generate a random integer between min and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate a random date within the past 365 days
function getRandomPastDate() {
    const daysAgo = getRandomInt(0, 30);
    return moment().subtract(daysAgo, 'days').format('YYYY-MM-DD');
}

async function simulateRandomContributions() {
    const randomDate = getRandomPastDate();
    const contributionCount = getRandomInt(1, 10); // Random number of contributions between 1 and 10

    console.log(`Simulating ${contributionCount} contributions on ${randomDate}`);

    for (let i = 0; i < contributionCount; i++) {
        const data = { date: randomDate, count: i + 1 };
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
        
        await git
            .add(FILE_PATH)
            .commit(`Random Commit ${i + 1} on ${randomDate}`, { '--date': `${randomDate}T12:00:00` });

        console.log(`Commit ${i + 1} created for ${randomDate}`);
    }

    await git.push();
    console.log(`All ${contributionCount} random contributions pushed for ${randomDate}.`);
}

simulateRandomContributions().catch(error => {
    console.error(error);
});
