const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');
const util = require('util');
const createDBConnection = require('./dbConnection');

// Log script initiation
console.log('Script started');

// Function to read data files and handle errors
async function readDataFile(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    console.log(`Successfully read ${path.basename(filePath)} data.`);
    return data;
  } catch (error) {
    console.error(`Failed to read ${path.basename(filePath)} data:`, error);
    throw error;
  }
}

// Function to parse CSV data
function parseCSVData(data) {
  return Papa.parse(data, { header: true }).data;
}

// Function to get column names for colors and subjects
function getColumnNames(data, excludeColumns) {
  return Object.keys(data[0]).filter((key) => !excludeColumns.includes(key));
}

// Function to insert data into the database
async function insertDataIntoDB(db, query, values) {
  const execQuery = util.promisify(db.query).bind(db);
  try {
    await execQuery(query, values);
  } catch (error) {
    console.error('Database insertion failed:', error);
    throw error;
  }
}

// Function to load data into the database
async function loadData() {
  let colorsData, episodesData, subjectsData;
  const colorExcludeColumns = [
    '', 'painting_index', 'img_src', 'painting_title', 'season', 'episode',
    'num_colors', 'youtube_src', 'colors', 'color_hex'
  ];
  const subjectExcludeColumns = ['EPISODE', 'TITLE'];

  try {
    // Read CSV data
    colorsData = await readDataFile(path.join(__dirname, '../data/colors.csv'));
    episodesData = await readDataFile(path.join(__dirname, '../data/episodes.csv'));
    subjectsData = await readDataFile(path.join(__dirname, '../data/subjects.csv'));

    // Parse CSV data
    const colors = parseCSVData(colorsData);
    const episodes = parseCSVData(episodesData);
    const subjects = parseCSVData(subjectsData);

    // Get column names for colors and subjects
    const colorNames = getColumnNames(colors, colorExcludeColumns);
    const subjectNames = getColumnNames(subjects, subjectExcludeColumns);

    // Connect to the database
    const db = await createDBConnection();

    // Insert colors
    for (let colorName of colorNames) {
      await insertDataIntoDB(db, 'INSERT INTO Colors (Color_Name) VALUES (?)', [colorName]);
    }

    // Insert subjects
    for (let subjectName of subjectNames) {
      await insertDataIntoDB(db, 'INSERT INTO Subjects (Subject_Name) VALUES (?)', [subjectName]);
    }

    // Insert episodes and their associations
    for (let index = 0; index < episodes.length; index++) {
      const episodeData = episodes[index];
      const title = episodeData.TITLE;
      const month = episodeData.DATE.replace(/ "/g, "").split(" ")[0];
      const season = episodeData.SEASON;
      const episode = episodeData.EPISODE;

      const result = await insertDataIntoDB(db, 'INSERT INTO Episodes (episode_title, season, episode, month) VALUES (?, ?, ?, ?)', [title, season, episode, month]);
      const episodeId = result.insertId;

      // Insert associations (colors and subjects)
      await Promise.all([
        ...colorNames.filter(colorName => colors[index][colorName] === "1").map(async (colorName) => {
          const colorIdResult = await insertDataIntoDB(db, 'SELECT Color_Id FROM Colors WHERE Color_Name = ?', [colorName]);
          const colorId = colorIdResult[0].Color_Id;
          await insertDataIntoDB(db, 'INSERT INTO Episode_Color (Episode_Id, Color_Id) VALUES (?, ?)', [episodeId, colorId]);
        }),
        ...subjectNames.filter(subjectName => subjects[index][subjectName] === "1").map(async (subjectName) => {
          const subjectIdResult = await insertDataIntoDB(db, 'SELECT Subject_Id FROM Subjects WHERE Subject_Name = ?', [subjectName]);
          const subjectId = subjectIdResult[0].Subject_Id;
          await insertDataIntoDB(db, 'INSERT INTO Episode_Subject (Episode_Id, Subject_Id) VALUES (?, ?)', [episodeId, subjectId]);
        })
      ]);
    }

    console.log('Completed successfully.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close database connection
    if (db) db.end();
    console.log('Database connection ended.');
  }
}

// Execute the function and handle any errors
loadData().catch(error => console.error('Script failed:', error));