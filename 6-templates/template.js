// # Templating 

// ## Express Views Templates Basics
// Get HTMLish Template with placeholders + Node/Express Content/Data + Template Engine => Replace placeholders with HTML content
// The way you pass data into the templates don't vary across templating engines

// Popular Templating Engines
// EJS - normal HTML with special characters around injected data (normal HTML and plain Javascript)
// Pug - doesn't use HTML, replacing it with minimal version (minimal HTML and custom template language)
// Handlebars - using HTML with {{}} placeholder for dynamic content (normal HTML and custom template language)


// ## Views and Templates 
// https://www.npmjs.com/package/express-handlebars
// Handlebars

// This creates a view engine and configures Express to use it by default.
const app = express();
// set up handlebars view engine
const handlebars = require('express3-handlebars')
.create({ defaultLayout:'main' });
// registers a new templaning engine
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// Render handlebars 
app.get('/', function(req, res) {
    res.render('home');
});
// 404 catch-all handler (middleware)
app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
// 500 error handler (middleware)
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});


// ## Static Files and Views
// The static middleware allows you to designate one or more directories as containing
// static resources that are simply to be delivered to the client without any special handling.
// This is where you would put things like images, CSS files, and client-side JavaScript files.
app.use(express.static(__dirname + '/public'));

// The static middleware has the same effect as creating a route for each static file you
// want to deliver that renders a file and returns it to the client. So let’s create an img
// subdirectory inside public, and put our logo.png file in there.

{/* <body>
    <header><img src="/img/logo.png" alt="Meadowlark Travel Logo"></header>
    {{{body}}}
</body> */}


// ## Dynamic Content in Views 

var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple.",
    ];
// Modify the view (/views/about.handlebars) to display a fortune:
<h1>About Meadowlark Travel</h1>
<p>Your fortune for the day:</p>
<blockquote>{{fortune}}</blockquote>
// Now modify the route /about to deliver the random fortune cookie:
app.get('/about', function(req, res){
    var randomFortune =
    fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', { fortune: randomFortune });
});


// The key to understanding templating is understanding the concept of context. When
// you render a template, you pass the templating engine an object called the context object,
// and this is what allows replacements to work.
// Context + template => Output HTML


// ## Blocks
// Things start to get more complicated when you consider blocks. Blocks provide flow
// control, conditional execution, and extensibility.


// ## Server Side Templates
// Server-side templates allow you to render HTML before it’s sent to the client. Unlike
// client-side templating, where the templates are available for the curious user who knows
// how to view HTML source, your users will never see your server-side template, or the
// context objects used to generate the final HTML.

// Server-side templates, in addition to hiding your implementation details, support template
// caching, which is important for performance. The templating engine will cache
// compiled templates (only recompiling and recaching when the template itself changes),
// which will improve the performance of templated views. By default, view caching is
// disabled in development mode and enabled in production mode. If you want to explicitly
// enable view caching, you can do so: app.set('view cache', true);

// link handlebars and express engine
var handlebars = require('express3-handlebars')
.create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


// ## Views and Layouts
// A view usually represents an individual page on your website (though it could represent
// an AJAX-loaded portion of a page, or an email, or anything else for that matter). By
// default, Express looks for views in the views subdirectory.

// A layout is a special kind of view—essentially, a template for templates. Layouts are essential because most (if not
// all) of the pages on your site will have an almost identical layout.

// Using Layouts in Express
// default main layout 
var handlebars = require('express3-handlebars')
.create({ defaultLayout: 'main' });
// By default, Express looks for views in the views subdirectory and layouts in views/
// layouts. So if you have a view views/foo.handlebars, you can render it this way:
app.get('/foo', function(req, res){
    res.render('foo');
});

// if we want to use a different template, we can specify the template name:
app.get('/foo', function(req, res){
    res.render('foo', { layout: 'microsite' });
});

// ## Partials
// have components to reuse on different pages 


// First create a partials file in views/partials/weather.handlebars
{/* <div class="weatherWidget">
{{#each partials.weather.locations}}
<div class="location">
<h3>{{name}}</h3>
<a href="{{forecastUrl}}">
<img src="{{iconUrl}}" alt="{{weather}}">
{{weather}}, {{temp}}
</a>
</div>
{{/each}}
<small>Source: <a href="http://www.wunderground.com">Weather
Underground</a></small>
</div> */}


// Now we’ll create a middleware to inject this data into the res.locals.partials object
app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next();
});
// Now that everything’s set up, all we have to do is use the partial in a view. For example,
// to put our widget on the home page, edit views/home.handlebars:
<h2>Welcome to Meadowlark Travel!</h2>
{{> weather}}

// ## Sections
// when your view needs to inject itself into different parts of your layout - a common example of this is a view needing to add something to
// the <head> element, or to insert a <script> that uses jQuery

var handlebars = require('express3-handlebars').create({
    defaultLayout:'main',
    helpers: {
    section: function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
        }
    }
});

// Now we can use the section helper in a view. 
// Let’s add a view (views/jquerytest.handlebars) to add something to the <head> and a script that uses jQuery:
{{#section 'head'}}
    <!-- we want Google to ignore this page -->
    <meta name="robots" content="noindex">
{{/section}}
</meta>


// Templates Choices
// Using a third-party theme starts with taking the primary file (usually index.html) and renaming it to main.handlebars (or
// whatever you choose to call your layout file), and placing any resources (CSS, JavaScript,
// images) in the public directory you use for static files. Then you’ll have to edit the
// template file and figure out where you want to put the {{{body}}} expression.

// Depending on the elements of your template, you may want to move some of them into
// partials. A great example is a “hero” (a tall banner designed to grab the user’s attention.
// If the hero appears on every page (probably a poor choice), you would leave the hero
// in the template file. If it appears on only one page (usually the home page), then it would
// go only in that view. If it appears on several—but not all—pages, then you might consider
// putting it in a partial



// ## Client Side Handlebars

// Client-side templating with handlebars is useful whenever you want to have dynamic
// content. Of course our AJAX calls can return HTML fragments that we can just insert
// into the DOM as-is, but client-side Handlebars allows us to receive the results of AJAX
// calls as JSON data, and format it to fit our site. For that reason, it’s especially useful for
// communicating with third-party APIs, which are going to return JSON, not HTML
// formatted to fit your site.

