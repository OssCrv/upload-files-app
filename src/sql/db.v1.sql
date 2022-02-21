DROP DATABASE IF EXISTS files_app;

CREATE DATABASE IF NOT EXISTS files_app;

USE files_app;

CREATE TABLE users(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user VARCHAR (50) NOT NULL,
    first_name VARCHAR (100),
    rol ENUM('ADMIN', 'USUARIO') NOT NULL DEFAULT 'USUARIO',
    pass VARCHAR (255) NOT NULL
);

CREATE TABLE IF NOT EXISTS courses(
    id_course INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS tasks(
    id_task INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    task_name VARCHAR(255),
    fk_course INT,
    FOREIGN KEY (fk_course) REFERENCES courses (id_course)
);

CREATE TABLE IF NOT EXISTS uploads(
    id_upload INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    upload_name VARCHAR(255),
    fk_task INT,
    FOREIGN KEY (fk_task) REFERENCES tasks (id_task)
);
INSERT INTO courses(course_name) VALUES ("Curso de programación");
INSERT INTO courses(course_name) VALUES ("Curso de diseño");

INSERT INTO tasks(task_name, fk_course) VALUES ("Tarea 1", 1);
INSERT INTO tasks(task_name, fk_course) VALUES ("Tarea 2", 1);
INSERT INTO tasks(task_name, fk_course) VALUES ("Tarea 2", 2);
INSERT INTO tasks(task_name, fk_course) VALUES ("Tarea 1", 2);

INSERT INTO users(user, first_name, pass, rol) VALUES ('IUSH','IUSH ADMIN', '$2a$08$LjwwQ5POn6Pu/evLnA4xeeLOGt5Ys1XmwjEEGwNgqH9OTP7rwd5f2', 'ADMIN');


DESCRIBE courses;             
DESCRIBE tasks;               
DESCRIBE uploads;             
DESCRIBE users;

SELECT * FROM courses;
SELECT * FROM tasks;
SELECT * FROM uploads;
SELECT * FROM users;