const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        {
            type: "input",
            name: "description",
            message: "Please provide a description of your project."
        },
        {
            type: "input",
            name: "install",
            message: "Please provide installation instructions for your project."
        },
        {
            type: "input",
            name: "usage",
            message: "Please provide usage instructions for your project."
        },
        {
            type: "input",
            name: "contribution",
            message: "What are the contribution guidelines for your project?"
        },
        {
            type: "input",
            name: "test",
            message: "Please provide testing instructions for your project?"
        },
        {
            type: "checkbox",
            name: "license",
            message: "What licenses does your project use?",
            choices: ["MIT", "GPLv2", "Apache", "Other"]
        },
        {
            type: "input",
            name: "github",
            message: "What is your Github username?"
        },
        {
            type: "input",
            name: "email",
            message: "What is your e-mail address?"
        },
    ])
}

promptUser();