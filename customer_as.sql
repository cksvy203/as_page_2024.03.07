CREATE DATABASE customer_as;

USE customer_as;

CREATE TABLE as_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product VARCHAR(255) NOT NULL,
    customerName VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL,
    modelName VARCHAR(255) NOT NULL,
    issue TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
