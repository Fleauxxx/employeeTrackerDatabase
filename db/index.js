const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
        database: 'employeelist_db'
    },
    console.log(`Connected to the employeelist_db database.`)
);

db.connect((err)=> {if(err) throw err});


class DbViewer{
    constructor(connection){
        this.connection = connection;
    }

    // FIND ALL DEPARTMENT
    findAllDepartments(){
        return this.connection.promise().query(
            "SELECT department.id, department.name FROM department;"
        );

    }

    // FIND ALL ROLES
    findAllRoles(){
        return this.connection.promise().query(
            "SELECT role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );

    }


    // FIND ALL EMPLOYEES
    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, '', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // ADD A DEPARTMENT
    createDepartment(answer){
        return this.connection.promise().query(
            "INSERT INTO department SET ?",
            { name: answer.department }
        );

    }

    // ADD A NEW ROLE
    createRole(answer){
        return this.connection.promise().query(
            "INSERT INTO role SET ?",
            {title: answer.role,
            salary: answer.salary,
            department_id: answer.department_id,
            }
        );
    }

    // ADD A NEW EMPLOYEE
    createEmployee(answer){
        return this.connection.promise().query(
            "INSERT INTO employee SET ?",
            {first_name: answer.first,
            last_name: answer.last,
            role_id: answer.role_id,
            manager_id: answer.manager_id
            }
        )
    }


}

const employeeDb = new DbViewer(db);

module.exports = employeeDb