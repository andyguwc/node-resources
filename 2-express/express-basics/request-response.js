// # Request and Response Objects

// ## Rendering Content
// When you’re rendering content, you’ll be using res.render most often, which renders
// views within layouts, providing maximum value. Occasionally, you may wish to write
// a quick test page, so you might use res.send if you just want a test page. You may use
// req.query to get querystring values, req.session to get session values, or req.cook
// ie/req.signedCookies to get cookies.

// basic usage
app.get('/about', function(req, res) {
    res.render('about');
});

// response other than 200
app.get('/errors', function(req, res) {
    res.status(500);
    res.render('error');
});

// passing a context to a view, including querystring, cookie and session values
app.get('/greeting', function(req, res) {
    res.render('about', {
        message: 'welcome',
        style: req.query.style,
        userid: req.cookie.userid,
        username: req.session.username,
    });
});

// rendering a view with a custom layout 
// the layout file views/layouts/custom.handlebars will be used
app.get('/custom-layout', function(req, res){
    res.render('custom-layout', { layout: 'custom' });
});

// rendering plaintext output
app.get('/test', function(req, res){
    res.type('text/plain');
    res.send('this is a test');
});

// adding an error handler
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500).render('error');
});

// adding a 404 handler
// this should appear AFTER all of your routes
app.use(function(req, res){
    res.status(404).render('not-found');
});


// ## Processing Forms

// When you’re processing forms, the information from the forms will usually be in
// req.body (or occasionally in req.query). You may use req.xhr to determine if the
// request was an AJAX request or a browser request


// first add the bodyParser at the beginning 
// which enables us to get form data via POST through req.body.
app.use(bodyParser.urlencoded({extended: false}));

// basic form processing
app.post('/process-contact', function(req, res) {
    console.log('Received contact from '+ req.body.name+ 
                ' <'+ req.body.email + '>');
    // save to database
    res.redirect(303, '/thank-you');            
});

// basic html form
{/* <form action="/product" method="POST">
    <input type="text" name="title">
    <button type="submit">Submit</button>
</form> */}


// more robust form processing 

app.post('/process-contact', function(req, res) {
    console.log('Received contact from '+ req.body.name+ 
    ' <'+ req.body.email + '>');
    try {
        // save to database
        return res.xhr ?
            // different responses for AJAX vs. browser requests
            res.render({success: true}):
            res.redirect(303, '/thank-you');
    } catch(ex) {
        return res.xhr ?
            res.json({error: 'Database error'}):
            res.redirect(303, '/database-error');
    }
});


// ## Providing an API
// When you’re providing an API, much like processing forms, the parameters will usually
// be in req.query, though you can also use req.body. What’s different about APIs is that
// you’ll usually be returning JSON, XML, or even plaintext, instead of HTML, and you’ll
// often be using less common HTTP methods like PUT, POST, and DELETE.

var tours = [
    { id: 0, name: 'Hood River', price: 99.99 },
    { id: 1, name: 'Oregon Coast', price: 149.95 },
];

// get endpoint that returns JSON, XML, or text
app.get('/api/tours', function(req, res){
    var toursXml = '<?xml version="1.0"?><tours>' +
        products.map(function(p){
            return '<tour price="' + p.price +
                '" id="' + p.id + '">' + p.name + '</tour>';
    }).join('') + '</tours>'';
    var toursText = tours.map(function(p){
            return p.id + ': ' + p.name + ' (' + p.price + ')';
    }).join('\n');
    res.format({
        'application/json': function(){
            res.json(tours);
        },
        'application/xml': function(){
            res.type('application/xml');
            res.send(toursXml);
        },
        'text/xml': function(){
            res.type('text/xml');
            res.send(toursXml);
        }
        'text/plain': function(){
            res.type('text/plain');
            res.send(toursXml);
        }
    });
});

// put endpoint for updating
// API that updates a tour and returns JSON
app.put('/api/tour/:id', function(req, res){
    var p = tours.some(function(p){ return p.id == req.params.id });
    if( p ) {
        if( req.query.name ) p.name = req.query.name;
        if( req.query.price ) p.price = req.query.price;
        res.json({success: true});
    } else {
        res.json({error: 'No such tour exists.'});
    }
});


