const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String
    }

    input UserInputData {
        email: String!
        name: String!
        password: String!
    }

    type RooMutation {
        createUser(userInput: UserInputData)
    }

    schema {
        query: RooMutation
    }
`);
