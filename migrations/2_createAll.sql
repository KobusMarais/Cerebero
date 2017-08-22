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
	pkid INT PRIMARY KEY, -- DEFAULT NEXTVAL('userSequence'),
	username TEXT NOT NULL,
	user_password TEXT UNIQUE NOT NULL,
	isAdmin BOOLEAN NOT NULL,
	firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    highestScore INT
);

CREATE TABLE aiAccount (
	pkid INT PRIMARY KEY, -- DEFAULT NEXTVAL('aiSequence'),
	aiDescription TEXT NOT NULL
);

CREATE TABLE userProfile(
	pkid INT PRIMARY KEY, -- DEFAULT NEXTVAL('userProfileSequence'),
	userId INT NOT NULL REFERENCES userAccounts(userId),
	topic1 INT NOT NULL,
	topic2 INT NOT NULL,
	topic3 INT NOT NULL,
	topic4 INT NOT NULL,
    topic5 INT NOT NULL
);

CREATE TABLE aiProfile(
	pkid INT PRIMARY KEY, -- DEFAULT NEXTVAL('aiProfileSequence'),
	aiId INT NOT NULL REFERENCES aiAccount(aiId),
	topic1 INT NOT NULL,
	topic2 INT NOT NULL,
	topic3 INT NOT NULL,
	topic4 INT NOT NULL,
    topic5 INT NOT NULL
);

CREATE TABLE allTopics(
	pkid INT PRIMARY KEY, -- DEFAULT NEXTVAL('topicSequence'),
	topicDescription TEXT NOT NULL
);

CREATE TABLE tblFunds(
	pkid INT PRIMARY KEY, 
	userId INT NOT NULL REFERENCES userAccount(userId),
	ai1_funds INT NOT NULL,
    ai2_funds INT NOT NULL,
	ai3_funds INT NOT NULL,
    ai4_funds INT NOT NULL
);

CREATE TABLE tblManPower(
	pkid INT PRIMARY KEY,
	userId INT NOT NULL REFERENCES userAccount(userId),
	ai1_ManPower INT NOT NULL,
	ai2_ManPower INT NOT NULL,
	ai3_ManPower INT NOT NULL,
    ai4_ManPower INT NOT NULL
);
	
CREATE TABLE tblProvince(
	pkid INT PRIMARY KEY,
	provinceName TEXT NOT NULL,
	totalSupportAvailable INT NOT NULL,
	totalManpowerAvailable INT NOT NULL
);

CREATE TABLE tblTypesOfActions(
	pkid INT PRIMARY KEY,
	actionDescription TEXT NOT NULL, -- (Campaigning, Rally etc)
	costInFunds INT NOT NULL,
	costInManPower INT NOT NULL
);

CREATE TABLE tblUserSupportGained(
	pkid INT PRIMARY KEY,
	userId INT NOT NULL REFERENCES userAccount(userId),
	provinceId INT NOT NULL REFERENCES tblProvince(provinceId),
	support INT NOT NULL
);

CREATE TABLE tblAiSupportGained(
	pkid INT PRIMARY KEY,
	aiId INT NOT NULL REFERENCES aiAccount(aiId),
	provinceId INT NOT NULL REFERENCES tblProvince(provinceId),
	support INT NOT NULL
);

CREATE TABLE Leaderboard(
    pkid INT PRIMARY KEY,
    userId INT NOT NULL REFERENCES userAccount(userId),
    score INT NOT NULL
);

-- tblStats
--	(this is their stats imported)