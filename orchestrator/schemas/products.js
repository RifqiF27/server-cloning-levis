const axios = require("axios");
const redis = require('../config/redis')

const BASEURL_USER = process.env.USER_SERVICE_URL || "http://localhost:4001";
const BASEURL_APP = process.env.APP_SERVICE_URL || "http://localhost:4002";

const typeDefs = `#graphql
 
  type Product {
    id: ID
    name: String
    slug: String
    description: String
    price: Int
    mainImg: String
    categoryId: ID
    userMongoId: String
    Category: Category
    Images: [Image]
    User: User
  }
  type Category {
    id: ID
    name: String
  }
  type Image {
    id: ID
    productId: ID
    imgUrl: String
  }
  type User{
        _id: ID
        username: String
        email: String
        role: String
        phoneNumber: String
        address: String
    }
    type Message {
        message: String
    }
  type Query {
    products: [Product]
    product(id:ID!): Product
    categories: [Category]
    category(id:ID): Category
    Images: [Image]
    user(_id:ID): User

  }
  input newProduct {
    name: String!
    description: String!
    price: Int!
    mainImg: String!
    categoryId: ID
    userMongoId: String
    Images: [newImages]
  }
  input newImages {
    imgUrl: String!
  }
type Mutation {
    addProduct(product: newProduct): Product
    editProduct(product: newProduct, id: ID!): Message
    deleteProduct(id:ID!): Message
  }
`;

const resolvers = {
  Query: {
    products: async () => {
      try {
        const cache = await redis.get("productsCache");
        let result;
        if (cache) {
          result = JSON.parse(cache);
        } else {
          const { data } = await axios({
            url: BASEURL_APP + "/products",
            method: "GET",
          });
          await redis.set("productsCache", JSON.stringify(data));
          result = data;
        }
        return result;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    product: async (_, args) => {
      try {
        const { data } = await axios({
          url: BASEURL_APP + "/products/" + args.id,
          method: "GET"
        });
        console.log(data.userMongoId);
        const { data: user } = await axios({
          url: BASEURL_USER + "/users/" + data.userMongoId,
          method: "GET"
        });
       
        data.User = user
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    categories: async () => {
      try {
        const { data } = await axios({
          url: BASEURL_APP + "/categories",
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
    category: async (_, args) => {
      try {
        const { data } = await axios({
          url: BASEURL_APP + "/categories" + args.id,
        });
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
  Mutation: {
    addProduct: async (_, { product }) => {
      try {
        const { data } = await axios({
          url: BASEURL_APP + "/products",
          method: "POST",
          data: product,
          headers: { "Content-Type": "application/json" },
        });
        await redis.del("productsCache")
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    editProduct: async (_, { product, id }) => {
      try {
        const { data } = await axios({
          url: BASEURL_APP + "/products/" + id,
          method: "PUT",
          data: product,
          headers: { "Content-Type": "application/json" },
        });
        await redis.del("productsCache")
        // console.log(data);
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }
    },
    deleteProduct: async (_, args) => {
      try {
        const { data } = await axios({
          url: BASEURL_APP + "/products/" + args.id,
          method: "DELETE",
        });
        await redis.del("productsCache")

        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { typeDefs, resolvers };
