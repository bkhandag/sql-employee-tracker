INSERT INTO department (name)
VALUES ("Finance"),
       ("Engineering"),
       ("Sales"),
       ("Legal");

       
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 003),
       ("Lead Engineer", 150000, 002),
       ("Software Engineer", 120000, 002),
       ("Account Manager", 160000, 001),
       ("Accountant", 125000, 001),
       ("Legal Team Lead", 250000, 004);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Arthur", "Miller", 001, 002),
       ("Chinua", "Achebe", 006, NULL),
       ("Margaret", "Atwood", 002, 001),
       ("Gabriel", "Garcia Marquez", 003, 002),
       ("Simone", "de Beauvoir", 004, 004);