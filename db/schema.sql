DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),

  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL,

  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);