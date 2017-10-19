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
    gallery: [Gallery]
  }

  type Mutation {
    updateGallery (images: [Upload!]!): [Gallery!]!
  }
`;

module.exports = Schema;
