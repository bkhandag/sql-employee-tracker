DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT UNSIGNED NOT NULL,
  INDEX dept_index (department_id),
  CONSTRAINT fk_department
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT UNSIGNED NOT NULL,
  INDEX role_index (role_id),
  CONSTRAINT fk_role
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE,
  manager_id INT UNSIGNED,
  INDEX manager_index (manager_id),
  CONSTRAINT fk_manager
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
);