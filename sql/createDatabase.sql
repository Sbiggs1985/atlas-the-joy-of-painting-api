-- Create Episodes Table
CREATE TABLE Episodes (
    Episode_ID INT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Duration INT NOT NULL
);

-- Create Colors Table
CREATE TABLE Colors (
    Color_ID INT PRIMARY KEY,
    Color_Name VARCHAR(255) NOT NULL,
    Color_Code VARCHAR(7)  -- Optional field for HEX codes (e.g., #FF5733)
);

-- Create Colors_Used Table (Many-to-Many relationship)
CREATE TABLE Colors_Used (
    Episode_ID INT,
    Color_ID INT,
    PRIMARY KEY (Episode_ID, Color_ID),
    FOREIGN KEY (Episode_ID) REFERENCES Episodes(Episode_ID),
    FOREIGN KEY (Color_ID) REFERENCES Colors(Color_ID)
);

-- Create Episode_Dates Table
CREATE TABLE Episode_Dates (
    Episode_ID INT,
    Aired_Date DATE,
    PRIMARY KEY (Episode_ID),
    FOREIGN KEY (Episode_ID) REFERENCES Episodes(Episode_ID)
);

-- Create Subject_Matter Table
CREATE TABLE Subject_Matter (
    Episode_ID INT,
    Subject VARCHAR(255),
    PRIMARY KEY (Episode_ID),
    FOREIGN KEY (Episode_ID) REFERENCES Episodes(Episode_ID)
);
