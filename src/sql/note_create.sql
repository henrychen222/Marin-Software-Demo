use marin;
CREATE TABLE note (
	id INT NOT NULL AUTO_INCREMENT,
	text VARCHAR(40) NOT NULL,
	date VARCHAR(40) NOT NULL,
    permission VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);