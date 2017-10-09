const Schema = `
  type Gallery {
    id: String!
    name: String!
    type: String!
    size: Int!
    path: String!
  }

  input Upload {
    name: String!
    type: String!
    size: Int!
    path: String!
  }

  type Query {
    uploads: [Gallery]
  }

  type Mutation {
    singleUpload (file: Upload!): Gallery!
    multipleUpload (files: [Upload!]!): [Gallery!]!
  }
`;

module.exports = Schema;
