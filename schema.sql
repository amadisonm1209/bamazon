CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(255) NOT NULL,
department_name VARCHAR(255),
price DEC (10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES();