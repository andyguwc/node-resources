# Quality Assurance

## QA Dimensions
- Reach: is it great for discovery 
- Functionality: functional 
- Usability: is it easy to use
- Aesthetics 

## Logic vs. Presentation
- Should seek clear delineation between logic and presentation
- Here put logic in node modules and presentation will be a combination of front-end javascript, html, css, and jquery

## Types of Tests
- Unit testing is very fine-grained, testing single components to make sure they function properly
- Integration testing tests the interaction between multiple components, or even the whole system.

## QA Techniques
- Page testing: tests the front end funcitonality of page
- Cross-page testing: functionality that requires navigation from one page to another
- Logic testing: Logic testing will execute unit and integration tests against our logic domain. It will be testing only JavaScript, disconnected from any presentation functionality.
- Linting: Linting isn’t about finding errors, but potential errors. The general concept of linting is that it identifies areas that could represent possible errors, or fragile constructs that could lead to errors in the future. We will be using JSHint for linting.
- Link checking: Link checking (making sure there are no broken links on your site)

## Using Mocha for Page Testing
Embed tests in pages themselves

npm install --save-dev mocha

since we'll be running Mocha in the browser, we need to put mocha resources in the public folder

mkdir public/vendor
cp node_modules/mocha/mocha.js public/vendor
cp node_modules/mocha/mocha.css public/vendor 

npm install --save-dev chai
cp node_modules/chai/chai.js public/vendor

To easily enable tests, we use a URL parameter to turn on tests


## Cross Page Testing
Useful for cases where the next page depends on information passed from the previous page

Looking for a package which behaves like a browser without the need to click into things

## Linting
Flag programming errors and bugs

# Continuous Integration
Basically, CI runs some or all of your tests every time you contribute code to a shared server.

