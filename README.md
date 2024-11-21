+------------------+      +------------------+      +------------------+
|    Episodes      |      |     Colors       |      |     Subjects      |
+------------------+      +------------------+      +------------------+
| episode_id (PK)  |      | color_id (PK)    |      | subject_id (PK)   |
| title            |      | color_name       |      | subject_name      |
| air_date         |      |                  |      |                  |
+------------------+      +------------------+      +------------------+
        |                         |                         |
        |                         |                         |
        |                         |                         |
        +-------------------------+                         |
        | EpisodeColors           |                         |
        +-------------------------+                         |
        | episode_id (FK)         |                         |
        | color_id (FK)           |                         |
        +-------------------------+                         |
                  |                                         |
                  +-----------------------------------------+
                            EpisodeSubjects
                            +-------------------------+
                            | episode_id (FK)         |
                            | subject_id (FK)         |
                            +-------------------------+





<h1>Project Outline</h1>

<h2>Files</h2>

<h3>Data</h3>
<ul>
        
</ul>


<h3>SRC File</h3>
<ul>
        <li>db.js</li>
        - This file establishes a connection to a MySQL db using Node.js and the mysql package, which allows interaction with MySQL db's.
        - Function: CreateDBConnection; this function is responsible for creating & returning a MySQL connection to the db.
        - Purpose: provides a reusable function "createDBConnection" to connect to the db in other parts of the application.

        <li>dbConnection.js</li>
        - Function: Establishes a connection to a MySQL database.
        - How it works: Uses the MySQL module to connect to a MySQL db with crednetails (root user with password). This connection object is returned so it can be used elsewhere in the code for executing queries.
        - Purpose: Centralizes logic for connecting to the db, ensuring that your code is not repeatedly creating new connections everytime it needs to perform database operations.

        <li>populateDatabase.js</li>
        - Data loading and insertion - Backend Logic
        - Function: Reads nultiple CSV files, parses them using parseCSVFile, and then inserts the parsed data into corresponding db's tables (e.g, Colors, Subjects, Episodes).
        How it works:
                1. Reads & parses the data from csv files (colors.csv, episodes.csv, subjects.csv). 
                2. Extracts specific fields from the parsed data.
                3. Establushes a connection to the MySQL database using createDBConnection.
                4. Uses SQL queries to insert data into different tables in the db, inserting colors into Colors table.
                5. Handles associations between different data types (e.g., linking colors and subjects to specific episodes.)
        - Purpose: The main logic for loading CSV data into the DB. It reads & parses the data, connects to the db, and inserts data into the appropriate tables.
        
        <li>dataParser.csv</li>
        - CSV Parsing - Data Extraction
        - Functions: Reads CSV files and converts them into an array of objects.
        - How it works: Uses the csv-parser module to stream and parse a CSV file row by row. It then returns a Promise that resolves when parsing is done. 
        Purpose: Converts raw data from CSV format into a steuctured JS object format, which can then be processed or inserted into a db.
</ul>