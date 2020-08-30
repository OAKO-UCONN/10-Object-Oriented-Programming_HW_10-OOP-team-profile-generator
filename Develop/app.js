const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Employee = require("./lib/Employee.js")

const employees = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function initApp() {
    startHtml();
    addMember();
}

function addMember() {
    inquirer.prompt([{
        message: "Enter the name of the member of your tem.",
        name: "name"
    },
    {
        type: "list",
        message: "Select your members role.",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter the id number of the member of your team.",
        name: "id"
    },
    {
        message: "Enter the email address of the member of your team.",
        name: "email"
    }])
    .then(function({name, role, id, email}) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        inquirer.prompt([{
            message: `Enter team member's ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Would you like to add more members to your team?",
            choices: [
                "yes",
                "no"
            ],
            name: "moreMembers"
        }])
        .then(function({roleInfo, moreMembers}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } else {
                newMember = new Manager(name, id, email, roleInfo);
            }
            employees.push(newMember);
            addHtml(newMember)
            .then(function() {
                if (moreMembers === "yes") {
                    addMember();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

//INTERN QUESTIONS
function internQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "school",
            message: "What is the name of your school, college or university?",
        },
        {
            type: "input",
            name: "name",
            message: "Please type in your name.",
        },
        {
            type: "input",
            name: "email",
            message: "What is your schools email address?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your intern id number?",
        },
    ]).then(function (internAnswer) {
        const intern = new Intern(
            internAnswer.id,
            internAnswer.name,
            internAnswer.email,
            internAnswer.school,
            "Intern"
        );

        employess.push(intern)
        addAnother();
    })
}

//ENGINEER QUESTIONS
function engineerQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "github",
            message: "What is your Github username?",
        },
        {
            type: "input",
            name: "name",
            message: "Your name please.",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
        {
            type: "input",
            name: "id",
            message: "What is your employee id number?",
        },
    ]).then(function (internAnswer) {
        const engineer = new Engineer(
            engineerAnswer.id,
            engineerAnswer.name,
            engineerAnswer.email,
            engineerAnswer.github,
            "Engineer"
        );
    })
}

//MANAGER QUESTIONS
function managerQuestions() {
    inquirer.prompt([
        {
            type: "input",
            name: "officenumber",
            message: "What is your office number?",
        },
        {
            type: "input",
            name: "name",
            message: "Your name please."
        },
        {
            type: "input",
            name: "id",
            message: "What is your executive id number?",
        },
    ]).then(function (managerAnswer) {
        const manager = new Manager(
            managerAnswer.id,
            managerAnswer.name,
            managerAnswer.email,
            managerAnswer.officenumber,
            "Manager"
        );
        
        employees.push(manager);
        addAnother();
    });
}

//START PROMPTING USER
function startPrompts() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "Select team member type you are adding.",
            choices: ["Intern", "Engineer", "Manager"],
        },
    ]).then(function (departmentSelector) {
        switch (departmentSelector.role) {
            case "Intern":
                internQuestions();
                break;
            case "Engineer":
                engineerQuestions();
                break;
            case "Manager":
                managerQuestions();
                break;
            default:
        }
    });
}
const addAnother = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "createHTML",
            message: "Add another Team Member?",
            choices: ["Intern", "Engineer", "Manager", "No thanks."]
        },
    ]).then((answer) => {
        switch (answer.createHTML) {
            case "Intern":
                internQuestions();
                break;
            case "Engineer":
                engineerQuestions();
                break;
            default:
                newTeam();
        }
    })
}

//Outputs HTML File once all questions have been asked.
function newTeam() {
    fs.writeFileSync(outpuitPath, render(employees), "utf-8");
}

startPrompts();