const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string.
const uri =
  "mongodb+srv://rifqifadluloh27:35agV6WwfolKHh3Q@rifqi.gwtbl2s.mongodb.net/?retryWrites=true&w=majority";
  

const client = new MongoClient(uri);
let db;

async function connect() {
  try {
    db = client.db("users")
  } catch(err) {
    // Ensures that the client will close when you finish/error
    console.log(err);
  }
}

function getDb(){
    return db
}

module.exports = {connect, getDb}