const {gql} = require("apollo-server");
const userSchema = require("./userSchema");


const linkSchema = gql`
  scalar DateTime 
  enum OrderByInput {
    createdAt_ASC
    createdAt_DESC
    updatedAt_ASC
    updatedAt_DESC
  }

  type Query {
    _:Boolean
  }

  type Mutation {
    _:Boolean 
  }

  type Subscription {
    _:Boolean
  }
`;

module.exports = [
    linkSchema,
    userSchema
];