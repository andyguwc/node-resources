// # Middleware

// Conceptually, middleware is a way to encapsulate functionality: specifically, functionality
// that operates on an HTTP request to your application. Practically, a middleware is
// simply a function that takes three arguments: a request object, a response object, and a
// “next” function

// In an Express app, you insert middleware into the pipeline by calling app.use.

// Route handlers (app.get, app.post, etc.—often referred to collectively as
// app.VERB) can be thought of as middleware that handle only a specific HTTP verb
// (GET, POST, etc.).

// Route handlers and middleware take a callback function that takes two, three, or four parameters (technically, you could also have zero or one parameters, but there
// is no sensible use for these forms). 
// If there are two or three parameters, the first two parameters are the request and response objects, and the third paramater is the next function. 
// If there are four parameters, it becomes an error-handling middleware, and the first parameter becomes an error object, followed by the request, response, and next objects.

// note a module can export a function, which can in turn be used directly as a middleware




