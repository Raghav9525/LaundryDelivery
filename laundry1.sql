
CREATE TABLE orders (
    order_id INT NOT NULL AUTO_INCREMENT,
    cust_mobile VARCHAR(12) NOT NULL,
    bill INT,
    delivery_status VARCHAR(1),
    PRIMARY KEY (order_id, cust_mobile)
);

CREATE TABLE cloth_details (
    order_id INT,
    cloth_name VARCHAR(15),
    cloth_count INT,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE delivery (
    delivery_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    cust_mobile VARCHAR(12),
    db_mobile VARCHAR(12),
    payment_mode VARCHAR(10),
    bill INT,
    paid_amount INT,
    payment_verify VARCHAR(1),
    delivery_date DATE
);

CREATE TABLE delivery_account (
    account_id INT NOT NULL AUTO_INCREMENT,
    delivery_id INT,
    cust_mobile VARCHAR(12),
    db_mobile VARCHAR(12),
    remaining_bill INT,
    PRIMARY KEY (account_id),
    FOREIGN KEY (delivery_id) REFERENCES delivery(delivery_id),
    INDEX (db_mobile)
);


CREATE TABLE db_details (
    db_name VARCHAR(30),
    db_mobile VARCHAR(12) NOT NULL,
    password VARCHAR(20),
    PRIMARY KEY (db_mobile)
);
