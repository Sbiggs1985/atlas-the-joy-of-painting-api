const fs = require('fs');          // File system module to read files
const csv = require('csv-parser'); // CSV parser to read .csv files
const { Client } = require('pg');  // PostgreSQL client

// Create a PostgreSQL client to connect to your database
const client = new Client({
  host: 'localhost', // Your PostgreSQL server address
  port: 5432,        // Default PostgreSQL port
  user: 'postgres', // Database username
  password: 'root', // Password
  database: 'my_database_name' // The name of your database
});

// Connect to PostgreSQL
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// Function to insert data into tables
const insertDataIntoTable = (data, tableName) => {
  data.forEach((row) => {
    console.log(row);
    let query = '';
    let values = [];

    // Insert data into Episodes table
    if (tableName === 'Episodes') {
      query = 'INSERT INTO Episodes (title, air_date) VALUES ($1, $2)';
      values = [row.title, row.air_date];
    }
    // Insert data into Colors table
    else if (tableName === 'Colors') {
      query = 'INSERT INTO Colors (color_name) VALUES ($1)';
      values = [row.colors];
    }
    // Insert data into Subjects table
    else if (tableName === 'Subjects') {
      query = 'INSERT INTO Subjects (subject_name) VALUES ($1)';
      values = [row.subjects];
    }

    // Execute the query to insert data into the respective table
    client.query(query, values)
      .then(() => console.log(`Data inserted into ${tableName} table`))
      .catch((err) => console.error('Insert error', err.stack));
  });
};

// Function to parse CSV and insert data into PostgreSQL
const importCSVData = (filePath, tableName) => {
  const results = []; // Store parsed CSV data

  fs.createReadStream(filePath) // Read the CSV file
    .pipe(csv()) // Parse the CSV file
    .on('data', (data) => results.push(data)) // Push parsed rows to results
    .on('end', () => { // Once the CSV is fully read
      insertDataIntoTable(results, tableName); // Insert parsed data into the table
    });
};

// MAKE SURE TO UNCOMMENTz
// Call the import function for each CSV file
// importCSVData('./data/Episodes.csv', 'Episodes');  // Path to your Episodes.csv file
// importCSVData('./data/Colors.csv', 'Colors');      // Path to your Colors.csv file
importCSVData('./data/Subjects.csv', 'Subjects');  // Path to your Subjects.csv file

// Function to close the database connection after inserting data
const closeConnection = () => {
  client.end()
    .then(() => console.log('Database connection closed'))
    .catch(err => console.error('Error closing connection', err.stack));
};

// Optionally, you can call closeConnection() after all data is imported
// closeConnection();
