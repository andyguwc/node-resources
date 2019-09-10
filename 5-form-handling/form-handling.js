// # Form Handling 

// handling forms, form validation, and file uploads
// Two options for sending client data to the server are the querystring and the request body.
// Normally, if you’re using the querystring, you’re making a GET request, and if you’re using the request body, you’re using a POST request


// ## HTML Forms 
// method specified explicitly as POST
// action attribute specifies the URL that will receive the form when it's posted
// name attribute 
{/* <form action="/process" method= "POST">
    <input type="hidden" name="hush" val="hidden but not secret">
    <div>
        <label for="fieldColor">Your favorite color: </label>
        <input type="text" id="fieldColor" name="color">
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</form> */}


// ## Form Encoding
// If you don’t explicitly specify an encoding, it defaults to application/x-wwwform-
// urlencoded (this is just a lengthy media type for “URL encoded”). This is a basic,
// easy-to-use encoding that’s supported by Express out of the box.

// If you need to upload files, things get more complicated. There’s no easy way to send
// files using URL encoding, so you’re forced to use the multipart/form-data encoding
// type, which is and is not handled directly by Express


// ## Actions - Path to Process the Form

// If your form uses method="POST" (which is recommended), it is quite common to use
// the same path for displaying the form and processing the form: these can be distinguished
// because the former is a GET request, and the latter is a POST request. If you take
// this approach, you can omit the action attribute on the form.

// The other option is to use a separate path to process the form. For example, if your
// contact page uses the path /contact, you might use the path /process-contact to process
// the form (by specifying action="/process-contact").

// Responses to Send Back to the Browser
// recommended using 303 redirect 
// can redirect to thank you pages or error pages or using AJAX for forms and not interrupting the navigation flow


// ## Form Handling with Express 
// link in the middleware to parse the URL-encoded body
app.use(require('body-parser')());

// then the req.body is available and 


// ## Handling AJAX Forms with Express

// application file 
app.post('/process', function(req, res){
    if(req.xhr || req.accepts('json,html')==='json'){
    // if there were an error, we would send { error: 'error description' }
    res.send({ success: true });
    } else {
    // if there were an error, we would redirect to an error page
    res.redirect(303, '/thank-you');
    }
});


// # Uploading Files

// We must specify enctype="multipart/form-data" to enable file uploads.
// We’re also restricting the type of files that can be uploaded by using the accept attribute
// Can use third party package Formidable for multipart form processing 

var formidable = require('formidable');

app.get('/contest/vacation-photo',function(req,res){
    var now = new Date();
    res.render('contest/vacation-photo',{
    year: now.getFullYear(),month: now.getMont()
    });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});


