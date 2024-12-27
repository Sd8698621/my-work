// const fs = require('fs'); // File system module
// const simpleGit = require('simple-git'); // Git wrapper
// const moment = require('moment'); // Date/time formatting

// const FILE_PATH = './data.json'; // File to modify
// const REPO_PATH = '.'; // Path to your git repository
// const git = simpleGit(REPO_PATH); // Initialize simple-git

// // Function to simulate contributions
// async function simulateContributions(days) {
//     for (let i = 0; i < days; i++) {
//         const fakeDate = moment().subtract(i, 'days').format('YYYY-MM-DD'); // Generate a past date
//         const data = { date: fakeDate };

//         // Write the date to the file
//         fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

//         // Commit the change with a fake date
//         await git
//             .add(FILE_PATH)
//             .commit(`Commit for ${fakeDate}`, { '--date': `${fakeDate}T12:00:00` });
        
//         console.log(`Committed for date: ${fakeDate}`);
//     }

//     // Push all changes to the repository
//     await git.push();
//     console.log('All contributions pushed to the repository!');
// }

// // Run the script for the last 30 days
// simulateContributions(30).catch(console.error);
const fs = require('fs'); // File system module
const simpleGit = require('simple-git'); // Git wrapper
const moment = require('moment'); // Date/time formatting

const FILE_PATH = './data.json'; // File to modify
const REPO_PATH = '.'; // Path to your git repository
const git = simpleGit(REPO_PATH); // Initialize simple-git

// Function to simulate contributions for the past year
async function simulateContributionsForYear() {
    for (let i = 0; i < 500; i++) {
        const fakeDate = moment().subtract(i, 'days').format('YYYY-MM-DD'); // Generate a past date
        const data = { date: fakeDate };

        // Write the date to the file
        fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));

        // Commit the change with a fake date
        await git
            .add(FILE_PATH)
            .commit(`Commit for ${fakeDate}`, { '--date': `${fakeDate}T12:00:00` });

        console.log(`Committed for date: ${fakeDate}`);
    }

    // Push all changes to the repository
    await git.push();
    console.log('All contributions for the last year pushed to the repository!');
}

// Run the script
simulateContributionsForYear().catch(console.error);
