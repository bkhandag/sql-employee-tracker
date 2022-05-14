INSERT INTO department (name)
VALUES ("Finance"),
       ("Engineering"),
       ("Sales"),
       ("Legal");

       
INSERT INTO role (title, salary, department_id)
VALUES ("Salesperson", 80000, 3),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 1),
       ("Accountant", 125000, 1),
       ("Legal Team Lead", 250000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Arthur", "Miller", 1, null),
       ("Chinua", "Achebe" , 3, 1),
       ("Margaret", "Atwood", 2, null),
       ("Gabriel", "Garcia Marquez", 3 ,2),
       ("Simone", "de Beauvoir", 4, 4);


SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;
SELECT department.id AS id, department.name AS department FROM department;