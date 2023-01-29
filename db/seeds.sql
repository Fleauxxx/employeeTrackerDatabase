INSERT INTO department (name)
VALUES  ( "Sales"),
        ( "Engineering"),
        ( "Finance"),
        ( "Legal");



INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Sales Person", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Suffy", 1, Null),
       ("Ralph", "Darbone", 2, 1),
       ("Yomi", "Moss", 3, Null),
       ("Chris", "Washington", 4, 3),
       ("Mark", "JeanPiere", 5, Null),
       ("Ebony", "Hudson", 6, 5),
       ("Curtis", "Johnson", 7, Null),
       ("Debra", "Martinez", 8, 7);