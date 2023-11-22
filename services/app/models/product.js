'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.Image, {foreignKey:'productId'})
      // Product.belongsTo(models.User, {foreignKey: 'userMongoId'})
      Product.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name is required",
        },
        notEmpty: {
          msg: "Name is required",
        },
      },
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Slug is required",
        },
        notEmpty: {
          msg: "Slug is required",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is required",
        },
        notEmpty: {
          msg: "Description is required",
        },
      },
    },
    price:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Price is required",
        },
        notEmpty: {
          msg: "Price is required",
        },
        min:{
          args: 99000,
          msg: "Price min 99000"
        }
      },
    },
    mainImg: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "mainImg is required",
        },
        notEmpty: {
          msg: "mainImg is required",
        },
      },
    },
    categoryId: DataTypes.INTEGER,
    userMongoId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  Product.beforeValidate((product) => {
    product.slug = product.name.toLowerCase().replace(/[^a-z0-9\s]+/g, '').replaceAll(' ','-')
  })
  Product.beforeUpdate((product) => {
    console.log(product);
    product.slug = product.name.toLowerCase().replace(/[^a-z0-9\s]+/g, '').replaceAll(' ','-')
  })
  return Product;
};