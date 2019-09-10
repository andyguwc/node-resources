# MongoDB 


## MongoDB Basics
Document Store
- Collections and documents 
- Schemaless - data doesn't need to have the same structure 
- MongoDB uses BSON for every document- which is basically JSON - can have 

Relations
- Nested / Embedded Documents
- References (lots of data duplication)


Setup
Download MongoDB Atlas to create a cluster & project in the cloud
In Atlas, create a user to read and write to any database
COPY the SRV address which will be used to connect to the driver
Get MongoDB Driver and Create database Connection
Use MongoDB Community version to view data on desktop

Put the following in util/database.js

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

// only used in this file
let _db;

// wrap connect code into a method 
// that will take a callback 
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://nodeapp:nodeapp@cluster0-cjxts.mongodb.net/test?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log('Connected!');
      // store connection to db
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No Database found';
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb; 


In app.js import mongoconnect from util folder 
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/user');


## Mongoose 
Example Code to Setup in app.js
const mongoose = require('mongoose');

// mongoose connect 
mongoose
  .connect(
    'mongodb+srv://maximilian:9u4biljMQc4jjqbe@cluster0-ntrwp.mongodb.net/shop?retryWrites=true'
    // 'mongodb+srv://nodeapp:nodeapp@cluster0-cjxts.mongodb.net/test?retryWrites=true&w=majority'
    )
  .then(result => {
    // if user not set then create a new user 
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Max',
          email: 'max@test.com',
          cart: {
            items: []
          }
        });
        user.save();
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });


Example of a Mongoose Data Model
Everything is a schema 



const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
      {
        // reference other products 
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

// methods
userSchema.methods.addToCart = function(product) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id, // mongoose will wrap an object id 
      quantity: newQuantity
    });
  }
  const updatedCart = {
    items: updatedCartItems
  };
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  const updatedCartItems = this.cart.items.filter(item => {
    return item.productId.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model('User', userSchema);


