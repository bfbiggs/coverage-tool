import fs from 'fs';
import { diff } from 'json-diff';
import open from 'open';

// Read the files
const file1 = fs.readFileSync('./coverage-report-baseline/coverage-summary.json', 'utf8');
const file2 = fs.readFileSync('./coverage-report-pr/coverage-summary.json', 'utf8');

// Parse the files
const json1 = JSON.parse(file1);
const json2 = JSON.parse(file2);

// Function to remove linesCovered property from all objects
function removeLinesCovered(obj) {
    for (let prop in obj) {
        if (typeof obj[prop] === 'object') {
            removeLinesCovered(obj[prop]);
        }
    }
    delete obj.linesCovered;
}

// Remove linesCovered property from all objects in json1 and json2
removeLinesCovered(json1);
removeLinesCovered(json2);

// Get the difference
const differences = diff(json1, json2);

// Convert the differences to a string
const differencesString = JSON.stringify(differences, null, 2);

// Write the differences to an index.html file
fs.writeFileSync('./index.html', `<pre>${differencesString}</pre>`);

// Log the differences
console.info(differences);
// Open the index.html file
open('./index.html');
open('./coverage-report-baseline/lcov-report/index.html')
open('./coverage-report-pr/lcov-report/index.html')