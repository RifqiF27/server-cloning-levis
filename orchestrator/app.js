const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const {typeDefs: typeDefsProduct, resolvers: resolversProduct} = require('./schemas/products')
const { typeDefs: typeDefsUser, resolvers: resolversUser } = require('./schemas/users')
const PORT = process.env.PORT || 4000
const server = new ApolloServer({
  typeDefs: [typeDefsUser, typeDefsProduct],
  resolvers: [resolversUser, resolversProduct],
  introspection: true
});

startStandaloneServer(server, {
  listen: { port: PORT },
}).then(({ url }) => {
  console.log(`🚀  Server ready at: ${url}`);
});
