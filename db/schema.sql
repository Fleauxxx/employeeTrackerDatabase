DROP DATABASE IF EXISTS employeelist_db;

CREATE DATABASE employeelist_db;

Use employeelist_db;

CREATE TABLE
    department (
        id INT AUTO_INCREMENT PRIMARY KEY,
        Name VARCHAR(30) NOT NULL
    );

CREATE TABLE
    role (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(30) NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INT NOT NULL
    );

CREATE TABLE
    employee (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(30) NOT NULL,
        last_name VARCHAR(30) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT NULL
    );