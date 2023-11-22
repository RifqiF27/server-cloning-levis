"use strict";

const { hasPass } = require("../helpers/bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // const user = require("../data/users.json").map((el) => {
    //   delete el.id;
    //   el.password = hasPass(el.password);
    //   el.createdAt = el.updatedAt = new Date();
    //   return el;
    // });
    const category = require("../data/categories.json").map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    const product = require("../data/products.json").map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    const image = require("../data/images.json").map((el) => {
      delete el.id;
      el.createdAt = el.updatedAt = new Date();
      return el;
    });
    // await queryInterface.bulkInsert("Users", user);
    await queryInterface.bulkInsert("Categories", category);
    await queryInterface.bulkInsert("Products", product);
    await queryInterface.bulkInsert("Images", image);
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Categories", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Images", null, {});
  },
};
