const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// send a response
// expressjs utility function send
// /admin/add-product 
router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

// returns a key value pair thansk to bodyParser
// only filtering for incoming post requests 
router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/'); 
}); 


module.exports = router;
