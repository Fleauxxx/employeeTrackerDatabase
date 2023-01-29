const inquirer = require("inquirer");
const mysql = require('mysql2');
const cTable = require('console.table');
const employeeDb = require('./db')



function askQuestions() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "userChoice",
        message: "What would you like to do?",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee"
        ],
      },
    ])
    .then((response) => {
      switch (response.userChoice) {
        case "View All Departments":
          viewDepartments();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "View All Employees":
            viewEmployees();
            break;
        case "Add a Department":
            addDepartment();
            break;
        case "Add a Role":
            addRole();
            break;
        case "Add an Employee":
            addEmployee();
            break;
        case "Update an Employee":
            updateEmployee();
      }
    });
}

function viewDepartments() {
    employeeDb
      .findAllDepartments()
      .then(([departments]) =>{
        console.table(departments)
      })
      .then(() => askQuestions());
   
}

function viewRoles() {
  employeeDb.findAllRoles()
  .then(([roles]) => {
    console.table(roles);
  })
  .then(() => askQuestions());
}

function viewEmployees() {
    employeeDb
      .findAllEmployees()
      .then(([employees]) => {
        console.table(employees);
      })
      .then(() => askQuestions());
}

function addDepartment() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please enter the Department name",
      },
    ])
    .then(res => {
      let name = res;
      employeeDb.createDepartment(name)
      .then(()=> console.log(`Created ${name} in your database`))
      .then (()=> askQuestions() )
});

 
}

function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Please enter the name of the new role ",
      },
      {
        type: "input",
        name: "salary",
        message: "Please enter the salary for the new role ",
      },
      {
        type: "list",
        name: "department_id",
        message: "Please select the department for the new role",
        choices: ["1", "2", "3", "4"],
      },
    ])
    .then((answers) => {
      let newRole = {
        role: answers.role,
        salary: answers.salary,
        department_id: answers.department_id,
      }
      employeeDb.createRole(newRole)
      .then(()=> console.log(`Created new role in your database`))
      .then (()=> askQuestions() )
    })
}

// function addEmployee() {
//     inquirer
//     .prompt([
//       {
//         type: "input",
//         name: "first",
//         message: "Please enter the Employees first name",
//       },
//       {
//         type: "input",
//         name: "last",
//         message: "Please enter the Employees last name",
//       },
//       {
//         type: "list",
//         name: "role_id",
//         message: "Select the the employees role id",
//         choices: ["1", "2", "3", "4"]
//       },
//       {
//         type: "list",
//         name: "manager_id",
//         message: "Select the the employees manager id",
//         choices: ["1", "2", "3", "4"]
//       },
//     ])
//     .then((answers) => {
//       let newEmployee = {
//         first: answers.first,
//         last: answers.last,
//         role_id: answers.role_id,
//         manager_id: answers.manager_id
//       }
//       employeeDb.createEmployee(newEmployee)
//       .then(()=> console.log(`Created new Employee in your database`))
//       .then (()=> askQuestions() )
//     })
// }

function updateEmployee() {}


askQuestions();