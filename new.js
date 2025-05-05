const fs = require('fs');
const readline = require('readline');
const simpleGit = require('simple-git');
const moment = require('moment');

const FILE_PATH = './data.json';
const REPO_PATH = '.';
const git = simpleGit(REPO_PATH);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function simulateManualContributions() {
    const inputDate = await askQuestion('Enter the date (YYYY-MM-DD): ');
    const contributionCount = parseInt(await askQuestion('Enter number of contributions: '), 10);

    if (!moment(inputDate, 'YYYY-MM-DD', true).isValid()) {
        console.error('Invalid date format. Please use YYYY-MM-DD.');
        rl.close();
        return;
    }

    if (isNaN(contributionCount) || contributionCount <= 0) {
        console.error('Invalid contribution count. Must be a positive number.');
        rl.close();
        return;
    }

    for (let i = 0; i < contributionCount; i++) {
        const data = { date: inputDate, count: i + 1 };
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
        
        await git
            .add(FILE_PATH)
            .commit(`Commit ${i + 1} for ${inputDate}`, { '--date': `${inputDate}T12:00:00` });

        console.log(`Commit ${i + 1} created for ${inputDate}`);
    }

    await git.push();
    console.log(`All ${contributionCount} contributions pushed for ${inputDate}.`);

    rl.close();
}

simulateManualContributions().catch(error => {
    console.error(error);
    rl.close();
});
