const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    hello: String
  }

  type Mutation {
    _: Boolean
  }
`;
