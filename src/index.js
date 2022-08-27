require("dotenv").config();
const {makeExecutableSchema} = require("@graphql-tools/schema");
const {ApolloServer} = require("apollo-server-express");
const {createServer} = require("http");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const models = require("./models");
const controllers = require("./controllers");
const schemas = require("./schemas");

const startServer = async() => {
    mongoose.connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });
    const conn = mongoose.connection;
    const schema = makeExecutableSchema({typeDefs: schemas, resolvers: controllers});
    const server = new ApolloServer({
        schema,
        context: async ({req}) => {
            return {
                req,
                models,
                conn,
            }
        }
    });
    await server.start();
    const app = express();
    app.use(cors());

    const httpServer = createServer(app);
    server.applyMiddleware({app, path: "/"});
    await new Promise((resolve) => httpServer.listen({port: process.env.PORT}, resolve));

    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
    return {server, app};
}

startServer();