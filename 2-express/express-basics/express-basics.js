
// # Express 

// ## Express Benefits 

// Minimal and Flexible node.js web framework
// - Minimal
// - Flexible: add new functionality into express framework 

// ## Express Basics
// All about middleware: request -> middleware -> next -> response
app.use((req, res, next) => {
    // req, res 
    // next is a function passed here
    next(); // allows the request to continue to the next middleware in line
}); // adds a middleware 


// Specify default PORT
app.set(port, process.env.PORT || 3000)

// Instead of using Node’s low-level res.end, we’re switching to using Express’s extension, res.send.
// We are also replacing Node’s res.writeHead with res.set and res.status. Express is also providing us a convenience method, res.type, which sets the Content-Type header. 

var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3000);

// custom 404 page
app.use((req, res, next) => {
    // send is type html by default. It is text here
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

app.listen(app.get('port'), function(){
    console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});








