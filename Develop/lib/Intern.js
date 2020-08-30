// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
//Done
const Employee = require("./Employee");

class Intern extends Employee {
    constructor (id, name, email, school, role) {
        super (id, name, email);
        this.school = school;
        this.role = role;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail()  {
        return this.email;
    }
    getRole() {
        return "Intern";        
    }
    getSchool() {
        return this.school;
    }
}

module.exports = Intern;
