const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongodb.ObjectId(id) : null; // in case id doesn't exist 
    this.userId = userId;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // update product if existing 
      dbOp = db
        .collection('products')
        .updateOne({_id: this._id}, {$set:this});
    } else {
      // insert product 
      dbOp = db.collection('products').insertOne(this);
    }

    return dbOp
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
    
  }

  static fetchAll() {
    // find all - find returns a cursor, toArray turns them into javascript array which only works for small data
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => {
        console.log(err);
      });
    }
   
  static findById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .find({_id: new mongodb.ObjectId(prodId)}) // mongodb converts the ID to ObjectId type and stores as _id
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({_id: new mongodb.ObjectId(prodId)})
      .then()
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
