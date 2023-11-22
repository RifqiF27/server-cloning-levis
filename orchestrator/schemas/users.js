const axios = require("axios")
const redis = require('../config/redis')
const BASEURL_USER = process.env.USER_SERVICE_URL || "http://localhost:4001"

const typeDefs = `#graphql
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


    type Query{
        users: [User]
        user(_id:ID!): User
    }

    input NewUser{
        username: String!
        email: String!
        password: String!
        role: String
        phoneNumber: String
        address: String
    }
   
    type Mutation{
        addUser(inputUser: NewUser): Message
        deleteUser(_id: ID!): Message 
    }
`

const resolvers = {
    Query: {
        users: async () => {
            try {
                const cache = await redis.get("usersCache")
                let result;
                if(cache) {
                    result = JSON.parse(cache)
                } else {
                    const { data } = await axios({
                        url: BASEURL_USER+"/users",
                        method: "GET",
                    })
                    await redis.set("userCache", JSON.stringify(data))
                    result = data
                }
                return result
            } catch (err) {
                console.log(err);
                throw err
            }
        },
        user: async (_, args) => {
            try {
                const { data } = await axios({
                    url: BASEURL_USER + "/users/" + args._id,
                    method: "GET",
                })
                return data
            } catch (err) {
                console.log(err);
                throw err
            }
        },
    },
    Mutation: {
        addUser: async (_, {inputUser}) => {
            try {
                const { data } = await axios({
                    url: BASEURL_USER + "/users",
                    method: "POST",
                    data: inputUser
                })
                await redis.del("userCache")
                return data
            } catch (err) {
                console.log(err);
                throw err
            }
        },
        deleteUser: async (_, args) => {
            try {
                const { data } = await axios({
                    url: BASEURL_USER + "/users/" + args._id,
                    method: "DELETE",
                })
                await redis.del("userCache")
                return data
            } catch (err) {
                console.log(err);
                throw err
            }
        }
    }
};


module.exports = { typeDefs, resolvers }