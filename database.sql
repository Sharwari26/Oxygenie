-- Create database
CREATE DATABASE IF NOT EXISTS oxygenie_db;
USE oxygenie_db;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    profile_picture VARCHAR(255),
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- Plant search history
CREATE TABLE IF NOT EXISTS search_counts (
    plant_id INT AUTO_INCREMENT PRIMARY KEY,
    plant_name VARCHAR(100) UNIQUE NOT NULL,
    search_count INT DEFAULT 0,
    last_searched TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User scan history
CREATE TABLE IF NOT EXISTS scan_history (
    scan_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plant_name VARCHAR(100) NOT NULL,
    scan_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    image_path VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- User favorites
CREATE TABLE IF NOT EXISTS user_favorites (
    favorite_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    plant_name VARCHAR(100) NOT NULL,
    date_added TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    UNIQUE KEY user_plant (user_id, plant_name)
);

-- Create database user
CREATE USER IF NOT EXISTS 'oxygenie_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON oxygenie_db.* TO 'oxygenie_user'@'localhost';
FLUSH PRIVILEGES;

-- Insert some sample data for testing
INSERT INTO search_counts (plant_name, search_count) VALUES 
('Aloe Vera', 523),
('Tulsi', 487),
('Snake Plant', 421),
('Money Plant', 385),
('Peace Lily', 356),
('Neem', 298),
('Basil', 245),
('Tulip', 187);