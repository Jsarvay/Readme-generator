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

function generateRead(user) {
    return `
    # ${user.title}

    ## Description
    ${user.description}

    ## Table of Contents
    [Installation](#install)
    [Usage](#usage)
    [Contributing](#contribute)
    [Testing](#test)
    [Questions](#question)
    
    <a name="install"/>
    ##Installation
    ${user.install}
    
    <a name="usage"/>
    ##Usage
    ${user.usage}
    
    <a name="contribute"/>
    ##Contributing
    ${user.contribution}
    
    <a name="test"/>
    ##Testing
    ${user.test}
    
    <a name="question"/>
    ##Questions
    ${user.github}
    ${user.email}`
}

promptUser()
    .then(function(user){
        const read = generateRead(user);

        return writeFileAsync("read.md", read);
    })
    .then(function(){
        console.log("README Generated!");
    })
    .catch(function(err){
        console.log(err);
    });