// This file defines a function that establishes a connection to a MySQL database
// and exports it for use in other parts of the application.
const mysql = require('mysql');
// Imports the Mysql DB which provides methods to interact with MySQL DB's.


const createDBConnection = () => {
    // Defines a function to create & configure the connection to MySQL DB.
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',  // MySQL root user
      password: '',    // No password is needed
      database: 'bob_ross_database',  // The name of the database to connect to
      multipleStatements: true  // Allow executing multiple SQL statements in one query
    });

    return new Promise((resolve, reject) => {
        connection.connect((error) => {
          if (error) {
            reject('Error connecting to database: ' + error.stack);
          } else {
            console.log('Connected to database as id ' + connection.threadId);
            resolve(connection);
          }
        });
      });
    }

module.exports = createDBConnection;