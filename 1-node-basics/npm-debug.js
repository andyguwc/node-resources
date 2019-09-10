/************************************************************
Node Module Systems & Debug Workflow
************************************************************/ 

// ## NPM
// $ npm init 

// $ update nodemon package scripts 
// then add "start": "node app.js" to scripts
// so people don't need to guess whichi file is the entry file 
// if add own scripts "start-server": "node app.js" then need to use npm run start-server
// in package.json 
{
    "name": "nodejs-complete-guide",
    "version": "1.0.0",
    "description": "Complete Node.js Guide",
    "main": "app.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon app.js",
        "start-server": "node app.js"
    },
    "author": "Maximilian Schwarzmüller",
    "license": "ISC",
    "devDependencies": {
        "nodemon": "^1.18.3"
    },
    "dependencies": {
        "bcryptjs": "^2.4.3",
        "body-parser": "^1.18.3"
    }
}

// $ npm install 
// this installs a third party package 
// development dependency - only using for development purposes 
// $ npm install nodemon --save-dev
// if run $npm install again then will reinstall 
// using nodemon by adding  "start": "nodemon app.js" 


// local vs. global dependencies
// The good thing about local dependencies is that you can share projects without the node_modules folder (where they are stored) and you can run npm install in a project to then re-create that node_modules folder. 
// This allows you to share only your source code, hence reducing the size of the shared project vastly.

// nodemon app.js would not work in the terminal or command line because we don't use local dependencies there but global packages.
// Install globally the -g flag ensures that the package gets added as a global package which you now can use anywhere on your machine, directly from inside the terminal or command prompt.
// $ npm install -g nodemon 




// ## Debug Workflow
// https://www.udemy.com/course/nodejs-the-complete-guide/learn/lecture/11563042#overview
// Type of Errors
// syntax, runtime, logical errors


// use debug mode by setting debug points
// code stopped at the stoppoint
// can play around with the variables at that time 


// automatically restart debugger
// anything local and block can be printed in debug console
// can also run operations in the debug console 
// nodemon has a package to let debugger restart 

// to enable debuggere restart, go to debug configuration and edit following in launch.json
// "configurations": [
//     {
//         "type": "node",
//         "request": "launch",
//         "name": "Launch Program",
//         "program": "${workspaceFolder}/nodejs-complete-guide/notes.js",
//         "restart": true,
//         "runtimeExecutable": "nodemon"
//     }
// debugger view uses global version of nodemon 
// // global installation
// npm install nodemon -g 
// https://nodejs.org/en/docs/guides/debugging-getting-started/
// https://code.visualstudio.com/docs/nodejs/nodejs-debugging


