const fs = require('fs');
const csv = require('csv-parser');
const util = require('util');

// Function to parse a CSV file and return its data as an array of objects
function parseCSVFile(filePath) {
  const data = []; // Array to store parsed data
  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv()) // Pipe the read stream to the CSV parser
      .on('data', (row) => data.push(row)) // Append each parsed row to the data array
      .on('end', () => resolve(data)) // Resolve the promise when parsing is complete
      .on('error', (error) => {
        console.error(`Error reading the CSV file at ${filePath}:`, error);
        reject(error); // Reject the promise if an error occurs
      });
  });
}

// Exporting the function using object destructuring to align with previous files
module.exports = {
  parseCSVFile
};

// Example usage (can be removed if unnecessary):
// parseCSVFile('path/to/file.csv')
//   .then(data => console.log(data))
//   .catch(error => console.error(error));