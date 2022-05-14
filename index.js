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
      // TODO: Add MySQL password here
      password: "password",
      database: "employee_tracker_db",
    },
    console.log(`Connected to the employee_tracker_db database.`)
  );


// const team = [] //array that I push team members to
// var generateHTMLFile = ""; //string that is used to generate html file

// // Create a function to write README file
// function writeToFile(fileName, data) {
//     fs.writeFile(path.join(process.cwd(), fileName), data, function(err){
//         err ? console.error(err) : console.log('Success!')});
// }

// // Create a function to initialize app
// function init() {
//   //addManager function call
//   addManager()
// }

// function addManager() {

//   inquirer
//   .prompt(managerQuestions)
//   .then((response) => {
//       const newManager = new Manager(
//           response.name,
//           response.id,
//           response.email,
//           response.officeNumber
//       )
//   // add a new Manager to array team;
//     team.push(newManager);
//     console.log(team);
//     nextTeamMember();


// });
// }

// function addEngineer() {

//   inquirer
//   .prompt(engineerQuestions)
//   .then((response) => {
//     const newEngineer = new Engineer (
//       response.name,
//       response.id,
//       response.email,
//       response.github
//     )
//     //add new engineer to array team
//     team.push(newEngineer);
//     console.log(team);
//     nextTeamMember();
//   });
// }

//   function addIntern () {
    
//     inquirer
//     .prompt(internQuestions)
//     .then((response) => {
//     const newIntern = new Intern (
//       response.name,
//       response.id,
//       response.email,
//       response.school
//     )
//     //add a new intern to array team
//     team.push(newIntern);
//     console.log(team);
//     nextTeamMember();
//   });
//   }

//   //Function runs when user selects finish my team option in the list
//     function finishTeam () {
//       generateHTML(team);
//       console.log("Now generating your index.html ...");
//       writeToFile("/dist/index.html", generateHTMLFile);

// }


function init() {
  console.log('Initialization');
  // prompt that asks about which option the user wants
  inquirer
  .prompt(options)
  .then((response) => {

    //enquirer prompt, db.query in here.

    if (response.option == 'View all Departments') {

        db.promise().query(viewDepartments)
        .then( ([results]) =>  console.table(results))
        .then( () => init() );

    } else if (response.option == 'View all Roles') {
       
        db.promise().query(viewRoles)
        .then( ([results]) =>  console.table(results))
        .then( () => init() );
    
    } else if (response.option == 'View all Employees') {
        
        db.promise().query(viewEmployees)
        .then( ([results]) =>  console.table(results))
        .then( () => init() );

    } else if (response.option == 'Add a Department') {
        
        addDepartment();

    } else if (response.option == 'Add a Role') {
        addRole();
    } else if (response.option == 'Add an Employee') {
        addEmployee();
    } else if (response.option == 'Update an Employee Role') {
        updateEmployeeRole();
    } else if (response.option == 'Update Employee Managers') {
        //finishTeam();
    } else if (response.option == 'View Employees by Manager') {
        viewEmployeesByManager();
    } else if (response.option == 'View Employees by Department') {
        //finishTeam();
    } else if (response.option == 'Delete Departments') {
        deleteDepartment();
    } else if (response.option == 'Delete Roles') {
        //finishTeam();
    } else if (response.option == 'Delete Employees') {
        //finishTeam();
    } else if (response.option == 'View total budget of department') {
        //viewBudget();
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


    addDepartment = () => {
        inquirer.prompt([
          {
            type: 'input', 
            name: 'addDept',
            message: "What department do you want to add?",
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
              if (err) throw err; 

              db.promise().query(viewDepartments)
              .then( ([results]) =>  console.table(results))
              .then( () => init() );
          });
        });
      };

      addRole = () => {
        inquirer.prompt([
          {
            type: 'input', 
            name: 'role',
            message: "What Role would you like to add?",
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
                .then(deptChoice => {
                  const dept = deptChoice.dept;
                  params.push(dept);
      
                  const sql = `INSERT INTO role (title, salary, department_id)
                              VALUES (?, ?, ?)`;
      
                  db.query(sql, params, (err, result) => {
                    if (err) throw err;
                    console.log('Added' + answer.role + " to roles!"); 
      
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
  
      // grab roles from roles table
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
              .then(roleChoice => {
                const role = roleChoice.role;
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
