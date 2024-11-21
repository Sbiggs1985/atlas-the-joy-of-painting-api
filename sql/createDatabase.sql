-- Create Episodes Table
CREATE TABLE Episodes (
    episode_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    air_date DATE NOT NULL
);

-- Create Colors Table
CREATE TABLE Colors (
    color_id SERIAL PRIMARY KEY,
    color_name VARCHAR(100) NOT NULL UNIQUE
);

-- Create Subjects Table
CREATE TABLE Subjects (
    subject_id SERIAL PRIMARY KEY,
    subject_name VARCHAR(255) NOT NULL UNIQUE
);

-- Create EpisodeColors Relationship Table
CREATE TABLE EpisodeColors (
    episode_id INT NOT NULL,
    color_id INT NOT NULL,
    PRIMARY KEY (episode_id, color_id),
    FOREIGN KEY (episode_id) REFERENCES Episodes(episode_id) ON DELETE CASCADE,
    FOREIGN KEY (color_id) REFERENCES Colors(color_id) ON DELETE CASCADE
);

-- Create EpisodeSubjects Relationship Table
CREATE TABLE EpisodeSubjects (
    episode_id INT NOT NULL,
    subject_id INT NOT NULL,
    PRIMARY KEY (episode_id, subject_id),
    FOREIGN KEY (episode_id) REFERENCES Episodes(episode_id) ON DELETE CASCADE,
    FOREIGN KEY (subject_id) REFERENCES Subjects(subject_id) ON DELETE CASCADE
);

-- Querying Examples

-- 1. Get all colors used in a specific episode
SELECT color_name
FROM Colors
INNER JOIN EpisodeColors ON Colors.color_id = EpisodeColors.color_id
WHERE EpisodeColors.episode_id = 1;

-- 2. Get all subjects featured in a specific episode
SELECT subject_name
FROM Subjects
INNER JOIN EpisodeSubjects ON Subjects.subject_id = EpisodeSubjects.subject_id
WHERE EpisodeSubjects.episode_id = 1;

-- 3. Get all episodes where a specific color was used
SELECT title, air_date
FROM Episodes
INNER JOIN EpisodeColors ON Episodes.episode_id = EpisodeColors.episode_id
INNER JOIN Colors ON Colors.color_id = EpisodeColors.color_id
WHERE Colors.color_name = 'Titanium White';

-- 4. Get all episodes featuring a specific subject
SELECT title, air_date
FROM Episodes
INNER JOIN EpisodeSubjects ON Episodes.episode_id = EpisodeSubjects.episode_id
INNER JOIN Subjects ON Subjects.subject_id = EpisodeSubjects.subject_id
WHERE Subjects.subject_name = 'Mountain';

-- 5. Get all colors and subjects for an episode
SELECT Colors.color_name, Subjects.subject_name
FROM Episodes
INNER JOIN EpisodeColors ON Episodes.episode_id = EpisodeColors.episode_id
INNER JOIN Colors ON EpisodeColors.color_id = Colors.color_id
INNER JOIN EpisodeSubjects ON Episodes.episode_id = EpisodeSubjects.episode_id
INNER JOIN Subjects ON EpisodeSubjects.subject_id = Subjects.subject_id
WHERE Episodes.episode_id = 1;