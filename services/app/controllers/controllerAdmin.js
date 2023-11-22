const { comparePass } = require("../helpers/bcrypt");
const { signInToken } = require("../helpers/jwt");
const { Product, Category, Image, sequelize } = require("../models");

class Controller {
 
  static async showProduct(req, res, next) {
    try {
      const data = await Product.findAll({ include: [Category, Image],
        order: [['createdAt', 'DESC']]
       },
     
       );
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async createProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const{ name, mainImg, description, price, categoryId, userMongoId, Images } = req.body
      const category = await Category.findOne({where:{id: categoryId}})
      const product = await Product.create(
        {
          name,mainImg, description, price, categoryId, userMongoId,
        },

        { transaction: t, returning: true, plain: true }
      );

      let imgUrls = Images.map((el) =>{
        let obj = {}
        obj.productId = product.id
        obj.imgUrl = el.imgUrl
        return obj
      })
     const images = await Image.bulkCreate(
       imgUrls,
        { transaction: t }
      );
      let result = product.dataValues
      result.Images = imgUrls
      result.Category = category
      // console.log(imgUrl, '<<<<');
      console.log(product);
        t.commit();
      res.status(201).json(result);
    } catch (err) {
      console.log(err);
        t.rollback();
      next(err);
    }
  }
  static async showOneProduct(req, res, next) {
    try {
      const data = await Product.findOne({
        include: [Category, Image],
        where: { id: req.params.id },
      });
      if (!data)
        throw {
          name: "NotFound",
        };
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      const data = await Product.findOne({
        where: { id: req.params.id },
      });
      if (!data) throw { name: "NotFound" };

      await Product.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: `${data.name} success to delete` });
    } catch (err) {
      next(err);
    }
  }

  static async showCategory(req, res, next) {
    try {
      const data = await Category.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async showOneCategory(req, res, next) {
    try {
      const data = await Category.findOne({
        where: { id: req.params.id },
      });
      if (!data)
        throw {
          name: "NotFound",
        };
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async createCategory(req, res, next) {
    try {
      const data = await Category.create(req.body);
      res.status(201).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const data = await Category.findOne({ where: { id: req.params.id } });
      await Category.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: `${data.name} success to delete` });
    } catch (err) {
      next(err);
    }
  }

  static async editCategory(req, res, next) {
    try {
      // console.log(req.user);
      const { name } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category) throw { name: "NotFound" };
      const data = await Category.update(
        { ...req.body },
        {
          where: { id: req.params.id },
        }
      );
      console.log(data);
      // console.log(data,'<<<<<<<');
      res
        .status(200)
        .json({ message: `Your Product id ${category.id} has been updated` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async editProduct(req, res, next) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) throw { name: "NotFound" };
      const data = await Product.update(
        {
          ...req.body,
          // authorId: req.user.id,
        },
        {
          where: { id: req.params.id },
          individualHooks: true,
        }
      );
      console.log(data);
      res
        .status(200)
        .json({ message: `Your Product id ${product.id} has been updated` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
