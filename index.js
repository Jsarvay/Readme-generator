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
            name: "created",
            message: "What is your name?"
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
    return `# ${user.title}
### Created by ${user.created}

## Description
${user.description}

![Badge](https://img.shields.io/static/v1?label=License&message=${user.license}&color=<brightgreen>)

## Table of Contents
[Installation](#installation)
[Usage](#usage)
[Contributing](#contributing)
[Testing](#testing)
[Questions](#questions)
    
<a name="installation"></a>
##Installation
${user.install}
    
<a name="usage"></a>
##Usage
${user.usage}
    
<a name="contributing"></a>
##Contributing
${user.contribution}
    
<a name="testing"></a>
##Testing
${user.test}
    
<a name="questions"></a>
##Questions
Github: [${user.github}](http://github.com/${user.github}/)
E-mail: ${user.email}`
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