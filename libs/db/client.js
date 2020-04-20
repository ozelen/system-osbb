const { postProcessResponse, wrapIdentifier } = require('./knexHelpers');
// console.log('POSTGRES_HOST', process.env.POSTGRES_HOST);

const props = {
  client: 'pg',
  connection: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASS,
    database: process.env.PG_DB,
  },
  postProcessResponse,
  wrapIdentifier,
};

exports.client = require('knex')(props);
