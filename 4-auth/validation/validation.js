/************************************************************
User Input Validation
************************************************************/ 
// valiate inputs before storing in database
// can implement validation as part of middleware 
// validate on client-side (javascript upon user inputs) - good user experience but not secure solution though
// validate on server-side (user can't modify that)
// database have built in validations 


// use express-validator package 

// add validator middleware to the route/auth.js
const express = require('express');
// import express-validator check package 
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/login', 
    [
        check('email')
            .isEmail()
            .withMessage('Please Enter a Valid Email'),
        
        body(
            'password',
            'please make sure at least 5 characters' // error message
        )
            .isLength({min: 5})
            .isAlphanumeric(),
    ],
    authController.postLogin);



// make sure to raise the validation errors in the controller in order to pass to the views 
// pass validationResults to post requests and pass null errors to get requests
const { validationResult } = require('express-validator/check');

const User = require('../models/user');

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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'
    }
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    errorMessage: message,
    oldInput: {
      email: '',
      password: ''
    },
    validationErrors: []
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  // if error pass it to the view to render 
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'Login',
      errorMessage: errors.array()[0].msg,
      oldInput: {
        email: email,
        password: password
      },
      validationErrors: errors.array()
    });
  }


// make sure to print the error and pass to view via the controller views/auth/login.ejs
// <%- include('../includes/head.ejs') %>
//     <link rel="stylesheet" href="/css/forms.css">
//     <link rel="stylesheet" href="/css/auth.css">
// </head>

// <body>
//    <%- include('../includes/navigation.ejs') %>

//     <main>
//         <% if (errorMessage) { %>
//             <div class="user-message user-message--error"><%= errorMessage %></div>
//         <% } %>
//         <form class="login-form" action="/login" method="POST" novalidate>
//             <div class="form-control">
//                 <label for="email">E-Mail</label>
//                 <input type="email" name="email" id="email" value="<%= oldInput.email %>">
//             </div>
//             <div class="form-control">
//                 <label for="password">Password</label>
//                 <input type="password" name="password" id="password" value="<%= oldInput.password %>">
//             </div>
//             <input type="hidden" name="_csrf" value="<%= csrfToken %>">
//             <button class="btn" type="submit">Login</button>
//         </form>
//         <div class="centered">
//             <a href="/reset">Reset Password</a>
//         </div>
//     </main>
// <%- include('../includes/end.ejs') %></div>

// change things to keep populate the form with old password

// add to any input the invalid class if errors 



// sanitize data 
// normalize data to make sure stored in a uniform way 
// XSS sanitization

