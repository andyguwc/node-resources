# Using Express Router
## Change Folder Structure 
- routes
    - admin.js
    - shop.js
- app.js


## Router files
For example in admin.js

```
const express = require('express');
const router = express.Router();

router.get();
router.use();

module.exports = router; 
```

## Import in app.js

```
Importing the router object with all the defined routes
const app = express();


const adminRoutes = require('./routes/admin'); 
const shopRoutes = require('./routes/shop');

app.use(adminRoutes); // the order matters here
app.use(shopRoutes); 
```


## Add Views and HTMLs
// add the following HTML files in views
shop.html 
add-product.html 


## Serve HTML
// serve the html files in the routes
// use sendFile in the router 
router.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'views', 'shop.html'));
});


## Refacto Util
// add the following to util to help with navigation
const path = require('path');
module.exports = path.dirname(process.mainModule.filename);

## Styling with CSS
// add style tag in the html views
// then in app.js use the static file 
// forward to public folder, serving public files like css 
app.use(express.static(path.join(__dirname, 'public')));