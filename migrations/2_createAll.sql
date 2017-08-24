-- CREATE TYPE NameType AS (Title TEXT, firstName TEXT, surname TEXT);

-- CREATE SEQUENCES, DOMAINS AND TYPES
-- CREATE SEQUENCE userSequence START 1;
-- CREATE SEQUENCE aiSequence START 1;
-- CREATE SEQUENCE userProfileSequence START 1;
-- CREATE SEQUENCE aiProfileSequence START 1;
-- CREATE SEQUENCE topicSequence START 1;

-- CREATE DOMAIN StudentNumType AS INT CHECK (VALUE > 100000 AND VALUE < 999999);
-- CREATE DOMAIN StudyYearsType AS INT CHECK (VALUE > 0 AND VALUE < 100);

-- CREATE TYPE CategoryType AS ENUM ('Part_Time', 'Full_Time');
-- CREATE TYPE TitleType AS ENUM ('Ms', 'Mev', 'Miss', 'Mrs', 'Mr', 'Mnr', 'Dr', 'Prof');

-- CREATE TABLES
CREATE TABLE userAccounts (
	pkid SERIAL PRIMARY KEY, 
	username TEXT NOT NULL,
	user_password TEXT UNIQUE NOT NULL,
	isAdmin BOOLEAN NOT NULL,
	firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    highestScore INT
);

CREATE TABLE aiAccount (
	pkid INT PRIMARY KEY,
	aiDescription TEXT NOT NULL
);

CREATE TABLE userProfile(
	pkid SERIAL PRIMARY KEY, 
	userId INT NOT NULL REFERENCES userAccounts(pkid),
	topic1 INT NOT NULL,
	topic2 INT NOT NULL,
	topic3 INT NOT NULL,
	topic4 INT NOT NULL,
    topic5 INT NOT NULL
);

CREATE TABLE aiProfile(
	pkid SERIAL PRIMARY KEY,  
	aiId INT NOT NULL REFERENCES aiAccount(pkid),
	topic1 INT NOT NULL,
	topic2 INT NOT NULL,
	topic3 INT NOT NULL,
	topic4 INT NOT NULL,
    topic5 INT NOT NULL
);

CREATE TABLE allTopics(
	pkid SERIAL PRIMARY KEY, 
	topicDescription TEXT NOT NULL
);

CREATE TABLE tblFunds(
	pkid SERIAL PRIMARY KEY,  
	userId INT NOT NULL REFERENCES userAccounts(pkid),
	ai1_funds INT NOT NULL,
    ai2_funds INT NOT NULL,
	ai3_funds INT NOT NULL,
    ai4_funds INT NOT NULL
);

CREATE TABLE tblManPower(
	pkid SERIAL PRIMARY KEY, 
	userId INT NOT NULL REFERENCES userAccounts(pkid),
	ai1_ManPower INT NOT NULL,
	ai2_ManPower INT NOT NULL,
	ai3_ManPower INT NOT NULL,
    ai4_ManPower INT NOT NULL
);
	
CREATE TABLE tblProvince(
	pkid SERIAL PRIMARY KEY, 
	provinceName TEXT NOT NULL,
	totalSupportAvailable INT NOT NULL,
	totalManpowerAvailable INT NOT NULL
);

CREATE TABLE tblTypesOfActions(
	pkid SERIAL PRIMARY KEY, 
	actionDescription TEXT NOT NULL, 
	costInFunds INT NOT NULL,
	costInManPower INT NOT NULL
);

CREATE TABLE tblUserSupportGained(
	pkid SERIAL PRIMARY KEY, 
	userId INT NOT NULL REFERENCES userAccounts(pkid),
	provinceId INT NOT NULL REFERENCES tblProvince(pkid),
	support INT NOT NULL
);

CREATE TABLE tblAiSupportGained(
	pkid SERIAL PRIMARY KEY, 
	aiId INT NOT NULL REFERENCES aiAccount(pkid),
	provinceId INT NOT NULL REFERENCES tblProvince(pkid),
	support INT NOT NULL
);

CREATE TABLE Leaderboard(
    pkid SERIAL PRIMARY KEY, 
    userId INT NOT NULL REFERENCES userAccounts(pkid),
    score INT NOT NULL
);

-- tblStats
--	(this is their stats imported)