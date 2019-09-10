const path = require('path');

const express = require('express');

const rootDir = require('../util/path')

const router = express.Router();


// use '/' means path starting from '/'
// get '/' means exact matching
router.get('/', (req, res, next) => {
    // console.log("in another middleware");
    // serve the html file
    // absolute path 
    // ../ goes up one level
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    // res.send('<h1>hello from express </h1>');
}); 

module.exports = router; 