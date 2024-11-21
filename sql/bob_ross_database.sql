-- Create the database
CREATE DATABASE IF NOT EXISTS bob_ross_database;

-- Use the database
USE bob_ross_database;

-- Create the Colors table
CREATE TABLE IF NOT EXISTS Colors (
    Color_Id INT AUTO_INCREMENT PRIMARY KEY,
    Color_Name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the Subjects table
CREATE TABLE IF NOT EXISTS Subjects (
    Subject_Id INT AUTO_INCREMENT PRIMARY KEY,
    Subject_Name VARCHAR(255) NOT NULL UNIQUE
);

-- Create the Episodes table
CREATE TABLE IF NOT EXISTS Episodes (
    Episode_Id INT AUTO_INCREMENT PRIMARY KEY,
    episode_title VARCHAR(255) NOT NULL,
    season INT NOT NULL,
    episode INT NOT NULL,
    month VARCHAR(50)
);

-- Create the Episode_Color table (many-to-many relationship between Episodes and Colors)
CREATE TABLE IF NOT EXISTS Episode_Color (
    Episode_Id INT NOT NULL,
    Color_Id INT NOT NULL,
    FOREIGN KEY (Episode_Id) REFERENCES Episodes(Episode_Id) ON DELETE CASCADE,
    FOREIGN KEY (Color_Id) REFERENCES Colors(Color_Id) ON DELETE CASCADE,
    PRIMARY KEY (Episode_Id, Color_Id)
);

-- Create the Episode_Subject table (many-to-many relationship between Episodes and Subjects)
CREATE TABLE IF NOT EXISTS Episode_Subject (
    Episode_Id INT NOT NULL,
    Subject_Id INT NOT NULL,
    FOREIGN KEY (Episode_Id) REFERENCES Episodes(Episode_Id) ON DELETE CASCADE,
    FOREIGN KEY (Subject_Id) REFERENCES Subjects(Subject_Id) ON DELETE CASCADE,
    PRIMARY KEY (Episode_Id, Subject_Id)
);