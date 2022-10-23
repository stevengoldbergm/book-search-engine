const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        savedBooks: [Book]
    }

    type Book {
        id: ID
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        saveBook(body: saveBookInput): User
        deleteBook(bookId: String!): User
    }

    input saveBookInput {
        description: String!, 
        bookId: String!, 
        title: String! 
        image: String, 
        link: String, 
        authors: [String]
    }
`;

module.exports = typeDefs;