// This code establishes a connection to a MySQL database using node.js
// and the mysql module.
const mysql = require('mysql');
// Importing the mysql package which provides functiond for interacting with a MySQL database.

// Function to create a database connection
// A function that will be used to establish a connection to the MySQL dtabae.

function createDBConnection() {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',    // Using root user as is
    password: '',    // No password is needed
    database: 'BobRossDatabase',
    multipleStatements: true
  });

  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database: ' + error.stack);
      return;
    }
    console.log('Connected to database as id ' + connection.threadId);
  });
  // The MySQL connection uses the root user for auth.
  // root: The MySQL connection uses the root user for auth
  // pass: No pass is set
  // error handling for possibe errors connecting to database
  // Success: (logs Connected to database as id .....)

  return connection;
    // This allows the caller to use the connection object to run queries or close connection later.
}

// Exports the createDBConnection function so that it can be used in other files.
module.exports = createDBConnection;