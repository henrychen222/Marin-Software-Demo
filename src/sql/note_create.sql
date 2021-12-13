use marin;
CREATE TABLE note (
	id INT NOT NULL AUTO_INCREMENT,
	note_text VARCHAR(40) NOT NULL,
	note_date VARCHAR(40) NOT NULL,
    note_permission VARCHAR(40) NOT NULL,
    PRIMARY KEY (id)
);
