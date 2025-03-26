USE matcha;

CREATE TABLE users (
    userId varchar(36) PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    displayName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    createdAt DATETIME NOT NULL,
    longitude float,
    latitude float,
    birthdate DATETIME NOT NULL,
    includingRange INT, -- range 1, 2, 3, 4, 5
    radiusInKm INT default 100,
    interests INT, -- each interest is 1 shifted by a corresponding interest
    sex VARCHAR(10) NOT NULL,
    bio TEXT,
    emailVerified BOOLEAN default false,
    emailVerificationToken VARCHAR(255),
    emailVerificationTokenExpiresAt DATETIME,
    passwordResetToken VARCHAR(255),
    passwordResetTokenExpiresAt DATETIME,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE oauthUsers (
    userId varchar(36) PRIMARY KEY,
    providerId VARCHAR(50) NOT NULL, -- google, facebook, etc
    provider VARCHAR(50) NOT NULL, -- google, facebook, etc
    email VARCHAR(100) NOT NULL UNIQUE,
    createdAt DATETIME NOT NULL
);

CREATE TABLE images (
    imageId INT AUTO_INCREMENT PRIMARY KEY,
    locationUrl varchar(255) NOT NULL,
    ownerId varchar(36),
    publicId varchar(255),
    idx INT, -- 0 is profile picture
    FOREIGN KEY (ownerId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE likes (
    id varchar(36) PRIMARY KEY,
    senderId varchar(36),
    receiverId varchar(36),
    FOREIGN KEY (senderId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE dislikes (
    id varchar(36) PRIMARY KEY,
    senderId varchar(36),
    receiverId varchar(36),
    FOREIGN KEY (senderId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE matches (
    id varchar(36) PRIMARY KEY,
    user1Id varchar(36),
    user2Id varchar(36),
    FOREIGN KEY (user1Id) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (user2Id) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE messages (
    id varchar(36) PRIMARY KEY,
    senderId varchar(36),
    receiverId varchar(36),
    content1 TEXT NOT NULL,
    FOREIGN KEY (senderId) REFERENCES users(userId) ON DELETE CASCADE,
    FOREIGN KEY (receiverId) REFERENCES users(userId) ON DELETE CASCADE
);