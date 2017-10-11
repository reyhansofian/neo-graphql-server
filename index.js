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
    uploadDir: './public/uploads',
  }),
  graphqlExpress({
    schema: makeExecutableSchema({ typeDefs: [types], resolvers }),
    debug: true,
  })
);

app.use('/gallery', express.static(`${__dirname}/public/uploads`));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

const listener = app.listen(PORT, () => {
  let host = listener.address().address;
  if (host === '::') {
    host = 'localhost';
  }
  const { port } = listener.address();
  /* eslint-disable no-console */
  console.log('Listening at http://%s%s', host, port === 80 ? '' : `:${port}`);
  /* eslint-enable no-console */
});
