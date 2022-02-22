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
    file_url VARCHAR(255),
    student_name VARCHAR(255),
    is_delivered BOOLEAN DEFAULT FALSE,
    fk_task INT,
    FOREIGN KEY (fk_task) REFERENCES tasks (id_task)
);


INSERT INTO courses(course_name) VALUES ("Curso de programación");
INSERT INTO courses(course_name) VALUES ("Curso de diseño");
INSERT INTO courses(course_name) VALUES ("Ciencias");

INSERT INTO tasks(task_name, fk_course) VALUES ("Tarea de programación 1", 1);
INSERT INTO tasks(task_name, fk_course) VALUES ("Tarea de programación 2", 1);
INSERT INTO tasks(task_name, fk_course) VALUES ("Tarea de diseño 1", 2);
INSERT INTO tasks(task_name, fk_course) VALUES ("Tarea de diseño 2", 2);

INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Alfonso Gutiérrez", 1);
INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Alfonso Gutiérrez", 2);
INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Alfonso Gutiérrez", 3);
INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Casandra Jimenez", 1);
INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Casandra Jimenez", 2);
INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Casandra Jimenez", 3);
INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Isabela Jimenez", 1);
INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Isabela Jimenez", 2);
INSERT INTO uploads(upload_name, student_name, fk_task) VALUES ("Entrega 1", "Isabela Jimenez", 3);


INSERT INTO users(user, first_name, pass, rol) VALUES ('IUSH','IUSH ADMIN', '$2a$08$LjwwQ5POn6Pu/evLnA4xeeLOGt5Ys1XmwjEEGwNgqH9OTP7rwd5f2', 'ADMIN');


DESCRIBE courses;             
DESCRIBE tasks;               
DESCRIBE uploads;             
DESCRIBE users;

SELECT * FROM courses;
SELECT * FROM tasks;
SELECT * FROM uploads;
SELECT * FROM users;

SELECT * FROM uploads WHERE fk_task = 1;


SELECT id_upload, upload_name, file_url, student_name, is_delivered, task_name, course_name
        FROM uploads
            JOIN tasks
            ON uploads.fk_task = tasks.id_task
            JOIN courses
            ON tasks.fk_course = courses.id_course;