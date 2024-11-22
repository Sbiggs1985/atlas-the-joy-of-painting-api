// Defining my api
//Three endpoints below:
// 1. Episodes by month of original broadcast
// 2. Episodes by Subject Matter
// 3. Episodes by color palette

const express = require('express'); // Import Express framework
const { Client } = require('pg'); // Import PostgreSQL client

const app = express(); // Initialize Express app
const PORT = 3000; // Define the port for the server

// PostgreSQL client configuration
const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres', // Replace with your PostgreSQL username
  password: 'root', // Replace with your PostgreSQL password
  database: 'my_database_name' // Replace with your PostgreSQL database name
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => console.log('Connected to PostgreSQL database'))
  .catch(err => console.error('Connection error', err.stack));

// Endpoint to filter episodes
app.get('/episodes', async (req, res) => {
  const { month, subject, color } = req.query;

  try {
    let query = 'SELECT * FROM Colors';
    const values = [];
    const conditions = [];

    // Filter by month
    if (month) {
      const monthNumber = new Date(`${month} 1, 2024`).getMonth() + 1;
      conditions.push('EXTRACT(MONTH FROM air_date) = $1');
      values.push(monthNumber);
    }

    // Filter by subject
    if (subject) {
      conditions.push('subject_name ILIKE $' + (values.length + 1));
      values.push(`%${subject}%`);
    }

    // Filter by color
    if (color) {
      conditions.push('color_name LIKE $' + (values.length + 1));
      values.push(`%${color}%`);
    }

    // Combine query conditions
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await client.query(query, values);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
