// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
// Import and require mysql2
const mysql = require("mysql2");
const cTable = require('console.table');

const options = require("./utils/options");

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      // MySQL username,
      user: "root",
      // Add MySQL password here
      password: "password",
      database: "employee_tracker_db",
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );

function init() {
  console.log('Initialization');
  // prompt that asks about which option the user wants
  inquirer
  .prompt(options)
  .then((response) => {

    //enquirer prompt, db.query in here.

    if (response.option == 'View all Departments') {
        //used a .promise() here to be able to use .then. to run view department query
        db.promise().query(viewDepartments)
        .then( ([results]) =>  console.table(results))
        .then( () => init() );

    } else if (response.option == 'View all Roles') {
       
      //running view roles query
        db.promise().query(viewRoles)
        .then( ([results]) =>  console.table(results))
        .then( () => init() );
    
    } else if (response.option == 'View all Employees') {
        
      //running view employees query
        db.promise().query(viewEmployees)
        .then( ([results]) =>  console.table(results))
        .then( () => init() );

    } else if (response.option == 'Add a Department') {
        //function call to add dept
        addDepartment();

    } else if (response.option == 'Add a Role') {
      //function call to add a role
        addRole();
    } else if (response.option == 'Add an Employee') {
      //function call to add an employee
        addEmployee();
    }
});
}

//Query to view all departments
const viewDepartments = 'SELECT department.id AS id, department.name AS department FROM department';

//Query to view all roles
const viewRoles = 
`SELECT role.id, role.title, department.name AS department
FROM role
INNER JOIN department ON role.department_id = department.id`;

//Query to view all employees
//Left join is used to returns all records from the left 
//table and matching records from right table. e.g role.department_id = left, department.id = right
const viewEmployees = 
`SELECT employee.id, 
    employee.first_name AS firstname, 
    employee.last_name AS lastname, 
    role.title, 
    department.name AS department,
    role.salary, 
    CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
    LEFT JOIN employee manager ON employee.manager_id = manager.id`;

//Add department function definition
    addDepartment = () => {
      //Prompt in the terminal to ask questions once user has selected to add department
        inquirer.prompt([
          {
            type: 'input', 
            name: 'addDept',
            message: "What department do you want to add?",
            //ensures a value is returened. If not a blank value is stored in database.
            validate: addDept => {
              if (addDept) {
                  return true;
              } else {
                  console.log('Please enter a department');
                  return false;
              }
            }
          }
        ])
          .then(answer => {
            const sql = `INSERT INTO department (name)
                        VALUES (?)`;
            db.query(sql, answer.addDept, (err, result) => {
              if (err) throw err; // adds returned value into table

              //view departments query is run
              db.promise().query(viewDepartments)
              .then( ([results]) =>  console.table(results))
              .then( () => init() );
          });
        });
      };

      //funciton definition to add role
      addRole = () => {
        //Inquirer prompt tp add vlaues required while adding a role
        inquirer.prompt([
          {
            type: 'input', 
            name: 'role',
            message: "What Role would you like to add?",
            //validation to avoid saving a null value
            validate: Title => {
              if (Title) {
                  return true;
              } else {
                  console.log('Please enter a Role');
                  return false;
              }
            }
          },
          {
            type: 'input', 
            name: 'salary',
            message: "What Salary would you like to add for this Role?",
            validate: Salary => {
              ///validation to avoid saving value of incorrect type, if salary is not a number then prompt for salary again
              if (isNaN(Salary)) {
                console.log('Please enter a Salary');
                return false;
              } else {
                return true;
              }
            }
          }
        ])
        .then(answer => {
            const params = [answer.role, answer.salary];
            // get dept from department table
            const roleSql = `SELECT name, id FROM department`; 
            
            db.query(roleSql, (err, data) => {
              if (err) throw err; 
          
              const dept = data.map(({ name, id }) => ({ name: name, value: id }));
      
              inquirer.prompt([
              {
                type: 'list', 
                name: 'dept',
                message: "What department is this role in?",
                choices: dept
              }
              ])
                .then(selectedDept => {
                  const dept = selectedDept.dept;
                  params.push(dept);
      
                  //add selected department to new role
                  const sql = `INSERT INTO role (title, salary, department_id)
                              VALUES (?, ?, ?)`;
      
                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Added' + answer.role + " to roles!"); 
      
                    //run a query to view all roles
                    db.promise().query(viewRoles)
                    .then( ([results]) =>  console.table(results))
                    .then( () => init() );
             });
           });
         });
       });
      };

      // function to add an employee 
    addEmployee = () => {
        inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?",
            //validation to avoid saving null value
            validate: firstName => {
            if (firstName) {
                return true;
            } else {
                console.log('Please enter a first name');
                return false;
            }
        }
      },
      {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?",
        //validation to avoid saving null value
        validate: lastName => {
          if (lastName) {
              return true;
          } else {
              console.log('Please enter a last name');
              return false;
          }
        }
      }
    ])
      .then(answer => {
      const params = [answer.firstName, answer.lastName]
  
      // get roles from roles table
      const roleSql = `SELECT role.id, role.title FROM role`;
    
      db.query(roleSql, (err, data) => {
        if (err) throw err; 
        
        const roles = data.map(({ id, title }) => ({ name: title, value: id }));
  
        inquirer.prompt([
              {
                type: 'list',
                name: 'role',
                message: "What is the employee's role?",
                choices: roles
              }
            ])
              .then(selectedRole => {
                const role = selectedRole.role;
                params.push(role);
  
                const managerSql = `SELECT * FROM employee`;
  
                db.query(managerSql, (err, data) => {
                  if (err) throw err;
  
                  const managers = data.map(({ id, first_name, last_name }) => ({ name: first_name + " "+ last_name, value: id }));
  
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'manager',
                      message: "Who is the employee's manager?",
                      choices: managers
                    }
                  ])
                    .then(managerChoice => {
                      const manager = managerChoice.manager;
                      params.push(manager);
  
                      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                      VALUES (?, ?, ?, ?)`;
  
                      db.query(sql, params, (err, result) => {
                      if (err) throw err;
                      console.log("Employee has been added!")
  
                      db.promise().query(viewEmployees)
                      .then( ([results]) =>  console.table(results))
                      .then( () => init() );
                });
              });
            });
          });
       });
    });
  };
  
// // Function call to initialize app
init();
