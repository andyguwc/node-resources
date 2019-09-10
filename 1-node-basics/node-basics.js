/************************************************************
Node Basics
************************************************************/ 


// ## Node Benefits
// - Single Threaded: simplify writing web apps and if need multi thread can just spin up more node instances 
// - Independent of operating systems
// - V8 compiles into machine code but it's more like interpreted language 
// Node.js is great for writing utility tools since it's a javascript runtime 

// Link https://github.com/EthanRBrown/web-development-with-node-and-express/tree/master/ch08


// ## Package Management
// -g tag tells npm to install globally
// javacript utilties could be installed globally but packages specific to web app doesn't need to be 
// npm install -g grunt-cli

// Running npm install will install the named package(s) in the node_modules directory.

// If you specify the --save flag, it will update the package.json file.

// ## Simple Web Server
var http = require('http');
http.createServer(function(req,res){
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello world!');
}).listen(3000);
// console.log('Server started on localhost:3000; press Ctrl-C to terminate....');


// ## Node Program Lifecycle - Event Driven Execution
// event loop - keep on running as long as there are event listeners registered
// Use event driven approach not only for server, but also database access, etc. 


// ## Blocking and Non-Blocking Code 
// Add return to make sure things get executed first



// ## Development Best Practices
// git init 
// in .gitignore, put below, where *~ is for backup files the system creates
// node_modules
// *~
// .DS_Store

// git add -A 
// to add all file changes including the files deleted 


// export functions 
// The important thing to note here is the use of the global variable exports. If you want
// something to be visible outside of the module, you have to add it to exports. 
exports.getFortune = function() {
    var idx = Math.floor(Math.random() * fortuneCookies.length);
    return fortuneCookies[idx];
};




