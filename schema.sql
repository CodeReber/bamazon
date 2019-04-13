DROP DATABASE IF EXISTS bamazon;

/* Create database */
CREATE DATABASE bamazon;
USE bamazon;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,4) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (id)
);
SELECT * FROM products;