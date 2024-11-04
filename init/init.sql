CREATE DATABASE if not exists `agency`;

USE `agency`;


CREATE TABLE user (
    id VARCHAR(64) PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('0', '1') NOT NULL DEFAULT '1',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE ad (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    zipcode VARCHAR(5) NOT NULL,
    city VARCHAR(255) NOT NULL,
    type ENUM('VENTE', 'LOCATION') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);

CREATE TABLE ad_metadata (
    id VARCHAR(64) PRIMARY KEY,
    annonce_id VARCHAR(64) NOT NULL,
    build_year INT NOT NULL,
    floor INT NOT NULL,
    room INT NOT NULL,
    bedroom INT NOT NULL,
    bathroom INT NOT NULL,
    parking BOOLEAN NOT NULL,
    squarefoot INT NOT NULL,
    toilet INT NOT NULL,
    cellar BOOLEAN NOT NULL,
    energy_class ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') NOT NULL,
    gas_class ENUM('A', 'B', 'C', 'D', 'E', 'F', 'G') NOT NULL,
    FOREIGN KEY (annonce_id) REFERENCES annonces(id)
);


CREATE TABLE ad_image (
    id VARCHAR(64) PRIMARY KEY,
    annonce_id VARCHAR(64) NOT NULL,
    name VARCHAR(255) NOT NULL,
    data LONGBLOB NOT NULL,
    FOREIGN KEY (annonce_id) REFERENCES annonces(id)
);