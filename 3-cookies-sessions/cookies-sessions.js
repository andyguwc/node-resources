// # Cookies and Sessions

// The idea of a cookie is simple: the server sends a bit of information, and the browser
// stores it for some configurable period of time. It’s really up to the server what the particular
// bit of information is: often it’s just a unique ID number that identifies a specific
// browser so that the illusion of state can be maintained.

// Notes regarding Cookies
// - Cookies are not secret from the user
// - the user can delete or disallow cookies
// - regular cookies can be tampered with
// - cookies can be used for attacks

// Externalizing Credentials
// To make cookies secure, a cookie secret is necessary. The cookie secret is a string that’s
// known to the server and used to encrypt secure cookies before they’re sent to the client.

// It’s a common practice to externalize third-party credentials, such as the cookie secret,
// database passwords, and API tokens (Twitter, Facebook, etc.). Not only does this ease
// maintenance (by making it easy to locate and update credentials), it also allows you to
// omit the credentials file from your version control system.

// ## Cookies in Express
// use the cookie-parser package 
app.use(require('cookie-parser')(credentials.cookieSecret));

// set a cookie or signed cookie anywhere you have access to a request object
res.cookie('monster', 'nom nom');
res.cookie('signed_monster', 'nom nom', { signed: true });

// to retrieve value of a cookie sent from the client, access the cookie or signedCookie properties of the request object
var monster = req.cookies.monster;
var signedMonster = req.signedCookies.monster;

// To delete a cookie, use req.clearCookie:
res.clearCookie('monster');

// specify the following when setting a cookie
// domain - Controls the domains the cookie is associated with; this allows you to assign cookies to specific subdomains
// path - controls the path this cookie applies to
// maxAge - how long the client should keep the cookie


// # Sessions
// use cookie that contains a unique identifier. The server then uses that identifier to retrieve the appropriate session information

// Two ways to implement sessions: store everything in the cookie, or store only a unique identifier in the cookie and everything else on the server.
// The former are called “cookie-based sessions,” and merely represent a convenience
// over using cookies. However, it still means that everything you add to the session will
// be stored on the client’s browser, which is an approach I don’t recommend.

// use the expresss session middleware (storing using MongoDB)
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const app = express();
const MONGODB_URI =
  'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/shop';

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
  });

app.use(
    session({
      secret: 'my secret',
      resave: false,
      saveUninitialized: false,
      store: store
    })
);

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }   
    User.findById(req.session.user._id)
        .then(user => {
        req.user = user;
        next();
        })
        .catch(err => console.log(err));
});

// To store session information on the server, can use memory sessions 
// use the express-session package 
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')());

// once setup, just use properties of the object's session variable
req.session.userName = 'Anonymous';
var colorScheme = req.session.colorScheme || 'dark';

// removes a session attribute
delete req.session.colorScheme;


// ## Sessions to Implement Flash Messages
// Flash messages don't distrupt user navigation

// In the template
// make sure having bootstrap linked in 
// {{#if flash}}
//     <div class="alert alert-dismissible alert-{{flash.type}}">
//             <button type="button" class="close"
//                 data-dismiss="alert" aria-hidden="true">&times;<button>
//             <strong>{{flash.intro}}</strong> {{{flash.message}}}
//         </div>
// {{/if}}

// in the routes, add this before all routes 
// to make sure once we've displayed a flash message, we remove it from the session so it won't be displayed twice 
app.use(function(req, res, next){
    // if there's a flash message, transfer
    // it to the context, then clear it
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// use flash message, example redirect them to newsletter archive after signup 
app.post('/newsletter', function(req, res){
    var name = req.body.name || '', email = req.body.email || '';
    // input validation
    if(!email.match(VALID_EMAIL_REGEX)) {
        if(req.xhr) return res.json({ error: 'Invalid name email address.' });
        req.session.flash = {
            type: 'danger',
            intro: 'Validation error!',
            message: 'The email address you entered was not valid.',
        };
        return res.redirect(303, '/newsletter/archive');
    }
    new NewsletterSignup({ name: name, email: email }).save(function(err){
        if(err) {
            if(req.xhr) return res.json({ error: 'Database error.' });
            req.session.flash = {
                type: 'danger',
                intro: 'Database error!',
                message: 'There was a database error; please try again later.',
            }
            return res.redirect(303, '/newsletter/archive');
        }
        if(req.xhr) return res.json({ success: true });
        req.session.flash = {
            type: 'success',
            intro: 'Thank you!',
            message: 'You have now been signed up for the newsletter.',
        };
        return res.redirect(303, '/newsletter/archive');
    });
});


// ## res.locals
// assign local variables passed into all the views 
app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});




