DROP DATABASE IF EXISTS fruitjuice;
CREATE DATABASE fruitjuice;
USE fruitjuice;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
	ID INT auto_increment PRIMARY KEY,
	`USERNAME` VARCHAR(60) NOT NULL,  
	`EMAIL` VARCHAR(255) NOT NULL UNIQUE,
    `PASSWORD` VARCHAR(255) NOT NULL,
    `USERTYPE` INT DEFAULT 0 # 0 == Customer, 1 == Seller
);

DROP TABLE IF EXISTS products;
CREATE TABLE products(
	ID INT auto_increment PRIMARY KEY,
	`NAME` VARCHAR(60) NOT NULL,  
	`DESCRIPTION` TEXT NOT NULL, 
    `PRICE` VARCHAR(10) NOT NULL,	-- Per liter
    `FRUIT` VARCHAR(60) NOT NULL,
    `ENERGY` INT NOT NULL,			-- kCal
    `CARBOHYDRATES` INT NOT NULL, 	-- g
    `SUGAR` INT NOT NULL,			-- g
    `SODIUM` INT NOT NULL,			-- mg
    `VITAMINC` INT NOT NULL,		-- mg
    `IMG` VARCHAR(255) NOT NULL,
	`SELLERID` INT NOT NULL,
    FOREIGN KEY (SELLERID) REFERENCES users(ID) ON DELETE CASCADE
);

DROP TABLE IF EXISTS bids;
CREATE TABLE bids(
	ID INT auto_increment PRIMARY KEY,
    `PRODUCTID` INT,
    `USERID` INT,
    `PRICE` VARCHAR(10),
    FOREIGN KEY (PRODUCTID) REFERENCES products(ID) ON DELETE CASCADE,
    FOREIGN KEY (USERID) REFERENCES users(ID) ON DELETE CASCADE
);

ALTER TABLE users
    ADD CONSTRAINT NAME_LEN_CHECK CHECK (LENGTH(USERNAME) > 1),
    ADD CONSTRAINT EMAIL_LEN_CHECK CHECK (LENGTH(EMAIL) > 1),
    ADD CONSTRAINT PASSWORD_LEN_CHECK CHECK (LENGTH(PASSWORD) > 1);

INSERT INTO users (USERNAME, EMAIL, PASSWORD, USERTYPE) 
VALUES  ('Daniel Musgrave', 'danielmus1999@hotmail.com', '$2a$10$K856ecdI9MeygsCpyPS4R.IJUTteKAQRRxLZUPjIQ3lXOwPmAXL5i', 1),
		('Admin', 'Admin@gmail.com', '$2a$10$u6iyb3dQI4.4K37QBvHKRueVKn6tJAqD6TjG4zLjH2YfbrTFUwr9e', 1),
		('Bob Stevenson', 'bob@gmail.com', '$2a$10$l3ee7869Yy7gHweCKsjrr.x9gcSt9GjfCy6P1Wyp8RFc7K8fo3iuW', 0);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID) 
VALUES  ('Premium Orange Juice', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://images.unsplash.com/photo-1549488933-2392c609e512?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=0", 2),
		('Fresh Orange Juice', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://images.unsplash.com/photo-1524156868115-e696b44983db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=0", 2),
		('Apple Juice', 'Short Product Description', 2.80, "Apple", 435, 24, 23, 7, 88, "https://images.unsplash.com/photo-1591735161367-577be05bc331?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=0", 1),
		('Pulpy Apple, Pineapple, Passionfruit Juice', 'Short Product Description', 2.79, "Apple, Pineapple, Passionfruit", 108, 26, 26, 2, 83, "https://images.unsplash.com/photo-1546751706-81c567470489?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=0", 2),
		('Fresh Orange & Apple Juice', 'Short Product Description', 3.50, "Orange, Apple", 435, 24, 23, 7, 88, "https://images.unsplash.com/photo-1579760546582-4826b30671a4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=0", 1),
		('Fresh Apple Juice', 'Short Product Description', 2.80, "Apple", 435, 24, 23, 7, 88, "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=0", 1),
		('Premium Orange Juice', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://images.unsplash.com/photo-1551030797-46c120009b82?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=0", 2),
		('Strawberry Juice', 'Short Product Description', 3.50, "Strawberry", 106, 24, 20, 12, 83, "https://images.unsplash.com/photo-1573500883495-6c9b16d88d8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=0", 2);




INSERT INTO bids (PRODUCTID, USERID, PRICE) 
VALUES  (1, 2, 3.50),
		(1, 1, 4.00),
		(1, 2, 4.50),
		(2, 3, 3.50),
		(3, 3, 3.00);