const fs = require("fs");
const path = require("path");

const templatesDir = path.resolve(__dirname, "./templates");

const render = (employees) => {
    const html = [];

    //HTML PUSH Intern
    html.push(employees.filter((employee) => employee.getRole() === "Intern")
        .map((intern) => renderIntern(intern))
    );
    
    //HTML PUSH Engineer
    html.push(employees.filter((employee) => employee.getRole() === "Engineer")
        .map((engineer) => renderEngineer(engineer))
    );
    
    //HTML PUSH Manager
    html.push(employees.filter((employee) => employee.getRole() === "Manager")
        .map((manager) => renderManager(manager))
    );

    //HTML Join
    return renderMain(html.join(""));
};

//Render Intern
const renderIntern = (intern) => {
    let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
    template = replacePlaceholders(template, "name", intern.getName());
    template = replacePlaceholders(template, "role", intern.getRole());
    template = replacePlaceholders(template, "email", intern.getEmail());
    template = replacePlaceholders(template, "id", intern.getId());
    template = replacePlaceholders(template, "school", intern.getSchool());
    return template;
};

//RenderManager
const renderManager = (manager) => {
    let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
    template = replacePlaceholders(template, "name", manager.getName());
    template = replacePlaceholders(template, "role", manager.getRole());
    template = replacePlaceholders(template, "email", manager.getEmail());
    template = replacePlaceholders(template, "id", manager.getId());
    template = replacePlaceholders(template, "officeNumber", manager.getOfficeNumber());
    return template;
};
  
//RenderEngineer
const renderEngineer = (engineer) => {
    let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
    template = replacePlaceholders(template, "name", engineer.getName());
    template = replacePlaceholders(template, "role", engineer.getRole());
    template = replacePlaceholders(template, "email", engineer.getEmail());
    template = replacePlaceholders(template, "id", engineer.getId());
    template = replacePlaceholders(template, "github", engineer.getGithub());
    return template;
};
  
//RenderMain
const renderMain = (html) => {
    const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
    return replacePlaceholders(template, "team", html);
};

//Replace Placeholders
const replacePlaceholders = (template, placeholder, value) => {
    const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
    return template.replace(pattern, value);
};

//Export
module.exports = render;
