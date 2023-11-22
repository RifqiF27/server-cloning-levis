const { ObjectId } = require("mongodb") 
const { getDb } = require("../config/mongo") 
const { hashSync } = require("bcryptjs") 

class User {
  static getUserCollection() {
    return getDb().collection("users");
  }
  static async findAll() {
    const users = this.getUserCollection();
    const data = await users.find().project({password:0}).toArray();
   
    return data;
  }
  static async findById(id) {
    const user = await this.getUserCollection().findOne({
      _id: new ObjectId(id)
    }, {projection: {password:0}});
    
    return user;
  }
  static async create(input) {
    
    input.password = hashSync(input.password)
    const user = await this.getUserCollection().insertOne(input);
    return user;
  }
  static async delete(id) {

    const user = await this.getUserCollection().deleteOne({_id: new ObjectId(id)});
    
    return user;
  }
}

module.exports = User;
