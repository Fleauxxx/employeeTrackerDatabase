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
      .then(()=> console.log(`Created ${name.name} in your database`))
      .then (()=> askQuestions() )
});

 
}

function addRole() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "role",
        message: "Please enter the new Role ",
      },
    ])
}

function addEmployee() {
    inquirer
    .prompt([
      {
        type: "input",
        name: "employee",
        message: "Please enters the Employees name",
      },
    ])
}

function updateEmployee() {}


askQuestions();