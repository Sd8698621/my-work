# Simulating GitHub Contributions for the Last Year

This project automates the creation of GitHub contributions by generating backdated commits over the past year. The script uses Node.js, Git, and some essential libraries to simulate daily activity.

---

## Features
- Commits for the last 365 days with unique dates.
- Modifies a JSON file (`data.json`) to ensure meaningful changes.
- Pushes all changes to a GitHub repository.

---

## Prerequisites
1. **Node.js** (Install from [Node.js Official Website](https://nodejs.org/))
2. **Git** (Install from [Git Official Website](https://git-scm.com/))
3. A GitHub repository (initialize or create one before running the script).

---

## Setup Instructions

### 1. Clone or Initialize a Repository
If you don’t already have a repository, initialize one:
```bash
git init
```

### 2. Install Dependencies
Install the required Node.js libraries:
```bash
npm install simple-git moment
```

### 3. Save the Script
Create a file named `contribute.js` and add the following code:

```javascript
const fs = require('fs'); // File system module
const simpleGit = require('simple-git'); // Git wrapper
const moment = require('moment'); // Date/time formatting

const FILE_PATH = './data.json'; // File to modify
const REPO_PATH = '.'; // Path to your git repository
const git = simpleGit(REPO_PATH); // Initialize simple-git

// Function to simulate contributions for the past year
async function simulateContributionsForYear() {
    for (let i = 0; i < 365; i++) {
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
```

### 4. Run the Script
Execute the script using Node.js:
```bash
node contribute.js
```

---

## Optional Customizations

### 1. Sparse Contributions
Commit only on specific days (e.g., every 3rd day):
```javascript
if (i % 3 === 0) { /* Commit only every 3rd day */ }
```

### 2. Randomized Times
Add a random time to each commit for added realism:
```javascript
const randomHour = Math.floor(Math.random() * 24);
const fakeDate = moment().subtract(i, 'days').set('hour', randomHour).format('YYYY-MM-DDTHH:mm:ss');
```

### 3. Use a Private Repository
To keep the contributions hidden, push to a private repository.

---

## Caution
- Use responsibly. Artificially inflating contributions may violate GitHub’s terms of service.
 - Avoid creating too many commits in a short period to prevent being flagged by GitHub. 
 - This project is made only for educational purposes. 
 - We are not responsible for any violations or misuse of this script.

---

## License
This project is licensed under the MIT License. Feel free to modify and use it as needed.
