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
    createDepartment(){
        return this.connection.promise().query(
            "INSERT INTO department"
        );

    }
}

const employeeDb = new DbViewer(db);

module.exports = employeeDb