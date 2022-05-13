// Include packages needed for this application
const { prompt } = require("inquirer");
const fs = require("fs");
const path = require("path");
// Import and require mysql2
const mysql = require("mysql2");

//const PORT = process.env.PORT || 3001;

const options = require("./utils/options");

// const managerQuestions = require("./utils/managerQuestions");
// const Manager = require("./lib/Manager");

// const engineerQuestions = require("./utils/engineerQuestions");
// const Engineer = require("./lib/Engineer");

// const internQuestions = require("./utils/internQuestions");
// const Intern = require("./lib/Intern");

// const nextQuestion = require("./utils/nextQuestion");

// const Header = require("./src/Header");
// const ManagerCard = require("./src/ManagerCard");
// const EngineerCard = require("./src/EngineerCard");
// const InternCard = require("./src/InternCard");
// const Footer = require("./src/Footer");

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

// //Generates the html file string
// function generateHTML(team) {
//   generateHTMLFile += Header();
//   team.forEach(element => {
//     const teamRole = element.getRole();
//     if (teamRole == "Manager") {
//       generateHTMLFile += ManagerCard(element);
//     } else if (teamRole == "Intern") {
//       generateHTMLFile += InternCard(element);
//     } else if (teamRole == "Engineer") {
//       generateHTMLFile += EngineerCard(element);
//     }
//   generateHTMLFile += Footer();
// });
// }


function viewAllDepartments() {
    
}

function init() {
  console.log('Initialization');
  // prompt that asks about which option the user wants
//   inquirer
//   .
    prompt(options)
  .then((response) => {

    //enquirer prompt, db.query in here.

    if (response.option == 'View all Departments') {

        db.promise().query('SELECT * FROM department')
        .then( ([results]) =>  console.table(results))
        .then( () => init() );

    } else if (response.option == 'View all Roles') {
       
        db.promise().query('SELECT * FROM role')
        .then( ([results]) =>  console.table(results))
        .then( () => init() );
    
    } else if (response.option == 'View all Employees') {
        
        db.promise().query('SELECT * FROM employee')
        .then( ([results]) =>  console.table(results))
        .then( () => init() );

    } else if (response.option == 'Add a Department') {
        //addDepartment();
    } else if (response.option == 'Add a Role') {
        //finishTeam();
    } else if (response.option == 'Add an Employee') {
        //finishTeam();
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

// // Function call to initialize app
init();
