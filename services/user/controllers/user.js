const User = require("../model/User");

class Users {
  static async findAll(req, res) {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  static async findById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  static async create(req, res) {
    try {
      const user = await User.create(req.body);
      const id = user.insertedId
    //   console.log(JSON.stringify(id));
      res.status(201).json({ message: `User with id ${id} has been created` });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const user = await User.delete(id);
      if (user.deletedCount < 1) return res.status(404).json({message: 'User Not Found'})
      res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
}

module.exports = Users;
