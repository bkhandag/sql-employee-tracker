# sql-employee-tracker

![License](https://img.shields.io/badge/license-MIT_License-red.svg)

## Description:

This is a content management system (CMS) that has a command line application used to manage a company's employee database using Node.js, Inquirer and MySQL

## Table of Contents:

- [Description](#description)

- [User Story](#user-story)

- [Acceptance Criteria](#acceptance-criteria)

- [Installation Instructions](#installation)

- [Link to Application of Github](#link-to-application-on-github)

- [Link to Walkthrough Video](#link-to-walkthrough-video)

- [Screenshots](#screenshot)

- [Questions](#questions)

## User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
```

## Installation Instructions:

- Used the [MySQL2 package](https://www.npmjs.com/package/mysql2) to connect to MySQL database and perform queries
- Used the [Inquirer package](https://www.npmjs.com/package/inquirer) to interact with the user via the command line
- Used the [console.table package](https://www.npmjs.com/package/console.table) to print MySQL rows to the console.
- Made queries asynchronus using `.promise()` [npm documentation on MySQL2](https://www.npmjs.com/package/mysql2)

## Link to Application on Github:

https://github.com/bkhandag/sql-employee-tracker

## Link to Walkthrough Video:

## Screenshots:

DesiGNED the database schema as shown in the following image:

![Database schema includes tables labeled “employee,” role,” and “department.”](./Assets/12-sql-homework-demo-01.png)

## Questions:

For additional questions, reach out to me:

Github: https://github.com/bkhandag

Email: khandagale.b.g@gmail.com
