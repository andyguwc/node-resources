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



