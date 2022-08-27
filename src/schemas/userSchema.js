const { gql } = require('apollo-server');
module.exports = gql`

    input UserInput {
        username: String 
        password: String 
        phone: String 
        gender: Gender 
        role: UserRole 
    }

enum Gender {
        MALE 
        FEMALE 
        NOT_SPECIFIED
    }
    
    enum UserRole {
        ADMIN 
        USER 
    }

    type User {
        id: ID 
        username: String 
        password: String 
        phone: String 
        gender: Gender 
        role: UserRole 
        createdAt: DateTime 
        updatedAt: DateTime 
    }

    

    input UserWhereInputOne {
        id: ID!
    }

    input UserWhereInput {
        username: String 
        password: String 
        phone: String 
        gender: Gender 
        role: UserRole 
        createdAt_lt: DateTime 
        createdAt_gte: DateTime 
        OR: [UserWhereInput]
    }

    type ResponseUserData {
        total: Int!
        data: [User]!
    }

    extend type Query {
        user(where: UserWhereInputOne!): User!
        users(where: UserWhereInput, orderBy: OrderByInput, skip: Int, limit: Int):ResponseUserData!
    }

    extend type Mutation {
        createUser(data: UserInput!): User! 
        updateUser(data: UserInput!, where: UserWhereInputOne!): User!
        deleteUser(where: UserWhereInputOne!): User!
    }

`;