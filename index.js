const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const { apolloUploadExpress } = require('apollo-upload-server');
const { makeExecutableSchema } = require('graphql-tools');

const types = require('./schema');
const resolvers = require('./resolvers');

const PORT = 8000;

const app = express();

app.use(cors());

app.use(
  '/graphql',
  bodyParser.json(),
  apolloUploadExpress({
    // Optional, defaults to OS temp directory
    uploadDir: '/uploads',
  }),
  graphqlExpress({ schema: makeExecutableSchema({ typeDefs: [types], resolvers }) })
);

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.listen(PORT);
