const options = [
    {
        type: 'list',
        name: 'option',
        message: 'What  would you like to do?',
        choices: [
            'View all Departments',
            'View all Roles',
            'View all Employees',
            'Add a Department',
            'Add a Role',
            'Add an Employee',
            'Update an Employee Role',
            'Update Employee Managers',
            'View Employees by Manager',
            'View Employees by Department',
            'Delete Departments',
            'Delete Roles',
            'Delete Employees',
            'View total budget of department',
        ]
      },
];

module.exports = options;