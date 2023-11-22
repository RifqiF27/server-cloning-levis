const { Product, Category, Image } = require("../models");


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
}

module.exports = Controller;
