// moving to file storage of product data instead of just an array
const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),'data', 'products.json');

// refactor out the part about getProductsFromFile
// add callback options 
const getProductsFromFile = (cb) => {

    // using callback for asynchronous stuff
    fs.readFile(p, (err, fileContent) => {
        if (err) {
           return cb([]);
        } else {
            cb(JSON.parse(fileContent)); 
        }
    });
}

module.exports = class Product {
    // constructor method
    constructor(title, imageUrl, description, price) {
        this.title = title; 
        this.imageUrl = imageUrl; 
        this.description = description; 
        this.price = price; 
    }

    // save method
    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });        
    }

    // call this method directly on the class itself
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

}