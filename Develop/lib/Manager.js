// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require ("./Employee");

class Manager extends Employee {
    constructor (id, name, email, officeNumber, role) {
       super (id, name, email);
       this.officeNumber = officeNumber;
       this.role = role;
    }
    getName() {
        return this.name;
    }
    getId() {
        return this.id;
    }
    getEmail() {
        return this.email;
    }
    getRole() {
        return "Manager"
        //return this.role;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}
module.exports = Manager;
