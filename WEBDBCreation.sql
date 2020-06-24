DROP DATABASE IF EXISTS fruitjuice;
CREATE DATABASE fruitjuice;
USE fruitjuice;

DROP TABLE IF EXISTS users;
CREATE TABLE users(
	ID INT auto_increment PRIMARY KEY,
	`USERNAME` VARCHAR(60) NOT NULL,  
	`EMAIL` VARCHAR(255) NOT NULL UNIQUE,
    `PASSWORD` VARCHAR(255) NOT NULL,
    `USERTYPE` BIT DEFAULT 0 # 0 == Customer, 1 == Seller
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
VALUES  ('Daniel Musgrave', 'danielmus1999@hotmail.com', 'Password1', 1),
		('Admin', 'Admin@gmail.com', 'Admin', 1),
		('Bob Stevenson', 'bob@gmail.com', 'bob', 0);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID) 
VALUES  ('Premium Orange Juice', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg", 2);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID)
VALUES  ('Fresh Orange Juice', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://images.unsplash.com/photo-1573500883495-6c9b16d88d8c", 2);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID) 
VALUES  ('Apple Juice', 'Short Product Description', 2.80, "Apple", 435, 24, 23, 7, 88, "https://images.unsplash.com/photo-1591735161367-577be05bc331", 2);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID) 
VALUES  ('Premium Orange Juice', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg", 2);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID)
VALUES  ('Fresh Orange Juice 2', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://images.unsplash.com/photo-1573500883495-6c9b16d88d8c", 2);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID) 
VALUES  ('Apple Juice', 'Short Product Description', 2.80, "Apple", 435, 24, 23, 7, 88, "https://images.unsplash.com/photo-1591735161367-577be05bc331", 2);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID) 
VALUES  ('Premium Orange Juice', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://i.pinimg.com/736x/05/79/5a/05795a16b647118ffb6629390e995adb.jpg", 2);

INSERT INTO products (NAME, DESCRIPTION, PRICE, FRUIT, ENERGY, CARBOHYDRATES, SUGAR, SODIUM, VITAMINC, IMG, SELLERID)
VALUES  ('Fresh Orange Juice 2', 'Short Product Description', 3.00, "Orange", 106, 24, 20, 12, 83, "https://images.unsplash.com/photo-1573500883495-6c9b16d88d8c", 2);




INSERT INTO bids (PRODUCTID, USERID, PRICE) 
VALUES  (1, 2, 101.12),
		(1, 1, 103.00),
		(1, 2, 108.00);